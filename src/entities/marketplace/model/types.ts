import { Product } from '../../product';

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
  platform: string;
  title: string;
  description: string;
  bulletPoints?: string[]; // For Amazon
  tags: string[];
  category: string;
  recommendedPrice?: number;
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  images?: string[];
  originalProduct: Product;
}

export const PLATFORM_REQUIREMENTS: Record<string, MarketplaceProductRequirements> = {
  shopify: {
    platform: 'shopify',
    titleMaxLength: 255,
    descriptionMaxLength: 5000,
    maxTags: 250,
    requiredAttributes: ['title', 'price'],
    supportedCategories: ['Apparel', 'Home & Garden', 'Electronics', 'Beauty', 'Toys'],
    imageRequirements: {
      maxImages: 10,
      formats: ['jpg', 'png', 'gif'],
      maxSizeKB: 20000
    }
  },
  etsy: {
    platform: 'etsy',
    titleMaxLength: 140,
    descriptionMaxLength: 5000,
    maxTags: 13,
    requiredAttributes: ['title', 'description', 'price', 'who_made', 'when_made'],
    supportedCategories: ['Art', 'Home & Living', 'Jewelry', 'Clothing', 'Craft Supplies'],
    imageRequirements: {
      maxImages: 10,
      formats: ['jpg', 'png', 'gif'],
      maxSizeKB: 3000
    }
  },
  amazon: {
    platform: 'amazon',
    titleMaxLength: 200,
    descriptionMaxLength: 2000,
    maxTags: 5,
    requiredAttributes: ['title', 'description', 'price', 'brand', 'upc'],
    supportedCategories: ['Home & Kitchen', 'Clothing', 'Electronics', 'Beauty', 'Toys & Games'],
    imageRequirements: {
      maxImages: 9,
      formats: ['jpg', 'png', 'gif'],
      maxSizeKB: 10000
    }
  }
};
