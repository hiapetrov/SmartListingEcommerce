import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../app/providers/AuthProvider';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  tier: string;
  isAvailable: boolean;
  requiredSubscription: string;
}

interface ModelSelectorProps {
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
  showSubscriptionPrompt: (requiredSubscription: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModelId,
  onModelChange,
  showSubscriptionPrompt
}) => {
  const { authState } = useAuth();
  const [models, setModels] = useState<AIModel[]>([]);
  const [defaultModelId, setDefaultModelId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch available models based on user's subscription
    const fetchModels = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // This would be an actual API call in production
        // For now, we're mocking the response
        const response = await fetch('http://localhost:8000/api/optimizations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch available AI models');
        }
        
        const data = await response.json();
        setModels(data.models);
        setDefaultModelId(data.defaultModel);
        
        // If no model selected yet, use the default
        if (!selectedModelId) {
          onModelChange(data.defaultModel);
        }
      } catch (error) {
        console.error('Error fetching models:', error);
        setError('Failed to load available models');
        
        // Use mock data as fallback
        const mockModels = getMockModels();
        setModels(mockModels);
        setDefaultModelId(mockModels[0].id);
        
        if (!selectedModelId) {
          onModelChange(mockModels[0].id);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchModels();
  }, [authState.user?.subscriptionPlan, selectedModelId, onModelChange]);
  
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = e.target.value;
    const selectedModel = models.find(model => model.id === modelId);
    
    if (selectedModel && !selectedModel.isAvailable) {
      // If model is not available for current subscription, show upgrade prompt
      showSubscriptionPrompt(selectedModel.requiredSubscription);
    } else {
      // If model is available, update selection
      onModelChange(modelId);
    }
  };
  
  // Mock data for development/preview
  const getMockModels = (): AIModel[] => {
    const subscription = authState.user?.subscriptionPlan || 'free';
    
    return [
      {
        id: 'openai-gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'OpenAI',
        description: 'Balanced model for general optimization tasks',
        tier: 'free',
        isAvailable: true,
        requiredSubscription: 'free'
      },
      {
        id: 'deepseek-coder',
        name: 'DeepSeek Coder',
        provider: 'DeepSeek',
        description: 'Specialized in structured content optimization',
        tier: 'free',
        isAvailable: true,
        requiredSubscription: 'free'
      },
      {
        id: 'openai-gpt-4',
        name: 'GPT-4',
        provider: 'OpenAI',
        description: 'Advanced optimization with better understanding of market context',
        tier: 'basic',
        isAvailable: subscription !== 'free',
        requiredSubscription: 'basic'
      },
      {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        description: 'Excellent for creative, nuanced listing optimization',
        tier: 'pro',
        isAvailable: ['pro', 'enterprise'].includes(subscription),
        requiredSubscription: 'pro'
      },
      {
        id: 'claude-3-7-sonnet',
        name: 'Claude 3.7 Sonnet',
        provider: 'Anthropic',
        description: 'Premium optimization with advanced market understanding and SEO',
        tier: 'enterprise',
        isAvailable: subscription === 'enterprise',
        requiredSubscription: 'enterprise'
      }
    ];
  };
  
  if (isLoading) {
    return <div className="text-gray-400">Loading AI models...</div>;
  }
  
  if (error) {
    return <div className="text-red-400">Error: {error}</div>;
  }
  
  return (
    <div className="mb-6">
      <label htmlFor="aiModel" className="block text-sm font-medium text-gray-300 mb-2">
        AI Model for Optimization
      </label>
      <div className="relative">
        <select
          id="aiModel"
          className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedModelId || defaultModelId}
          onChange={handleModelChange}
        >
          {models.map(model => (
            <option
              key={model.id}
              value={model.id}
              disabled={!model.isAvailable}
            >
              {model.name} - {model.provider}
              {!model.isAvailable ? ' (Requires upgrade)' : ''}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        {models.find(m => m.id === (selectedModelId || defaultModelId))?.description}
      </div>
      <div className="mt-4 text-xs text-gray-400">
        <div className="mb-1">Available AI models based on your subscription plan:</div>
        <ul className="list-disc pl-5 space-y-1">
          {models.map(model => (
            <li key={model.id} className={!model.isAvailable ? 'text-gray-500' : ''}>
              <span className="font-medium">{model.name}</span> 
              {!model.isAvailable ? 
                ` (Requires ${model.requiredSubscription} subscription)` : 
                ` - ${model.description}`
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
