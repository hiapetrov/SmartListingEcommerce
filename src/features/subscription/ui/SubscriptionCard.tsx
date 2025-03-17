import React from 'react';
import { SubscriptionPlanDetails } from '../model/types';
import { Button } from '../../../shared/ui/button';

interface SubscriptionCardProps {
  plan: SubscriptionPlanDetails;
  currentPlan?: string;
  onSelect: (planId: string) => void;
  isLoading?: boolean;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  currentPlan,
  onSelect,
  isLoading = false
}) => {
  const isCurrentPlan = currentPlan === plan.id;
  
  return (
    <div className={`
      rounded-lg border ${plan.isPopular ? 'border-blue-500' : 'border-gray-700'} 
      bg-gray-800 overflow-hidden
      ${plan.isPopular ? 'ring-2 ring-blue-500' : ''}
    `}>
      {plan.isPopular && (
        <div className="bg-blue-600 text-white text-xs font-medium px-3 py-1 text-center">
          MOST POPULAR
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
        <p className="text-gray-400 mt-1">{plan.description}</p>
        
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-extrabold text-white">${plan.price}</span>
          <span className="ml-1 text-gray-400">/month</span>
        </div>
        
        <ul className="mt-6 space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="flex-shrink-0 h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8">
          <Button
            variant={isCurrentPlan ? 'secondary' : plan.isPopular ? 'primary' : 'outline'}
            fullWidth
            disabled={isLoading || isCurrentPlan}
            onClick={() => onSelect(plan.id)}
          >
            {isCurrentPlan ? 'Current Plan' : isLoading ? 'Processing...' : 'Select Plan'}
          </Button>
        </div>
      </div>
    </div>
  );
};
