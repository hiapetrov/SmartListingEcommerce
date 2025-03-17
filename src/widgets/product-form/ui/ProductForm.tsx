import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../../entities/product';
import { ProductFormProps, ProductFormState } from '../model/types';

export const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct = {},
  onSubmit,
  isSubmitting = false
}) => {
  const [formState, setFormState] = useState<ProductFormState>({
    title: initialProduct.title || '',
    description: initialProduct.description || '',
    price: initialProduct.price || 0,
    category: initialProduct.category || '',
    tags: initialProduct.tags || [],
    attributes: initialProduct.attributes || {},
    variants: initialProduct.variants || [],
    images: initialProduct.images 
      ? initialProduct.images.map((url, idx) => ({ url, alt: '', position: idx }))
      : [],
    errors: {}
  });
  
  const [currentTag, setCurrentTag] = useState('');
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!formState.tags.includes(currentTag.trim())) {
        setFormState(prev => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()]
        }));
      }
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setFormState(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file, index) => ({
        file,
        url: URL.createObjectURL(file),
        alt: '',
        position: formState.images.length + index
      }));
      
      setFormState(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...formState.images];
    
    // If this image has a URL from a File object, revoke it to prevent memory leaks
    if (newImages[index].file) {
      URL.revokeObjectURL(newImages[index].url);
    }
    
    newImages.splice(index, 1);
    
    // Update positions for remaining images
    newImages.forEach((img, idx) => {
      img.position = idx;
    });
    
    setFormState(prev => ({
      ...prev,
      images: newImages
    }));
  };
  
  const updateImageAlt = (index: number, alt: string) => {
    const newImages = [...formState.images];
    newImages[index].alt = alt;
    setFormState(prev => ({
      ...prev,
      images: newImages
    }));
  };
  
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formState.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formState.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (formState.price <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    
    if (!formState.category.trim()) {
      errors.category = 'Category is required';
    }
    
    if (formState.images.length === 0) {
      errors.images = 'At least one image is required';
    }
    
    setFormState(prev => ({
      ...prev,
      errors
    }));
    
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert the form state to a Product object
      const product: Product = {
        id: initialProduct.id || uuidv4(),
        title: formState.title,
        description: formState.description,
        price: formState.price,
        category: formState.category,
        tags: formState.tags,
        attributes: formState.attributes,
        variants: formState.variants,
        images: formState.images.map(img => img.url)
      };
      
      onSubmit(product);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
          Product Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formState.title}
          onChange={handleTextChange}
          className={`mt-1 block w-full bg-gray-700 border ${
            formState.errors.title ? 'border-red-500' : 'border-gray-600'
          } rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter product title"
        />
        {formState.errors.title && (
          <p className="mt-1 text-sm text-red-500">{formState.errors.title}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">
          Product Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={5}
          value={formState.description}
          onChange={handleTextChange}
          className={`mt-1 block w-full bg-gray-700 border ${
            formState.errors.description ? 'border-red-500' : 'border-gray-600'
          } rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter product description"
        />
        {formState.errors.description && (
          <p className="mt-1 text-sm text-red-500">{formState.errors.description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-300">
            Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="price"
              id="price"
              value={formState.price}
              onChange={handleNumberChange}
              min="0"
              step="0.01"
              className={`block w-full pl-7 bg-gray-700 border ${
                formState.errors.price ? 'border-red-500' : 'border-gray-600'
              } rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="0.00"
            />
          </div>
          {formState.errors.price && (
            <p className="mt-1 text-sm text-red-500">{formState.errors.price}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formState.category}
            onChange={e => setFormState(prev => ({ ...prev, category: e.target.value }))}
            className={`mt-1 block w-full bg-gray-700 border ${
              formState.errors.category ? 'border-red-500' : 'border-gray-600'
            } rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select a category</option>
            <option value="Apparel">Apparel</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Electronics">Electronics</option>
            <option value="Beauty">Beauty</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Art">Art</option>
            <option value="Craft Supplies">Craft Supplies</option>
          </select>
          {formState.errors.category && (
            <p className="mt-1 text-sm text-red-500">{formState.errors.category}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formState.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm flex items-center"
            >
              {tag}
              <button 
                type="button" 
                onClick={() => removeTag(tag)}
                className="ml-2 text-white hover:text-red-300"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          id="tags"
          value={currentTag}
          onChange={e => setCurrentTag(e.target.value)}
          onKeyDown={handleTagKeyDown}
          className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a tag and press Enter"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Images
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
          {formState.images.map((image, index) => (
            <div key={index} className="relative">
              <img 
                src={image.url} 
                alt={image.alt}
                className="h-32 w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center hover:bg-red-600"
              >
                &times;
              </button>
              <input
                type="text"
                value={image.alt}
                onChange={e => updateImageAlt(index, e.target.value)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-1 px-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Alt text"
              />
            </div>
          ))}
          
          {/* Image upload button */}
          <div className="h-32 border-2 border-dashed border-gray-600 rounded-md flex items-center justify-center hover:border-gray-500 cursor-pointer relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                />
              </svg>
              <p className="mt-1 text-sm text-gray-400">Upload images</p>
            </div>
          </div>
        </div>
        {formState.errors.images && (
          <p className="mt-1 text-sm text-red-500">{formState.errors.images}</p>
        )}
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};
