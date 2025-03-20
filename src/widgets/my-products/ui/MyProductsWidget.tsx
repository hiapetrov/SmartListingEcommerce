import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../entities/product';
import { ProductCard } from '../../../features/product-card';
import { ProductFilterBar } from './ProductFilterBar';

export const MyProductsWidget: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Mock data for now, in real implementation we would fetch from API
        const mockProducts: Product[] = [
          {
            id: '1',
            title: 'Handcrafted Leather Wallet',
            description: 'Genuine leather wallet handmade with premium materials. Features 6 card slots and 2 cash compartments.',
            price: 39.99,
            category: 'Accessories',
            tags: ['leather', 'handmade', 'wallet', 'mens'],
            attributes: { material: 'leather', color: 'brown' },
            variants: [
              {
                id: 'v1',
                title: 'Brown',
                price: 39.99,
                attributes: { color: 'brown' },
                sku: 'LW-BRN-001',
                inventoryQuantity: 15
              },
              {
                id: 'v2',
                title: 'Black',
                price: 39.99,
                attributes: { color: 'black' },
                sku: 'LW-BLK-001',
                inventoryQuantity: 12
              }
            ],
            images: ['https://via.placeholder.com/300x300?text=Leather+Wallet']
          },
          {
            id: '2',
            title: 'Ceramic Coffee Mug Set',
            description: 'Set of 4 handcrafted ceramic coffee mugs. Each mug holds 12oz and is microwave and dishwasher safe.',
            price: 49.99,
            category: 'Home & Kitchen',
            tags: ['ceramic', 'coffee', 'mug', 'handmade', 'kitchen'],
            attributes: { material: 'ceramic', count: '4' },
            variants: [
              {
                id: 'v1',
                title: 'Blue',
                price: 49.99,
                attributes: { color: 'blue' },
                sku: 'CM-BLU-004',
                inventoryQuantity: 8
              }
            ],
            images: ['https://via.placeholder.com/300x300?text=Ceramic+Mugs']
          },
          {
            id: '3',
            title: 'Vintage Camera Strap',
            description: 'Adjustable leather camera strap compatible with all DSLR cameras. Handcrafted with genuine leather.',
            price: 29.99,
            category: 'Photography',
            tags: ['camera', 'strap', 'leather', 'vintage', 'photography'],
            attributes: { material: 'leather', length: 'adjustable' },
            variants: [
              {
                id: 'v1',
                title: 'Brown',
                price: 29.99,
                attributes: { color: 'brown' },
                sku: 'CS-BRN-001',
                inventoryQuantity: 22
              }
            ],
            images: ['https://via.placeholder.com/300x300?text=Camera+Strap']
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (category: string, search: string) => {
    let filtered = [...products];
    
    if (category && category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleCreateProduct = () => {
    navigate('/optimize');
  };

  const handleOptimizeProduct = (product: Product) => {
    // In a real implementation, we would store the product in a context or state manager
    // and then navigate to the optimize page with the product pre-loaded
    navigate('/optimize');
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <div className="animate-pulse text-gray-400">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <div className="text-red-400">{error}</div>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <ProductFilterBar 
          categories={categories} 
          onFilterChange={handleFilterChange} 
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={handleCreateProduct}
        >
          Create New Product
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-white mb-2">No products found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your filters or create a new product</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={handleCreateProduct}
          >
            Create New Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onOptimize={() => handleOptimizeProduct(product)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
