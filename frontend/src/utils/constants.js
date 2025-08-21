// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  GENERATE_VIDEO: '/videos/generate',
  VIDEO_HISTORY: '/videos/history',
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/update',
  UPLOAD_AVATAR: '/user/upload-avatar'
};

// Video generation statuses
export const VIDEO_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

// User roles
export const USER_ROLES = {
  FREE: 'free',
  PRO: 'pro',
  ADMIN: 'admin'
};

// App constants
export const APP_CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  MAX_PROMPT_LENGTH: 500,
  DEFAULT_CREDITS: 5,
  VIDEO_QUALITIES: ['360p', '480p', '720p', '1080p', '4k']
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to access this feature.',
  FORBIDDEN: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_TAKEN: 'This email is already registered.',
  FILE_TOO_LARGE: 'File size must be less than 5MB.',
  INVALID_FILE_TYPE: 'Please select a valid image file (JPEG, PNG, GIF).'
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Account created successfully!',
  VIDEO_GENERATED: 'Video generated successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  AVATAR_UPDATED: 'Profile picture updated successfully!'
};