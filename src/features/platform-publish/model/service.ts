import { PublishRequest, PublishResult } from './types';
import { createShopifyProduct } from '../../../shared/api/platforms/shopify';
import { createEtsyListing } from '../../../shared/api/platforms/etsy';
import { createAmazonListing } from '../../../shared/api/platforms/amazon';

export const publishListing = async (request: PublishRequest): Promise<PublishResult> => {
  const { optimizedListing, platformCredentials } = request;
  const { platform } = platformCredentials;
  
  switch (platform) {
    case 'shopify':
      return createShopifyProduct(optimizedListing, platformCredentials.credentials);
    case 'etsy':
      return createEtsyListing(optimizedListing, platformCredentials.credentials);
    case 'amazon':
      return createAmazonListing(optimizedListing, platformCredentials.credentials);
    default:
      return {
        success: false,
        errors: [`Unsupported platform: ${platform}`],
        platformName: platform
      };
  }
};

export const publishToMultiplePlatforms = async (
  requests: PublishRequest[]
): Promise<Record<string, PublishResult>> => {
  const publishPromises = requests.map(request => 
    publishListing(request)
      .then(result => [request.platformCredentials.platform, result] as const)
  );
  
  const results = await Promise.all(publishPromises);
  
  return Object.fromEntries(results);
};
