import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DEFAULT_AVATARS, isDefaultAvatar } from '../../utils/avatarUtils';

const AvatarUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const { user, updateUser } = useAuth();

  const currentAvatar = user?.avatar || DEFAULT_AVATARS[0];
  const isCurrentlyDefault = isDefaultAvatar(currentAvatar);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, GIF)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('File size must be less than 2MB');
      return;
    }

    setError('');
    
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      updateUser({ 
        avatar: previewUrl,
        avatarUpdatedAt: new Date().toISOString(),
        hasCustomAvatar: true
      });

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
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Reset to default avatar based on user ID for consistency
      const defaultAvatar = DEFAULT_AVATARS[user.id % DEFAULT_AVATARS.length];
      
      updateUser({ 
        avatar: defaultAvatar,
        avatarUpdatedAt: null,
        hasCustomAvatar: false
      });

    } catch (err) {
      setError('Failed to remove avatar. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const selectDefaultAvatar = (avatar) => {
    updateUser({ 
      avatar,
      hasCustomAvatar: false
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Picture</h3>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Avatar Preview */}
        <div className="relative">
          <img
            src={previewUrl || currentAvatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
            onError={(e) => {
              e.target.src = DEFAULT_AVATARS[0];
            }}
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
          
          {/* Default Avatar Badge */}
          {!previewUrl && isCurrentlyDefault && (
            <span className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Default
            </span>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm text-center max-w-xs">{error}</div>
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
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upload Photo
            </span>
          </label>

          {previewUrl && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isUploading ? 'Saving...' : 'Save Photo'}
            </button>
          )}

          {user?.hasCustomAvatar && !previewUrl && (
            <button
              onClick={handleRemoveAvatar}
              disabled={isUploading}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1极狐v3M4 7h16" />
              </svg>
              Remove Photo
            </button>
          )}
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 text-center">
          JPG, PNG or GIF. Max size 2MB.
        </p>
        
        {/* Default Avatars Selection */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Choose a default avatar:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {DEFAULT_AVATARS.map((avatar, index) => (
              <button
                key={index}
                onClick={() => selectDefaultAvatar(avatar)}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 p-1 ${
                  currentAvatar === avatar ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                } hover:border-blue-400 transition`}
              >
                <img 
                  src={avatar} 
                  alt={`Default Avatar ${index + 1}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = DEFAULT_AVATARS[0];
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;