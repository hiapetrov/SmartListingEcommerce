import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/utils/auth';
import { JsonStorage } from '@/utils/storage';
import { OptimizedListing, PublishResult } from '@/models';

const optimizedListingStorage = new JsonStorage<OptimizedListing>('optimized_listings.json');

// Mock function to publish to a platform
async function publishToPlatform(
  listing: OptimizedListing,
  platform: string,
  credentials: Record<string, string>
): Promise<PublishResult> {
  // In a real app, you would call the platform API
  console.log(`Publishing to ${platform}:`, listing.title);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock listing URL based on platform
  let listingUrl = '';
  let listingId = '';
  
  switch (platform) {
    case 'shopify':
      listingId = `shopify-${Date.now()}`;
      listingUrl = `https://${credentials.shopName || 'example'}.myshopify.com/products/${listing.title.toLowerCase().replace(/\s+/g, '-')}`;
      break;
      
    case 'etsy':
      listingId = `etsy-${Date.now()}`;
      listingUrl = `https://www.etsy.com/listing/${Math.floor(Math.random() * 1000000000)}/${listing.title.toLowerCase().replace(/\s+/g, '-')}`;
      break;
      
    case 'amazon':
      const asin = `B${Math.floor(Math.random() * 100000000).toString().padStart(9, '0')}`;
      listingId = asin;
      listingUrl = `https://www.amazon.com/dp/${asin}`;
      break;
  }
  
  return {
    success: true,
    listingId,
    listingUrl,
    platformName: platform
  };
}

// Publish a listing to a platform
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { detail: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { optimizedListing, platformCredentials } = body;
    
    // Verify the listing exists and belongs to the user
    const listing = optimizedListingStorage.getById(optimizedListing.id);
    if (!listing || listing.userId !== user.id) {
      return NextResponse.json(
        { detail: 'Listing not found or access denied' },
        { status: 404 }
      );
    }
    
    // Publish to platform
    const result = await publishToPlatform(
      listing,
      platformCredentials.platform,
      platformCredentials.credentials
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Publishing error:', error);
    return NextResponse.json(
      { detail: 'Failed to publish listing' },
      { status: 500 }
    );
  }
}
