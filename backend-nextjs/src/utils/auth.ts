import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { User } from '@/models';
import { JsonStorage } from './storage';

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-for-development'
);

// JWT token expiration (30 minutes)
const JWT_EXPIRATION = '30m';

// User storage
const userStorage = new JsonStorage<User>('users.json');

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Create a JWT token
export async function createToken(userId: string): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);
}

// Get current user from request
export async function getCurrentUser(request: NextRequest): Promise<User | null> {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7);
    
    // Verify token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.sub as string;
    
    // Get user from storage
    return userStorage.getById(userId);
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}
