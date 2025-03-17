export interface SubscriptionPlanDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  optimizationCount: number; // Number of optimizations allowed per month
  platformCount: number; // Number of platforms that can be optimized at once
  isPopular?: boolean;
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlanDetails> = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Basic optimization for individual sellers',
    price: 0,
    features: [
      '5 optimizations per month',
      'Single platform optimization',
      'Basic SEO recommendations',
      'Community support'
    ],
    optimizationCount: 5,
    platformCount: 1
  },
  basic: {
    id: 'basic',
    name: 'Basic',
    description: 'Enhanced optimization for growing sellers',
    price: 19,
    features: [
      '25 optimizations per month',
      'Up to 2 platforms per optimization',
      'Advanced SEO recommendations',
      'Email support'
    ],
    optimizationCount: 25,
    platformCount: 2
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'Complete solution for professional sellers',
    price: 49,
    features: [
      '100 optimizations per month',
      'All platforms supported',
      'Premium SEO optimization',
      'Priority support',
      'Analytics & performance tracking'
    ],
    optimizationCount: 100,
    platformCount: 5,
    isPopular: true
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solution for large businesses',
    price: 199,
    features: [
      'Unlimited optimizations',
      'All platforms supported',
      'Custom AI training',
      'Dedicated account manager',
      'API access',
      'Advanced analytics & reporting'
    ],
    optimizationCount: Infinity,
    platformCount: Infinity
  }
};
