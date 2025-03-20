import React from 'react';
import { Product } from '../../../entities/product';
import { Card } from '../../../shared/ui/card';

interface ProductCardProps {
  product: Product;
  onOptimize: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOptimize }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48 rounded-t-lg overflow-hidden bg-gray-700">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-medium text-gray-800 mb-1">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-2"></p>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
              +{product.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="mt-auto">
          <button
            onClick={onOptimize}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            Optimize for Marketplaces
          </button>
        </div>
      </div>
    </Card>
  );
};
