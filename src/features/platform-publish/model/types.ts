import { OptimizedListing } from '../../../entities/marketplace';

export interface PublishRequest {
  optimizedListing: OptimizedListing;
  platformCredentials: {
    platform: string;
    credentials: Record<string, string>;
  };
}

export interface PublishResult {
  success: boolean;
  listingId?: string;
  listingUrl?: string;
  errors?: string[];
  platformName: string;
}

export type PublishStatus = 'idle' | 'publishing' | 'success' | 'error';

export interface PlatformPublishState {
  status: PublishStatus;
  results: Record<string, PublishResult>;
  error: string | null;
}
