import { Product } from '.';

export interface OptimizationRequest {
  product: Product;
  platform: string;
  optimizationFocus?: string;
  targetAudience?: string;
  modelId?: string; // The AI model to use
}

export interface OptimizationMultiRequest {
  product: Product;
  platforms: string[];
  optimizationFocus?: string;
  targetAudience?: string;
  modelId?: string; // The AI model to use
}
