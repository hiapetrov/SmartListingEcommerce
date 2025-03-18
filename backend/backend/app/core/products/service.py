from typing import List, Optional
from app.schemas.products import Product, ProductCreate, ProductUpdate
from app.db.base import JsonStorage
from app.config import settings

# Initialize product storage
product_storage = JsonStorage[Product](settings.PRODUCTS_FILE, Product)

def create_product(product: ProductCreate, user_id: str) -> Product:
    """Create a new product"""
    product_data = product.dict()
    product_data["user_id"] = user_id
    
    return product_storage.create(Product(**product_data))

def get_user_products(user_id: str) -> List[Product]:
    """Get all products for a user"""
    return product_storage.search({"user_id": user_id})

def get_product(product_id: str) -> Optional[Product]:
    """Get a specific product by ID"""
    return product_storage.get_by_id(product_id)

def update_product(product_id: str, product: ProductUpdate) -> Optional[Product]:
    """Update a product"""
    existing_product = product_storage.get_by_id(product_id)
    if not existing_product:
        return None
    
    # Preserve user_id
    product_data = product.dict()
    product_data["user_id"] = existing_product.user_id
    
    updated_product = Product(**product_data)
    return product_storage.update(product_id, updated_product)

def delete_product(product_id: str) -> bool:
    """Delete a product"""
    return product_storage.delete(product_id)
