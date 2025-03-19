// User model
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
  subscriptionPlan: 'free' | 'basic' | 'pro' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

// Product model
export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  attributes: Record<string, string>;
  sku: string;
  inventoryQuantity: number;
}

export interface Product {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  attributes: Record<string, string>;
  images: string[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

// Marketplace models
export interface MarketplaceProductRequirements {
  platform: string;
  titleMaxLength: number;
  descriptionMaxLength: number;
  maxTags: number;
  requiredAttributes: string[];
  supportedCategories: string[];
  imageRequirements: {
    maxImages: number;
    formats: string[];
    maxSizeKB: number;
  };
}

export interface OptimizedListing {
  id: string;
  userId: string;
  platform: string;
  title: string;
  description: string;
  bulletPoints?: string[];
  tags: string[];
  category: string;
  recommendedPrice?: number;
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  images?: string[];
  originalProductId: string;
  createdAt: string;
}

export interface OptimizationResult {
  id: string;
  userId: string;
  masterProductId: string;
  optimizedListings: string[]; // IDs of optimized listings
  optimizationFocus?: string;
  targetAudience?: string;
  createdAt: string;
}

// Publishing models
export interface PublishResult {
  success: boolean;
  listingId?: string;
  listingUrl?: string;
  errors?: string[];
  platformName: string;
}
