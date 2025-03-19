import React from 'react';
import { Modal } from '../../../shared/ui/modal';
import { Button } from '../../../shared/ui/button';
import { SUBSCRIPTION_PLANS } from '../../subscription/model/types';

interface SubscriptionPromptProps {
  isOpen: boolean;
  onClose: () => void;
  requiredSubscription: string;
  onUpgrade: () => void;
}

export const SubscriptionPrompt: React.FC<SubscriptionPromptProps> = ({
  isOpen,
  onClose,
  requiredSubscription,
  onUpgrade
}) => {
  // Get the required plan details
  const planDetails = SUBSCRIPTION_PLANS[requiredSubscription];
  
  // Find the next available upgrade option if exact plan not found
  const getUpgradePlan = () => {
    if (planDetails) return planDetails;
    
    const subscriptionTiers = {
      'free': 0,
      'basic': 1,
      'pro': 2,
      'enterprise': 3
    };
    
    const requiredTier = subscriptionTiers[requiredSubscription as keyof typeof subscriptionTiers] || 1;
    
    // Find the next best plan
    if (requiredTier >= 3) return SUBSCRIPTION_PLANS.enterprise;
    if (requiredTier >= 2) return SUBSCRIPTION_PLANS.pro;
    return SUBSCRIPTION_PLANS.basic;
  };
  
  const upgradePlan = getUpgradePlan();
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upgrade Required"
      size="md"
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="bg-blue-500 bg-opacity-20 mx-auto rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-blue-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Unlock Premium AI Models
          </h3>
          <p className="text-gray-300">
            This AI model requires the {upgradePlan.name} plan or higher. Upgrade your subscription to access premium AI capabilities.
          </p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-white mb-2">{upgradePlan.name} Plan includes:</h4>
          <ul className="space-y-2">
            {upgradePlan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="flex-shrink-0 h-5 w-5 text-green-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 pt-4 border-t border-gray-600">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-white">${upgradePlan.price}</span>
              <span className="ml-1 text-gray-400">/month</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 pt-2">
          <Button
            variant="primary"
            fullWidth
            onClick={onUpgrade}
          >
            Upgrade Now
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={onClose}
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </Modal>
  );
};
