import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/utils/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    
    if (!user) {
      return NextResponse.json(
        { detail: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Return user without password
    const { hashedPassword: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { detail: 'Authentication failed' },
      { status: 500 }
    );
  }
}
