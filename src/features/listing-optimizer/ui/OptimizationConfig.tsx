import React, { useState } from 'react';
import { ModelSelector } from './ModelSelector';
import { SubscriptionPrompt } from './SubscriptionPrompt';

interface OptimizationConfigProps {
  optimizationFocus: string;
  targetAudience: string;
  selectedModelId: string;
  onOptimizationFocusChange: (focus: string) => void;
  onTargetAudienceChange: (audience: string) => void;
  onModelChange: (modelId: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const OptimizationConfig: React.FC<OptimizationConfigProps> = ({
  optimizationFocus,
  targetAudience,
  selectedModelId,
  onOptimizationFocusChange,
  onTargetAudienceChange,
  onModelChange,
  onSubmit,
  isSubmitting
}) => {
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [requiredSubscription, setRequiredSubscription] = useState('basic');
  
  const handleShowSubscriptionPrompt = (subscription: string) => {
    setRequiredSubscription(subscription);
    setIsPromptOpen(true);
  };
  
  const handleUpgrade = () => {
    // Close the prompt
    setIsPromptOpen(false);
    
    // Here you would navigate to the subscription page
    // For now, we'll just log it
    console.log('Navigating to subscription page for', requiredSubscription);
    alert('This would navigate to the subscription page in a real implementation.');
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Optimization Settings</h3>
      
      <ModelSelector
        selectedModelId={selectedModelId}
        onModelChange={onModelChange}
        showSubscriptionPrompt={handleShowSubscriptionPrompt}
      />
      
      <div className="mb-4">
        <label htmlFor="optimizationFocus" className="block text-sm font-medium text-gray-300 mb-2">
          Optimization Focus
        </label>
        <textarea
          id="optimizationFocus"
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., sustainable materials, holiday gifting, premium quality"
          rows={3}
          value={optimizationFocus}
          onChange={(e) => onOptimizationFocusChange(e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-400">
          What aspects of your product should the AI emphasize?
        </p>
      </div>
      
      <div className="mb-4">
        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-300 mb-2">
          Target Audience
        </label>
        <textarea
          id="targetAudience"
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., young professionals, eco-conscious consumers, gift shoppers"
          rows={3}
          value={targetAudience}
          onChange={(e) => onTargetAudienceChange(e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-400">
          Who is the ideal customer for this product?
        </p>
      </div>
      
      <button
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Optimizing...' : 'Generate Optimized Listings'}
      </button>
      
      <SubscriptionPrompt
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        requiredSubscription={requiredSubscription}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};
