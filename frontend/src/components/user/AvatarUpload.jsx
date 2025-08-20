import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AvatarUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const { user, updateUser } = useAuth();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!previewUrl) return;

    setIsUploading(true);
    setError('');

    try {
      // Simulate API upload
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Update user context with new avatar
      updateUser({ 
        avatar: previewUrl,
        avatarUpdatedAt: new Date().toISOString()
      });

      // Reset preview
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (err) {
      setError('Failed to upload avatar. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      setIsUploading(true);
      
      // Simulate API call to remove avatar
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      updateUser({ 
        avatar: '/assets/images/avatars/default.jpg',
        avatarUpdatedAt: null
      });

    } catch (err) {
      setError('Failed to remove avatar. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const currentAvatar = previewUrl || user?.avatar || '/assets/images/avatars/default.jpg';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Picture</h3>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Avatar Preview */}
        <div className="relative">
          <img
            src={currentAvatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        {/* Upload Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />
            <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
              {previewUrl ? 'Change Photo' : 'Upload Photo'}
            </span>
          </label>

          {previewUrl && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Save Changes'}
            </button>
          )}

          {user?.avatar && user.avatar !== '/assets/images/avatars/default.jpg' && !previewUrl && (
            <button
              onClick={handleRemoveAvatar}
              disabled={isUploading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              Remove Photo
            </button>
          )}
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 text-center">
          JPG, PNG or GIF. Max size 5MB.
        </p>
      </div>
    </div>
  );
};

export default AvatarUpload;