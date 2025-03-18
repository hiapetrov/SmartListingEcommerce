from pydantic import BaseModel
from typing import List, Dict, Optional
from app.schemas.products import Product

class MarketplaceProductRequirements(BaseModel):
    platform: str
    title_max_length: int
    description_max_length: int
    max_tags: int
    required_attributes: List[str]
    supported_categories: List[str]
    image_requirements: Dict[str, object]

class OptimizationRequest(BaseModel):
    product: Product
    platform: str
    optimization_focus: Optional[str] = ""
    target_audience: Optional[str] = ""
    platform_requirements: MarketplaceProductRequirements

class OptimizedListing(BaseModel):
    platform: str
    title: str
    description: str
    bullet_points: Optional[List[str]] = None
    tags: List[str]
    category: str
    recommended_price: Optional[float] = None
    seo_metadata: Optional[Dict[str, str]] = None
    images: Optional[List[str]] = None
    original_product_id: str

class OptimizationResult(BaseModel):
    id: str
    user_id: str
    master_product_id: str
    optimized_listings: List[OptimizedListing]
    created_at: str
    optimization_focus: Optional[str] = None
    target_audience: Optional[str] = None
