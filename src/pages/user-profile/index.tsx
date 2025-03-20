import React from 'react';
import { UserProfileWidget } from '../../widgets/user-profile';

const UserProfilePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Your Profile</h1>
      <UserProfileWidget />
    </div>
  );
};

export default UserProfilePage;
