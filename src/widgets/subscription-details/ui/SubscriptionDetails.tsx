import React from 'react';
import { useAuth } from '../../../app/providers/AuthProvider';
import { SUBSCRIPTION_PLANS } from '../../../features/subscription';

export const SubscriptionDetails: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  if (!user) {
    return <div className="text-white">Please log in to view your subscription details.</div>;
  }

  const plan = SUBSCRIPTION_PLANS[user.subscriptionPlan];
  
  // For demo purposes, let's set this to be 10 days in the future
  const today = new Date();
  const renewalDate = new Date(today);
  renewalDate.setDate(today.getDate() + 10);
  
  const formattedRenewalDate = renewalDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Current Subscription</h2>
      
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">{plan.name} Plan</h3>
          <p className="text-gray-300 mt-1 mb-4">{plan.description}</p>
          
          <div className="space-y-3">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:text-right mt-6 md:mt-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-200 mb-2">
            Active
          </div>
          
          <p className="text-2xl font-bold text-white"><span className="text-base font-normal text-gray-400">/month</span></p>
          
          <div className="mt-4 text-sm text-amber-400 font-medium">
            Renews on {formattedRenewalDate}
          </div>
          
          <div className="mt-6 space-x-4">
            <button className="px-4 py-2 bg-transparent border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:bg-opacity-10 transition-colors">
              Update Billing
            </button>
            
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:from-blue-600 hover:to-purple-700 transition-colors">
              Renew Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
