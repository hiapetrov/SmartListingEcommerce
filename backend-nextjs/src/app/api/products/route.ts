import { NextRequest, NextResponse } from 'next/server';
import { JsonStorage } from '@/utils/storage';
import { getCurrentUser } from '@/utils/auth';
import { Product } from '@/models';

const productStorage = new JsonStorage<Product>('products.json');

// Get all products for current user
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { detail: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const products = productStorage.search({ userId: user.id } as Partial<Product>);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { detail: 'Failed to get products' },
      { status: 500 }
    );
  }
}

// Create a new product
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { detail: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const productData = await request.json();
    
    const product = productStorage.create({
      ...productData,
      userId: user.id
    } as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>);
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { detail: 'Failed to create product' },
      { status: 500 }
    );
  }
}
