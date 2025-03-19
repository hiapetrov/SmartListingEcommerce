import { NextRequest, NextResponse } from 'next/server';
import { JsonStorage } from '@/utils/storage';
import { hashPassword, createToken } from '@/utils/auth';
import { User } from '@/models';

const userStorage = new JsonStorage<User>('users.json');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, password } = body;
    
    // Check if user already exists
    const existingUsers = userStorage.search({ email } as Partial<User>);
    if (existingUsers.length > 0) {
      return NextResponse.json(
        { detail: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const newUser = userStorage.create({
      email,
      firstName,
      lastName,
      hashedPassword,
      subscriptionPlan: 'free',
    } as Omit<User, 'id' | 'createdAt' | 'updatedAt'>);
    
    // Create token
    const accessToken = await createToken(newUser.id);
    
    // Return response without password
    const { hashedPassword: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json({
      access_token: accessToken,
      token_type: 'bearer',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { detail: 'Registration failed' },
      { status: 500 }
    );
  }
}
