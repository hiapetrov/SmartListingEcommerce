from pydantic import BaseModel
from typing import Optional, List
from app.schemas.ai import OptimizedListing

class PublishRequest(BaseModel):
    optimized_listing: OptimizedListing
    platform_credentials: dict

class PublishResult(BaseModel):
    success: bool
    listing_id: Optional[str] = None
    listing_url: Optional[str] = None
    errors: Optional[List[str]] = None
    platform_name: str
