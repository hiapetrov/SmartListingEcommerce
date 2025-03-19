import { NextRequest, NextResponse } from 'next/server';
import { JsonStorage } from '@/utils/storage';
import { verifyPassword, createToken } from '@/utils/auth';
import { User } from '@/models';

const userStorage = new JsonStorage<User>('users.json');

export async function POST(request: NextRequest) {
  try {
    // Get form data (handling both JSON and form data)
    let username = '';
    let password = '';
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const body = await request.json();
      username = body.username || body.email;
      password = body.password;
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      username = formData.get('username')?.toString() || '';
      password = formData.get('password')?.toString() || '';
    }
    
    if (!username || !password) {
      return NextResponse.json(
        { detail: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const users = userStorage.search({ email: username } as Partial<User>);
    if (users.length === 0) {
      return NextResponse.json(
        { detail: 'Incorrect email or password' },
        { status: 401 }
      );
    }
    
    const user = users[0];
    
    // Verify password
    const isPasswordValid = await verifyPassword(password, user.hashedPassword);
    if (!isPasswordValid) {
      return NextResponse.json(
        { detail: 'Incorrect email or password' },
        { status: 401 }
      );
    }
    
    // Create token
    const accessToken = await createToken(user.id);
    
    // Return response without password
    const { hashedPassword: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      access_token: accessToken,
      token_type: 'bearer',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { detail: 'Login failed' },
      { status: 500 }
    );
  }
}
