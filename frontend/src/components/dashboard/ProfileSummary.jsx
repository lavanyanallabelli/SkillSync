// src/components/dashboard/ProfileSummary.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const ProfileSummary = ({ user }) => {
  return (
    <Card className="mb-6">
      <div className="flex items-center">
        <img
          src={user.profilePicture || '/src/assets/images/default-avatar.png'}
          alt={user.name}
          className="h-16 w-16 rounded-full mr-4 object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 mt-1">{user.bio || 'No bio added yet.'}</p>
          <Link to="/profile" className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block">
            Edit Profile
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSummary;