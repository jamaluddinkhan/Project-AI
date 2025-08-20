import React from 'react';
import Header from '../components/common/Header';
import UserProfile from '../components/user/UserProfile';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;