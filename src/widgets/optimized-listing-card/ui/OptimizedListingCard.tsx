import React, { useState } from 'react';
import { OptimizedListingCardProps } from '../model/types';
import { PLATFORM_REQUIREMENTS } from '../../../entities/marketplace';

export const OptimizedListingCard: React.FC<OptimizedListingCardProps> = ({
  listing,
  onEdit,
  onRegenerate,
  isRegenerating = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedListing, setEditedListing] = useState(listing);
  const [isEditing, setIsEditing] = useState(false);
  
  const platformReqs = PLATFORM_REQUIREMENTS[listing.platform];
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const startEditing = () => {
    setEditedListing(listing);
    setIsEditing(true);
  };
  
  const cancelEditing = () => {
    setIsEditing(false);
  };
  
  const saveEdits = () => {
    onEdit(editedListing);
    setIsEditing(false);
  };
  
  const handleChange = (field: keyof typeof editedListing, value: any) => {
    setEditedListing(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'shopify':
        return 'from-green-400 to-green-600';
      case 'etsy':
        return 'from-orange-400 to-red-500';
      case 'amazon':
        return 'from-blue-400 to-blue-600';
      default:
        return 'from-indigo-400 to-indigo-600';
    }
  };
  
  const platformColor = getPlatformColor(listing.platform);
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:shadow-md transition-all">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r rounded-t-lg"></div>
      <div className={`h-1 w-full bg-gradient-to-r ${platformColor}`}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white capitalize">
            {listing.platform} Listing
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={startEditing}
              disabled={isEditing}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={() => onRegenerate(listing.platform)}
              disabled={isRegenerating}
              className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            >
              {isRegenerating ? 'Regenerating...' : 'Regenerate'}
            </button>
          </div>
        </div>
        
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editedListing.title}
                onChange={e => handleChange('title', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={platformReqs.titleMaxLength}
              />
              <p className="text-xs text-gray-400 mt-1">
                {editedListing.title.length}/{platformReqs.titleMaxLength} characters
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                rows={6}
                value={editedListing.description}
                onChange={e => handleChange('description', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={platformReqs.descriptionMaxLength}
              ></textarea>
              <p className="text-xs text-gray-400 mt-1">
                {editedListing.description.length}/{platformReqs.descriptionMaxLength} characters
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={editedListing.tags.join(', ')}
                onChange={e => handleChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                {editedListing.tags.length}/{platformReqs.maxTags} tags (comma separated)
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select
                value={editedListing.category}
                onChange={e => handleChange('category', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {platformReqs.supportedCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                onClick={saveEdits}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Save Changes
              </button>
              <button
                onClick={cancelEditing}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-400">Title</h4>
              <p className="text-white">{listing.title}</p>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-400">Description</h4>
                <button onClick={toggleExpand} className="text-blue-400 text-sm">
                  {isExpanded ? 'Show Less' : 'Show More'}
                </button>
              </div>
              <p className={`text-white ${isExpanded ? '' : 'line-clamp-3'}`}>
                {listing.description}
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-400">Tags</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {listing.tags.map(tag => (
                  <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-400">Category</h4>
              <p className="text-white">{listing.category}</p>
            </div>
            
            {listing.seoMetadata && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-sm font-medium text-gray-400 mb-2">SEO Metadata</h4>
                
                {listing.seoMetadata.metaTitle && (
                  <div className="mb-2">
                    <h5 className="text-xs font-medium text-gray-500">Meta Title</h5>
                    <p className="text-gray-300 text-sm">{listing.seoMetadata.metaTitle}</p>
                  </div>
                )}
                
                {listing.seoMetadata.metaDescription && (
                  <div>
                    <h5 className="text-xs font-medium text-gray-500">Meta Description</h5>
                    <p className="text-gray-300 text-sm">{listing.seoMetadata.metaDescription}</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
