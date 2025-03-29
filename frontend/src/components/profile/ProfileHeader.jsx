// src/components/profile/ProfileHeader.jsx
import React, { useState } from 'react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Input from '../common/Input';

import deafultPicture from '../../assets/pngtree-cute-animated-girl-png-image_11754140.png'

const ProfileHeader = ({  
  user = {}, // Provide a default empty object
  isCurrentUser = false, 
  onUpdate = () => {}  
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user.profilePicture || deafultPicture);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // const handleSaveImage = async () => {
  //   if (profileImage) {
  //     // In a real app, you'd upload the image to a server here
  //     await onUpdate({ profilePicture: previewUrl });
  //     setIsEditModalOpen(false);
  //   }
  // };

  
  // Destructure with defaults to prevent undefined errors
  const { 
    name = 'User', 
    profilePicture = deafultPicture 
  } = user;

  return (
    <div className="relative pb-20">
      {/* Cover image */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
      
      {/* Profile image */}
      <div className="absolute left-6 bottom-0 transform translate-y-1/2">
        <div className="relative">
          <img
          src = {profilePicture} 
          alt={name}
            //src={user.profilePicture || '/src/assets/images/default-avatar.png'}
           // alt={user.name}
            className="h-32 w-32 rounded-full border-4 border-white object-cover"
          />
          {isCurrentUser && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Edit button */}
      {isCurrentUser && (
        <div className="absolute right-6 bottom-0">
          <Button
            variant="outline"
            onClick={() => {/* Navigate to edit profile */}}
          >
            Edit Profile
          </Button>
        </div>
      )}
      
      {/* Profile Image Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update Profile Picture"
        footer={
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              //onClick={handleSaveImage}
              disabled={!profileImage}
            >
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={previewUrl}
              alt="Profile preview"
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose a new profile picture
            </label>
            <input
              type="file"
              accept="image/*"
             // onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileHeader;