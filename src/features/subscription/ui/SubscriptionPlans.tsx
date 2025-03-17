import React, { useState } from 'react';
import { SubscriptionCard } from './SubscriptionCard';
import { SUBSCRIPTION_PLANS } from '../model/types';
import { SubscriptionPlan } from '../../auth/model/types';
import { updateSubscriptionPlan } from '../../auth/model/service';
import { useAuth } from '../../../app/providers/AuthProvider';

export const SubscriptionPlans: React.FC = () => {
  const { authState } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSelectPlan = async (planId: string) => {
    if (!authState.user) return;
    
    setIsUpdating(true);
    setError(null);
    
    try {
      await updateSubscriptionPlan(authState.user.id, planId as SubscriptionPlan);
      // In a real app, we'd refresh the user data here
    } catch (err) {
      setError('Failed to update subscription plan. Please try again.');
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const currentPlan = authState.user?.subscriptionPlan || 'free';
  
  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-900 bg-opacity-50 border border-red-700 rounded-md p-3 text-red-200 mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.values(SUBSCRIPTION_PLANS).map(plan => (
          <SubscriptionCard
            key={plan.id}
            plan={plan}
            currentPlan={currentPlan}
            onSelect={handleSelectPlan}
            isLoading={isUpdating}
          />
        ))}
      </div>
    </div>
  );
};
