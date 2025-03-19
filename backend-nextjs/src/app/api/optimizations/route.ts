import { NextRequest, NextResponse } from 'next/server';
import { JsonStorage } from '@/utils/storage';
import { getCurrentUser } from '@/utils/auth';
import { OptimizationResult, OptimizedListing, Product } from '@/models';
import { OptimizationRequest } from '@/models/optimization';
import { v4 as uuidv4 } from 'uuid';
import { AI_MODELS, AIModel, getDefaultModelForSubscription, getModelById } from '@/services/ai/models';
import { AIServiceFactory } from '@/services/ai/service';

const optimizationStorage = new JsonStorage<OptimizationResult>('optimizations.json');
const optimizedListingStorage = new JsonStorage<OptimizedListing>('optimized_listings.json');
const productStorage = new JsonStorage<Product>('products.json');

// Helper function to check if model is available for subscription
function isModelAvailableForSubscription(modelId: string, subscriptionPlan: string): boolean {
  const model = getModelById(modelId);
  if (!model) return false;
  
  // Map subscription hierarchy
  const subscriptionTiers = {
    'free': 0,
    'basic': 1,
    'pro': 2,
    'enterprise': 3
  };
  
  const subscriptionTier = subscriptionTiers[subscriptionPlan as keyof typeof subscriptionTiers] || 0;
  const requiredTier = subscriptionTiers[model.requiredSubscription as keyof typeof subscriptionTiers];
  
  return subscriptionTier >= requiredTier;
}

// Helper function to select appropriate model based on subscription
function selectModel(requestedModelId: string | undefined, subscriptionPlan: string): AIModel {
  // If no model requested, get the default for the subscription
  if (!requestedModelId) {
    return getDefaultModelForSubscription(subscriptionPlan);
  }
  
  // If model is requested, check if it's available for this subscription
  if (isModelAvailableForSubscription(requestedModelId, subscriptionPlan)) {
    const model = getModelById(requestedModelId);
    return model || getDefaultModelForSubscription(subscriptionPlan);
  }
  
  // If not available, return the default for their subscription
  return getDefaultModelForSubscription(subscriptionPlan);
}

// Helper function to generate listing using AI
async function generateOptimizedListing(
  request: OptimizationRequest,
  selectedModel: AIModel
): Promise<OptimizedListing> {
  const { product, platform, optimizationFocus, targetAudience } = request;
  
  // Create AI service for selected model
  const aiService = AIServiceFactory.createService(selectedModel);
  
  // Get the optimized content from the AI
  const optimizedContent = await aiService.generateOptimizedListing(request, selectedModel);
  
  // Create and return the optimized listing
  const now = new Date().toISOString();
  
  return {
    id: uuidv4(),
    userId: product.userId,
    platform,
    title: optimizedContent.title,
    description: optimizedContent.description,
    bulletPoints: optimizedContent.bulletPoints,
    tags: optimizedContent.tags,
    category: optimizedContent.category,
    recommendedPrice: optimizedContent.recommendedPrice,
    seoMetadata: optimizedContent.seoMetadata,
    images: product.images,
    originalProductId: product.id,
    createdAt: now
  };
}

// Create optimization - optimizes a product for multiple platforms
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { detail: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { product, platforms, optimizationFocus, targetAudience, modelId } = body;
    
    // First check if product belongs to user
    const existingProduct = productStorage.getById(product.id);
    if (!existingProduct || existingProduct.userId !== user.id) {
      return NextResponse.json(
        { detail: 'Product not found or access denied' },
        { status: 404 }
      );
    }
    
    // Select appropriate model based on subscription
    const selectedModel = selectModel(modelId, user.subscriptionPlan);
    
    // Check if the selected model differs from requested (subscription limitation)
    const isModelDowngraded = modelId && selectedModel.id !== modelId;
    
    // Generate optimized listings for each platform
    const optimizedListingPromises = platforms.map(platform => 
      generateOptimizedListing({
        product: existingProduct,
        platform,
        optimizationFocus,
        targetAudience,
        modelId: selectedModel.id
      }, selectedModel)
    );
    
    const optimizedListings = await Promise.all(optimizedListingPromises);
    
    // Save optimized listings
    const savedListings = optimizedListings.map(listing => 
      optimizedListingStorage.create(listing)
    );
    
    // Create optimization result
    const optimizationResult = optimizationStorage.create({
      userId: user.id,
      masterProductId: existingProduct.id,
      optimizedListings: savedListings.map(listing => listing.id),
      optimizationFocus,
      targetAudience
    } as Omit<OptimizationResult, 'id' | 'createdAt'>);
    
    // Return result with any subscription warnings
    return NextResponse.json({
      ...optimizationResult,
      optimizedListings: savedListings,
      model: {
        id: selectedModel.id,
        name: selectedModel.name,
        provider: selectedModel.provider
      },
      subscriptionWarning: isModelDowngraded ? {
        requestedModel: getModelById(modelId as string)?.name || modelId,
        actualModel: selectedModel.name,
        reason: `Your current subscription (${user.subscriptionPlan}) does not include access to the requested AI model. Upgrade your subscription to use premium models.`,
        requiredSubscription: getModelById(modelId as string)?.requiredSubscription || 'pro'
      } : null
    });
  } catch (error) {
    console.error('Optimization error:', error);
    return NextResponse.json(
      { detail: 'Failed to create optimization' },
      { status: 500 }
    );
  }
}

// Get available AI models
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { detail: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Prepare models with availability information
    const models = AI_MODELS.map(model => ({
      id: model.id,
      name: model.name,
      provider: model.provider,
      description: model.description,
      tier: model.tier,
      isAvailable: isModelAvailableForSubscription(model.id, user.subscriptionPlan),
      requiredSubscription: model.requiredSubscription
    }));
    
    return NextResponse.json({
      models,
      userSubscription: user.subscriptionPlan,
      defaultModel: getDefaultModelForSubscription(user.subscriptionPlan).id
    });
  } catch (error) {
    console.error('Get models error:', error);
    return NextResponse.json(
      { detail: 'Failed to get available models' },
      { status: 500 }
    );
  }
}
