import React from 'react';
import { useAuth } from '../../../app/providers/AuthProvider';
import { SUBSCRIPTION_PLANS } from '../../../features/subscription';
import { Link } from 'react-router-dom';

export const UserPaymentInfo: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  
  if (!user) return null;
  
  const planDetails = SUBSCRIPTION_PLANS[user.subscriptionPlan];
  
  // Mock payment methods - in a real implementation, this would come from an API
  const paymentMethods = [
    {
      id: 'pm_1',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2026,
      isDefault: true
    }
  ];
  
  // Mock invoices - in a real implementation, this would come from an API
  const invoices = [
    {
      id: 'inv_1',
      date: '2025-03-01',
      amount: planDetails.price,
      status: 'paid'
    },
    {
      id: 'inv_2',
      date: '2025-02-01',
      amount: planDetails.price,
      status: 'paid'
    }
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Subscription</h3>
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-white font-medium">{planDetails.name} Plan</h4>
              <p className="text-gray-300 mt-1">{planDetails.description}</p>
              <div className="mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white"><span className="text-sm font-normal text-gray-400">/mo</span></p>
              <p className="text-sm text-gray-400 mt-1">Next renewal: April 1, 2025</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-600 flex justify-between">
            <Link to="/subscription" className="text-blue-400 hover:text-blue-300 text-sm">
              View plan details
            </Link>
            <Link to="/subscription" className="text-blue-400 hover:text-blue-300 text-sm">
              Change plan
            </Link>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Payment Methods</h3>
          <button className="text-sm text-blue-400 hover:text-blue-300">Add payment method</button>
        </div>
        
        {paymentMethods.map(method => (
          <div key={method.id} className="bg-gray-700 rounded-lg p-4 mb-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-800 rounded p-2 mr-3">
                <span className="text-white uppercase">{method.brand}</span>
              </div>
              <div>
                <p className="text-white">•••• {method.last4}</p>
                <p className="text-sm text-gray-400">Expires {method.expMonth}/{method.expYear}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {method.isDefault && (
                <span className="px-2 py-1 rounded-md bg-blue-900 text-blue-200 text-xs">Default</span>
              )}
              <button className="text-sm text-gray-400 hover:text-white">Edit</button>
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Billing History</h3>
        
        <div className="bg-gray-700 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {invoices.map(invoice => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-200 capitalize">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-400 hover:text-blue-300">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
