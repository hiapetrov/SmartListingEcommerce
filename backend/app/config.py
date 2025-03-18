import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    PROJECT_NAME: str = "AI Listing Optimizer API"
    PROJECT_VERSION: str = "0.1.0"
    
    # JWT Authentication
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-for-development")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Claude API Settings
    CLAUDE_API_KEY: str = os.getenv("CLAUDE_API_KEY", "")
    
    # Database settings (for future implementation)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    
    # Storage paths for JSON files
    DATA_DIR: str = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
    USERS_FILE: str = os.path.join(DATA_DIR, "users.json")
    PRODUCTS_FILE: str = os.path.join(DATA_DIR, "products.json")
    OPTIMIZATIONS_FILE: str = os.path.join(DATA_DIR, "optimizations.json")

settings = Settings()
