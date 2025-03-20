import React from 'react';

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  date: string;
}

export const UserActivity: React.FC = () => {
  // In a real implementation, this would be fetched from an API
  const activityItems: ActivityItem[] = [
    {
      id: '1',
      type: 'optimization',
      description: 'Optimized "Handcrafted Leather Wallet" for Etsy',
      date: '2025-03-19T14:32:00Z'
    },
    {
      id: '2',
      type: 'product',
      description: 'Created new product "Vintage Camera Strap"',
      date: '2025-03-17T09:15:00Z'
    },
    {
      id: '3',
      type: 'publish',
      description: 'Published "Ceramic Mug Set" to Shopify',
      date: '2025-03-15T16:45:00Z'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center">
            <span className="text-purple-200 text-xs">AI</span>
          </div>
        );
      case 'product':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center">
            <span className="text-blue-200 text-xs">P</span>
          </div>
        );
      case 'publish':
        return (
          <div className="h-8 w-8 rounded-full bg-green-900 flex items-center justify-center">
            <span className="text-green-200 text-xs">P</span>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-300 text-xs">•</span>
          </div>
        );
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activityItems.map((item) => (
          <div key={item.id} className="flex items-start">
            {getActivityIcon(item.type)}
            <div className="ml-4 flex-1">
              <p className="text-white">{item.description}</p>
              <p className="text-sm text-gray-400">{formatDate(item.date)}</p>
            </div>
          </div>
        ))}
      </div>
      
      {activityItems.length === 0 && (
        <p className="text-gray-400">No recent activity found.</p>
      )}
    </div>
  );
};
