import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ProductForm } from '../../widgets/product-form';
import { OptimizedListingCard } from '../../widgets/optimized-listing-card';
import { PlatformSelector, OptimizationConfig, optimizeListings } from '../../features/listing-optimizer';
import { PublishControls } from '../../features/platform-publish';
import { Product } from '../../entities/product';
import { OptimizedListing } from '../../entities/marketplace';

const ListingOptimizerPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['shopify', 'etsy']);
  const [optimizationFocus, setOptimizationFocus] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<{
    masterProduct: Product;
    optimizedListings: OptimizedListing[];
  } | null>(null);
  const [isRegeneratingPlatform, setIsRegeneratingPlatform] = useState<string | null>(null);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'success' | 'error'>('idle');
  const [publishResults, setPublishResults] = useState<Record<string, { success: boolean; listingUrl?: string }>>({});
  
  const handleProductSubmit = (product: Product) => {
    setProduct(product);
    setOptimizationResult(null);
  };
  
  const handleOptimize = async () => {
    if (!product) return;
    
    setIsOptimizing(true);
    
    try {
      const result = await optimizeListings({
        product,
        platforms: selectedPlatforms,
        optimizationFocus,
        targetAudience
      });
      
      setOptimizationResult(result);
    } catch (error) {
      console.error('Optimization failed:', error);
      // Handle error
    } finally {
      setIsOptimizing(false);
    }
  };
  
  const handleRegenerateListing = async (platform: string) => {
    if (!product || !optimizationResult) return;
    
    setIsRegeneratingPlatform(platform);
    
    try {
      const result = await optimizeListings({
        product,
        platforms: [platform],
        optimizationFocus,
        targetAudience
      });
      
      // Update just the regenerated platform listing
      const updatedListings = optimizationResult.optimizedListings.map(listing => 
        listing.platform === platform ? result.optimizedListings[0] : listing
      );
      
      setOptimizationResult({
        ...optimizationResult,
        optimizedListings: updatedListings
      });
    } catch (error) {
      console.error('Regeneration failed:', error);
      // Handle error
    } finally {
      setIsRegeneratingPlatform(null);
    }
  };
  
  const handleEditListing = (updatedListing: OptimizedListing) => {
    if (!optimizationResult) return;
    
    const updatedListings = optimizationResult.optimizedListings.map(listing => 
      listing.platform === updatedListing.platform ? updatedListing : listing
    );
    
    setOptimizationResult({
      ...optimizationResult,
      optimizedListings: updatedListings
    });
  };
  
  const handlePublish = async (listings: OptimizedListing[]) => {
    setPublishStatus('publishing');
    
    // Simulate publishing to platforms
    try {
      // In a real implementation, this would call your publishing API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const results = listings.reduce((acc, listing) => {
        acc[listing.platform] = {
          success: true,
          listingUrl: `https://${listing.platform}.example.com/products/${listing.title.toLowerCase().replace(/\s+/g, '-')}`
        };
        return acc;
      }, {} as Record<string, { success: boolean; listingUrl?: string }>);
      
      setPublishResults(results);
      setPublishStatus('success');
    } catch (error) {
      console.error('Publishing failed:', error);
      setPublishStatus('error');
    }
  };
  
  // Available platforms for selection
  const availablePlatforms = [
    { id: 'shopify', name: 'Shopify', iconName: 'ShoppingBag', colorFrom: 'from-green-400', colorTo: 'to-green-600' },
    { id: 'etsy', name: 'Etsy', iconName: 'Package', colorFrom: 'from-orange-400', colorTo: 'to-red-500' },
    { id: 'amazon', name: 'Amazon', iconName: 'ShoppingCart', colorFrom: 'from-blue-400', colorTo: 'to-blue-600' }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Listing Optimizer</h1>
        <div className="text-gray-400">Create optimized listings for multiple platforms</div>
      </div>
      
      {!product ? (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Create Your Product</h2>
          <ProductForm onSubmit={handleProductSubmit} />
        </div>
      ) : !optimizationResult ? (
        <div>
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Your Product</h2>
            <div className="flex mb-4">
              <div className="w-24 h-24 bg-gray-700 rounded-md mr-4 flex-shrink-0">
                {product.images && product.images.length > 0 && (
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <h3 className="text-white font-medium">{product.title}</h3>
                <p className="text-gray-400 text-sm mt-1">${product.price.toFixed(2)}</p>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
              </div>
            </div>
            <button 
              className="text-blue-400 hover:text-blue-300"
              onClick={() => setProduct(null)}
            >
              Edit Product
            </button>
          </div>
          
          <PlatformSelector
            availablePlatforms={availablePlatforms}
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={setSelectedPlatforms}
          />
          
          <OptimizationConfig
            optimizationFocus={optimizationFocus}
            targetAudience={targetAudience}
            onOptimizationFocusChange={setOptimizationFocus}
            onTargetAudienceChange={setTargetAudience}
            onSubmit={handleOptimize}
            isSubmitting={isOptimizing}
          />
        </div>
      ) : (
        <div>
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Your Product</h2>
            <div className="flex mb-4">
              <div className="w-24 h-24 bg-gray-700 rounded-md mr-4 flex-shrink-0">
                {product.images && product.images.length > 0 && (
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <h3 className="text-white font-medium">{product.title}</h3>
                <p className="text-gray-400 text-sm mt-1">${product.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-2">
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm"
                    onClick={() => {
                      setProduct(null);
                      setOptimizationResult(null);
                    }}
                  >
                    Start Over
                  </button>
                  <button 
                    className="text-purple-400 hover:text-purple-300 text-sm"
                    onClick={() => setOptimizationResult(null)}
                  >
                    Change Optimization Settings
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Optimization Focus</h4>
              <p className="text-white text-sm">{optimizationFocus || 'None specified'}</p>
              
              <h4 className="text-sm font-medium text-gray-400 mt-3 mb-2">Target Audience</h4>
              <p className="text-white text-sm">{targetAudience || 'None specified'}</p>
            </div>
          </div>
          
          <PublishControls
            optimizedListings={optimizationResult.optimizedListings}
            onPublish={handlePublish}
            status={publishStatus}
            results={publishResults}
          />
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Optimized Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {optimizationResult.optimizedListings.map(listing => (
                <OptimizedListingCard
                  key={listing.platform}
                  listing={listing}
                  onEdit={handleEditListing}
                  onRegenerate={handleRegenerateListing}
                  isRegenerating={isRegeneratingPlatform === listing.platform}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingOptimizerPage;
