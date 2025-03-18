from pydantic import BaseModel
from typing import List, Dict, Optional

class ProductVariant(BaseModel):
    id: Optional[str] = None
    title: str
    price: float
    attributes: Dict[str, str]
    sku: str
    inventory_quantity: int

class ProductImage(BaseModel):
    id: Optional[str] = None
    url: str
    alt: str
    position: int

class ProductBase(BaseModel):
    title: str
    description: str
    price: float
    category: str
    tags: List[str]
    attributes: Dict[str, str]
    images: List[str]
    variants: List[ProductVariant]

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class Product(ProductBase):
    id: str
    user_id: str
    created_at: str
    updated_at: str
    
    class Config:
        from_attributes = True
