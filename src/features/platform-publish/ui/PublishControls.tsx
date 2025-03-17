import React from 'react';
import { OptimizedListing } from '../../../entities/marketplace';
import { PublishStatus } from '../model/types';

interface PublishControlsProps {
  optimizedListings: OptimizedListing[];
  onPublish: (listings: OptimizedListing[]) => void;
  status: PublishStatus;
  results: Record<string, { success: boolean; listingUrl?: string }>;
}

export const PublishControls: React.FC<PublishControlsProps> = ({
  optimizedListings,
  onPublish,
  status,
  results
}) => {
  const [selectedListings, setSelectedListings] = React.useState<OptimizedListing[]>([]);
  
  React.useEffect(() => {
    // By default, select all optimized listings
    setSelectedListings(optimizedListings);
  }, [optimizedListings]);
  
  const toggleListing = (listing: OptimizedListing) => {
    if (selectedListings.some(l => l.platform === listing.platform)) {
      setSelectedListings(selectedListings.filter(l => l.platform !== listing.platform));
    } else {
      setSelectedListings([...selectedListings, listing]);
    }
  };
  
  const isPublishing = status === 'publishing';
  const hasResults = status === 'success' && Object.keys(results).length > 0;
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Publish Listings</h3>
      
      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-300 mb-2">Select platforms to publish to:</h4>
        <div className="space-y-2">
          {optimizedListings.map(listing => (
            <div 
              key={listing.platform} 
              className="flex items-center"
            >
              <input
                type="checkbox"
                id={`platform-${listing.platform}`}
                checked={selectedListings.some(l => l.platform === listing.platform)}
                onChange={() => toggleListing(listing)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded"
              />
              <label 
                htmlFor={`platform-${listing.platform}`}
                className="ml-2 text-gray-300 capitalize"
              >
                {listing.platform}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <button
        className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-4 rounded-md font-medium hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        onClick={() => onPublish(selectedListings)}
        disabled={isPublishing || selectedListings.length === 0}
      >
        {isPublishing ? 'Publishing...' : 'Publish Selected Listings'}
      </button>
      
      {hasResults && (
        <div className="mt-4 space-y-2">
          <h4 className="text-md font-medium text-gray-300">Results:</h4>
          {Object.entries(results).map(([platform, result]) => (
            <div key={platform} className="flex items-center text-sm">
              <span className={`h-2 w-2 rounded-full ${result.success ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
              <span className="text-gray-300 capitalize mr-2">{platform}:</span>
              <span className={result.success ? 'text-green-400' : 'text-red-400'}>
                {result.success ? 'Published successfully' : 'Failed to publish'}
              </span>
              {result.success && result.listingUrl && (
                <a 
                  href={result.listingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-400 hover:text-blue-300"
                >
                  View Listing
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
