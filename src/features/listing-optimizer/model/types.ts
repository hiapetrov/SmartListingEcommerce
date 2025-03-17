import { Product } from '../../../entities/product';
import { OptimizedListing } from '../../../entities/marketplace';

export interface OptimizationRequest {
  product: Product;
  platforms: string[]; // e.g., ["shopify", "etsy", "amazon"]
  optimizationFocus?: string; // e.g., "sustainable materials, gifting"
  targetAudience?: string;
}

export interface OptimizationResult {
  masterProduct: Product;
  optimizedListings: OptimizedListing[];
  optimizationId: string;
}

export type OptimizationStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ListingOptimizerState {
  currentProduct: Product | null;
  selectedPlatforms: string[];
  optimizationFocus: string;
  targetAudience: string;
  optimizationResult: OptimizationResult | null;
  status: OptimizationStatus;
  error: string | null;
}
