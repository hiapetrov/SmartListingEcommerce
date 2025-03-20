import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { Card } from '../../shared/ui/card';
import { Button } from '../../shared/ui/button';
import { Badge } from '../../shared/ui/badge';

const DashboardPage: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  
  // Mock data for dashboard - in a real app, these would come from API calls
  const [recentProducts] = useState([
    {
      id: 'p1',
      title: 'Handcrafted Leather Wallet',
      optimizedPlatforms: ['shopify', 'etsy'],
      date: '2 days ago',
      status: 'published'
    },
    {
      id: 'p2',
      title: 'Ceramic Coffee Mug Set',
      optimizedPlatforms: ['amazon', 'shopify'],
      date: '1 week ago',
      status: 'draft'
    },
    {
      id: 'p3',
      title: 'Vintage Camera Strap',
      optimizedPlatforms: ['etsy'],
      date: '2 weeks ago',
      status: 'published'
    }
  ]);

  const [performanceData] = useState({
    totalProducts: 12,
    totalOptimizations: 27,
    publishedListings: 18,
    viewsThisMonth: 1243,
    salesThisMonth: 32,
    conversionRate: 2.58,
    addToCartRate: 8.7
  });

  const [platformIntegrations] = useState([
    { id: 'shopify', name: 'Shopify', status: 'connected', productsCount: 7 },
    { id: 'etsy', name: 'Etsy', status: 'connected', productsCount: 5 },
    { id: 'amazon', name: 'Amazon', status: 'disconnected', productsCount: 0 },
    { id: 'printify', name: 'Printify', status: 'connected', productsCount: 3 }
  ]);

  // Create safe versions of potentially undefined properties
  const userFirstName = user?.firstName || 'User';
  const subscriptionPlanName = user?.subscriptionPlan 
    ? `${user.subscriptionPlan.charAt(0).toUpperCase()}${user.subscriptionPlan.slice(1)}` 
    : 'Free';

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-800 to-blue-700 rounded-xl p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, {userFirstName}!
            </h1>
            <p className="text-indigo-100">
              Here's what's happening with your products and optimizations
            </p>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="primary"
              onClick={() => {}}
            >
              New Product
            </Button>
            <Button 
              variant="outline"
              onClick={() => {}}
            >
              Import Products
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={performanceData.totalProducts}
          trend="+3 this month"
          trendDirection="up"
        />
        <StatCard
          title="Optimizations"
          value={performanceData.totalOptimizations}
          trend="+8 this month"
          trendDirection="up"
        />
        <StatCard
          title="Published Listings"
          value={performanceData.publishedListings}
          trend="+5 this month"
          trendDirection="up"
        />
        <StatCard
          title="Views This Month"
          value={performanceData.viewsThisMonth}
          trend="+17% vs last month"
          trendDirection="up"
        />
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Products */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Recent Products</h2>
              <Link to="/my-products" className="text-blue-400 hover:text-blue-300 text-sm">
                View All Products
              </Link>
            </div>
            <div className="divide-y divide-gray-700">
              {recentProducts.map(product => (
                <div key={product.id} className="p-4 hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center text-white font-medium">
                        {product.title.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{product.title}</h3>
                        <p className="text-gray-400 text-sm">Updated {product.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        {product.optimizedPlatforms.map(platform => (
                          <PlatformIcon key={platform} platform={platform} size="sm" />
                        ))}
                      </div>
                      <Badge
                        variant={product.status === 'published' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {product.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {}}
                      >
                        Optimize
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-700 bg-gray-800 text-center">
              <Button
                variant="outline"
                onClick={() => {}}
              >
                Create New Product
              </Button>
            </div>
          </Card>

          {/* Sales & Performance Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Conversion Metrics</h2>
              <div className="space-y-4">
                <MetricBar 
                  label="Conversion Rate" 
                  value={performanceData.conversionRate} 
                  suffix="%" 
                  max={5}
                  color="bg-green-500"
                />
                <MetricBar 
                  label="Add to Cart Rate" 
                  value={performanceData.addToCartRate} 
                  suffix="%" 
                  max={15}
                  color="bg-blue-500"
                />
              </div>
              <div className="mt-4 text-center">
                <Link to="/analytics" className="text-sm text-blue-400 hover:text-blue-300">
                  View Detailed Analytics
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Monthly Sales</h2>
              <div className="flex items-end justify-between h-40 mb-4 px-2">
                {[28, 42, 30, 25, 55, 32].map((height, i) => (
                  <div key={i} className="w-8 flex flex-col items-center">
                    <div 
                      className="w-full bg-indigo-600 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs text-gray-400 mt-1">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-400">
                  Total Sales: <span className="text-white font-medium">${performanceData.salesThisMonth * 32}</span>
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column - Platforms & Integrations */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Platform Integrations</h2>
            <div className="space-y-4">
              {platformIntegrations.map(platform => (
                <div key={platform.id} className="flex items-center justify-between p-3 bg-gray-700 bg-opacity-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <PlatformIcon platform={platform.id} size="md" />
                    <div>
                      <h3 className="text-white font-medium">{platform.name}</h3>
                      <p className="text-sm text-gray-400">
                        {platform.status === 'connected' 
                          ? `${platform.productsCount} products` 
                          : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <div>
                    {platform.status === 'connected' ? (
                      <Badge variant="success" size="sm">Connected</Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {}}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button
                variant="primary"
                fullWidth
                onClick={() => {}}
              >
                Manage Integrations
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <ActionButton
                label="Optimize New Product"
                description="Create and optimize a new product listing"
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
                to="/optimize"
              />
              <ActionButton
                label="Batch Optimize"
                description="Optimize multiple products at once"
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                }
                to="/batch-optimize"
              />
              <ActionButton
                label="Import Products"
                description="Import products from file or platform"
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                }
                to="/import"
              />
              <ActionButton
                label="Publish to Platforms"
                description="Publish optimized listings to platforms"
                icon={
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                }
                to="/publish"
              />
            </div>
          </Card>

          {/* Subscription - FIXED PROBLEM AREA */}
          <Card className="bg-gradient-to-br from-indigo-900 to-blue-800 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-semibold">
                  {subscriptionPlanName} Plan
                </h3>
                <p className="text-indigo-200 text-sm mt-1">
                  {performanceData.totalOptimizations} of 100 optimizations used
                </p>
              </div>
              <Badge variant="info" size="sm">Active</Badge>
            </div>
            <div className="mt-3 h-2 bg-indigo-200 bg-opacity-30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-200 rounded-full" 
                style={{ width: `${(performanceData.totalOptimizations / 100) * 100}%` }}
              ></div>
            </div>
            <div className="mt-6">
              <Button
                variant="outline"
                fullWidth
                onClick={() => {}}
              >
                Upgrade Plan
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper Components
interface StatCardProps {
  title: string;
  value: number;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, trendDirection }) => {
  const trendColor = 
    trendDirection === 'up' ? 'text-green-400' : 
    trendDirection === 'down' ? 'text-red-400' : 
    'text-gray-400';

  const trendIcon = 
    trendDirection === 'up' ? (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ) : trendDirection === 'down' ? (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ) : null;

  return (
    <Card className="p-6">
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <div className="flex items-baseline justify-between mt-2">
        <p className="text-2xl font-semibold text-white">{value}</p>
        <div className={`flex items-center ${trendColor}`}>
          {trendIcon}
          <span className="text-xs ml-1">{trend}</span>
        </div>
      </div>
    </Card>
  );
};

interface PlatformIconProps {
  platform: string;
  size?: 'sm' | 'md' | 'lg';
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, size = 'md' }) => {
  const sizeClass = 
    size === 'sm' ? 'h-6 w-6' : 
    size === 'md' ? 'h-10 w-10' : 
    'h-12 w-12';
    
  const platformColors: Record<string, string> = {
    shopify: 'bg-green-600',
    etsy: 'bg-orange-600',
    amazon: 'bg-yellow-600',
    printify: 'bg-purple-600'
  };
  
  const bgColor = platformColors[platform] || 'bg-gray-600';
  
  return (
    <div className={`${sizeClass} ${bgColor} rounded-full flex items-center justify-center text-white`}>
      {platform.charAt(0).toUpperCase()}
    </div>
  );
};

interface MetricBarProps {
  label: string;
  value: number;
  suffix?: string;
  max: number;
  color: string;
}

const MetricBar: React.FC<MetricBarProps> = ({ label, value, suffix = '', max, color }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-white font-medium">{value}{suffix}</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

interface ActionButtonProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, description, icon, to }) => {
  return (
    <Link 
      to={to}
      className="flex items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-colors"
    >
      <div className="h-8 w-8 rounded-md bg-indigo-700 flex items-center justify-center text-white mr-3">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-medium">{label}</h3>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </Link>
  );
};

export default DashboardPage;