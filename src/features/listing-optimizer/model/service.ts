import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../../entities/product';
import { OptimizedListing, PLATFORM_REQUIREMENTS } from '../../../entities/marketplace';
import { OptimizationRequest, OptimizationResult } from './types';
import { generateOptimizedContent } from '../../../shared/api/claude';

export const optimizeListings = async (request: OptimizationRequest): Promise<OptimizationResult> => {
  const { product, platforms, optimizationFocus, targetAudience } = request;
  
  // Create an array of promises for optimizing each platform in parallel
  const optimizationPromises = platforms.map(platform => 
    generateOptimizedContent({
      product,
      platform,
      optimizationFocus: optimizationFocus || '',
      targetAudience: targetAudience || '',
      platformRequirements: PLATFORM_REQUIREMENTS[platform]
    })
  );
  
  // Wait for all optimizations to complete
  const optimizedListings = await Promise.all(optimizationPromises);
  
  return {
    masterProduct: product,
    optimizedListings,
    optimizationId: uuidv4()
  };
};
