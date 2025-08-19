import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <h2 className="user-profile-title">User Profile</h2>
      <div className="user-details">
        <p><span className="label">Name:</span> {user.name}</p>
        <p><span className="label">Email:</span> {user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;