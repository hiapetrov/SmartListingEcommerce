import React from 'react';
import { MyProductsWidget } from '../../widgets/my-products';

const MyProductsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">My Products</h1>
      <MyProductsWidget />
    </div>
  );
};

export default MyProductsPage;
