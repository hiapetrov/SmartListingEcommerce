from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.schemas.products import Product, ProductCreate, ProductUpdate
from app.core.products.service import (
    create_product,
    get_user_products,
    get_product,
    update_product,
    delete_product
)
from app.core.auth.service import get_current_user
from app.schemas.auth import User

router = APIRouter()

@router.post("/", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product_endpoint(
    product: ProductCreate, 
    current_user: User = Depends(get_current_user)
):
    """Create a new product"""
    return create_product(product, current_user.id)

@router.get("/", response_model=List[Product])
async def list_products(current_user: User = Depends(get_current_user)):
    """List all products for current user"""
    return get_user_products(current_user.id)

@router.get("/{product_id}", response_model=Product)
async def get_product_endpoint(
    product_id: str, 
    current_user: User = Depends(get_current_user)
):
    """Get a specific product"""
    product = get_product(product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Ensure user owns this product
    if product.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to access this product"
        )
    
    return product

@router.put("/{product_id}", response_model=Product)
async def update_product_endpoint(
    product_id: str,
    product: ProductUpdate,
    current_user: User = Depends(get_current_user)
):
    """Update a product"""
    existing_product = get_product(product_id)
    if not existing_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Ensure user owns this product
    if existing_product.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to update this product"
        )
    
    updated_product = update_product(product_id, product)
    return updated_product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product_endpoint(
    product_id: str,
    current_user: User = Depends(get_current_user)
):
    """Delete a product"""
    existing_product = get_product(product_id)
    if not existing_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Ensure user owns this product
    if existing_product.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to delete this product"
        )
    
    success = delete_product(product_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete product"
        )
