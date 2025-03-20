import React, { useState } from 'react';
import { AuthModal } from '../../../src/features/auth/ui/AuthModal';
import { Button } from '../../../src/shared/ui/button/Button';

export const GuestLandingPage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialAuthView, setInitialAuthView] = useState<'login' | 'signup'>('signup');

  const handleSignInClick = () => {
    setInitialAuthView('login');
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setInitialAuthView('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-900 to-gray-900 opacity-50"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left bg-gray-900 bg-opacity-80 lg:mr-0 lg:right-0"></div>
        
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                AI-Powered Listing Optimization
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl">
                Transform your product listings with AI-powered optimization tailored for multiple e-commerce platforms. 
                Create once, optimize for Shopify, Etsy, Amazon, and more with just a few clicks.
              </p>
              
              <div className="mt-10 flex items-center gap-x-6">
                <Button 
                  variant="primary"
                  size="lg"
                  onClick={handleSignUpClick}
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={handleSignInClick}
                >
                  Sign In
                </Button>
              </div>
            </div>
            
            <div className="mt-16 lg:mt-0 lg:col-span-5">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-2xl p-1">
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="px-4 py-2 bg-gray-900 flex items-center space-x-1">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <div className="ml-2 text-gray-400 text-sm">AI Listing Optimizer</div>
                  </div>
                  <div className="p-5 text-gray-300">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                      <div className="h-10 bg-gray-700 rounded mb-4"></div>
                      <div className="h-24 bg-gray-700 rounded mb-4"></div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="h-8 bg-gray-700 rounded"></div>
                        <div className="h-8 bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
                      <div className="h-10 bg-gray-700 rounded mb-4"></div>
                      <div className="h-12 bg-blue-600 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Supercharge Your E-commerce Listings
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              One platform to optimize your product listings across all major marketplaces
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              title="Multi-Platform Optimization" 
              description="Create your product once, then optimize for Shopify, Etsy, Amazon, and more with AI-powered suggestions tailored to each platform."
              icon={
                <svg className="h-8 w-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            
            <FeatureCard 
              title="SEO Enhancement" 
              description="Get AI-generated titles, descriptions, and keywords that help your products rank higher in search results."
              icon={
                <svg className="h-8 w-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            
            <FeatureCard 
              title="Analytics & Insights" 
              description="Track performance, see what's working, and make data-driven decisions with comprehensive analytics."
              icon={
                <svg className="h-8 w-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            
            <FeatureCard 
              title="Batch Processing" 
              description="Save time by optimizing multiple products at once. Perfect for large inventories and product launches."
              icon={
                <svg className="h-8 w-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              }
            />
            
            <FeatureCard 
              title="Platform Integration" 
              description="Seamlessly connect with your Shopify, Etsy, or Amazon accounts to publish optimized listings directly."
              icon={
                <svg className="h-8 w-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              }
            />
            
            <FeatureCard 
              title="Advanced AI Models" 
              description="Powered by the latest AI language models to create optimized, compelling product listings that convert."
              icon={
                <svg className="h-8 w-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-16 sm:py-24 bg-gray-800 bg-opacity-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trusted by E-commerce Sellers
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              See what our customers have to say about AI Listing Optimizer
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard 
              quote="My product listings have never performed better. I've seen a 32% increase in conversion rate since using AI Listing Optimizer."
              author="Sarah J."
              role="Etsy Seller"
            />
            
            <TestimonialCard 
              quote="Being able to optimize for multiple platforms at once has saved me hours each week. The AI suggestions are spot-on."
              author="Michael T."
              role="Amazon FBA Seller"
            />
            
            <TestimonialCard 
              quote="The SEO recommendations have helped my Shopify store rank much better in Google. My organic traffic has doubled."
              author="Lisa M."
              role="Shopify Store Owner"
            />
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to optimize your listings?
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Join thousands of sellers who are boosting their sales with AI-powered listing optimization.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button 
                variant="primary"
                size="lg"
                onClick={handleSignUpClick}
              >
                Get Started for Free
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={handleSignInClick}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={initialAuthView}
      />
    </div>
  );
};

// Helper components
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-colors">
      <div className="h-12 w-12 rounded-md bg-indigo-900 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
      <div className="h-10 w-10 mb-4 text-indigo-400">
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-gray-300 mb-6">{quote}</p>
      <div>
        <p className="text-white font-medium">{author}</p>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
    </div>
  );
};

export default GuestLandingPage;