import React from 'react';
import { SubscriptionPlans } from '../../features/subscription';
import { SubscriptionDetails } from '../../widgets/subscription-details';

const SubscriptionPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Subscription</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <SubscriptionDetails />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-4">Available Plans</h2>
      <SubscriptionPlans />
    </div>
  );
};

export default SubscriptionPage;
