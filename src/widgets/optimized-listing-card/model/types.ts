import { OptimizedListing } from '../../../entities/marketplace';

export interface OptimizedListingCardProps {
  listing: OptimizedListing;
  onEdit: (listing: OptimizedListing) => void;
  onRegenerate: (platform: string) => void;
  isRegenerating?: boolean;
}
