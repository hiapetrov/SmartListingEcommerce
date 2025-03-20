import React, { useState } from 'react';
import { UserSettings } from '../../../features/user-settings';
import { useAuth } from '../../../app/providers/AuthProvider';
import { UserActivity } from './UserActivity';
import { UserPaymentInfo } from './UserPaymentInfo';

type TabType = 'details' | 'activity' | 'billing';

export const UserProfileWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const { authState } = useAuth();
  const { user } = authState;

  if (!user) {
    return <div className="text-white">Please log in to view your profile.</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="border-b border-gray-700">
        <nav className="flex">
          <button
            className={px-6 py-4 text-sm font-medium }
            onClick={() => setActiveTab('details')}
          >
            Account Details
          </button>
          <button
            className={px-6 py-4 text-sm font-medium }
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
          <button
            className={px-6 py-4 text-sm font-medium }
            onClick={() => setActiveTab('billing')}
          >
            Billing & Payments
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'details' && <UserSettings />}
        {activeTab === 'activity' && <UserActivity />}
        {activeTab === 'billing' && <UserPaymentInfo />}
      </div>
    </div>
  );
};
