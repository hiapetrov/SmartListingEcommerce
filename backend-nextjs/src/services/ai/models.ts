// AI Models available for optimization

// Model tiers based on subscription plans
export enum ModelTier {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

// Available AI models
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  tier: ModelTier;
  requiredSubscription: 'free' | 'basic' | 'pro' | 'enterprise';
  apiConfig: {
    url?: string;
    modelName: string;
    maxTokens: number;
    temperature: number;
  };
}

// List of available models
export const AI_MODELS: AIModel[] = [
  {
    id: 'openai-gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: 'Balanced model for general optimization tasks',
    tier: ModelTier.FREE,
    requiredSubscription: 'free',
    apiConfig: {
      modelName: 'gpt-3.5-turbo',
      maxTokens: 2000,
      temperature: 0.7
    }
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder',
    provider: 'DeepSeek',
    description: 'Specialized in structured content optimization',
    tier: ModelTier.FREE,
    requiredSubscription: 'free',
    apiConfig: {
      modelName: 'deepseek-coder-1.3b',
      maxTokens: 2000,
      temperature: 0.5
    }
  },
  {
    id: 'openai-gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Advanced optimization with better understanding of market context',
    tier: ModelTier.BASIC,
    requiredSubscription: 'basic',
    apiConfig: {
      modelName: 'gpt-4',
      maxTokens: 4000,
      temperature: 0.7
    }
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Excellent for creative, nuanced listing optimization',
    tier: ModelTier.PRO,
    requiredSubscription: 'pro',
    apiConfig: {
      modelName: 'claude-3-5-sonnet-20240620',
      maxTokens: 4000,
      temperature: 0.7
    }
  },
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    description: 'Premium optimization with advanced market understanding and SEO',
    tier: ModelTier.ENTERPRISE,
    requiredSubscription: 'enterprise',
    apiConfig: {
      modelName: 'claude-3-7-sonnet-20240229',
      maxTokens: 4000,
      temperature: 0.7
    }
  }
];

// Get model by ID
export function getModelById(modelId: string): AIModel | undefined {
  return AI_MODELS.find(model => model.id === modelId);
}

// Get default model for a subscription tier
export function getDefaultModelForSubscription(subscription: string): AIModel {
  // Find the best model available for this subscription
  const eligibleModels = AI_MODELS.filter(model => {
    if (subscription === 'enterprise') return true;
    if (subscription === 'pro' && model.requiredSubscription !== 'enterprise') return true;
    if (subscription === 'basic' && ['free', 'basic'].includes(model.requiredSubscription)) return true;
    if (subscription === 'free' && model.requiredSubscription === 'free') return true;
    return false;
  });
  
  // Sort by tier (highest first) and return the best one
  eligibleModels.sort((a, b) => b.tier.localeCompare(a.tier));
  return eligibleModels[0] || AI_MODELS[0]; // Fallback to first model if nothing found
}
