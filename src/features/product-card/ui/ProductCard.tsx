import React from 'react';
import { Product } from '../../../entities/product';
import { Card } from '../../../shared/ui/card';
import { Button } from '../../../shared/ui/button';
import {
  imageContainer,
  productImage,
  noImagePlaceholder,
  contentContainer,
  productTitle,
  productPrice,
  productDescription,
  tagsContainer,
  productTag,
  moreTagsIndicator,
  actionButtonContainer
} from './product-card.css';

interface ProductCardProps {
  product: Product;
  onOptimize: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOptimize }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className={imageContainer}>
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className={productImage}
          />
        ) : (
          <div className={noImagePlaceholder}>
            No Image
          </div>
        )}
      </div>
      
      <div className={contentContainer}>
        <h3 className={productTitle}>{product.title}</h3>
        <p className={productPrice}>${product.price.toFixed(2)}</p>
        
        <p className={productDescription}>
          {product.description}
        </p>
        
        <div className={tagsContainer}>
          {product.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className={productTag}
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className={moreTagsIndicator}>
              +{product.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className={actionButtonContainer}>
          <Button
            variant="primary"
            fullWidth
            onClick={onOptimize}
          >
            Optimize for Marketplaces
          </Button>
        </div>
      </div>
    </Card>
  );
};