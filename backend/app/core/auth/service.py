from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.schemas.auth import UserCreate, User, TokenData
from app.db.base import JsonStorage
from app.config import settings

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# Initialize user storage
user_storage = JsonStorage[User](settings.USERS_FILE, User)

def verify_password(plain_password, hashed_password):
    """Verify password against hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """Hash password"""
    return pwd_context.hash(password)

def create_user(user: UserCreate) -> Optional[User]:
    """Create a new user"""
    # Check if user already exists
    existing_users = user_storage.search({"email": user.email})
    if existing_users:
        return None
    
    # Hash password
    hashed_password = get_password_hash(user.password)
    
    # Create user without password in the model
    user_data = user.dict(exclude={"password"})
    user_data["hashed_password"] = hashed_password
    user_data["subscription_plan"] = "free"
    
    return user_storage.create(User(**user_data))

def authenticate_user(email: str, password: str) -> Optional[User]:
    """Authenticate user with email and password"""
    users = user_storage.search({"email": email})
    if not users:
        return None
    
    user = users[0]
    user_dict = user.dict()
    
    if not verify_password(password, user_dict.get("hashed_password", "")):
        return None
    
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    """Get current user from token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=user_id)
    except JWTError:
        raise credentials_exception
    
    user = user_storage.get_by_id(token_data.user_id)
    if user is None:
        raise credentials_exception
    
    return user
