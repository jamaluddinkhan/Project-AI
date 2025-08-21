// Default avatar options - 
import Icon1 from '../assets/Avatar icons/icon1.png';
import Icon2 from '../assets/Avatar icons/icon2.png';
import Icon3 from '../assets/Avatar icons/icon3.png';
import Icon4 from '../assets/Avatar icons/icon4.png';
import Icon5 from '../assets/Avatar icons/icon5.png';

const DEFAULT_AVATARS = [Icon1, Icon2, Icon3, Icon4, Icon5];


// Get consistent avatar based on user ID
const getConsistentAvatar = (user) => {
  if (user?.avatar && !user.avatar.startsWith('blob:')) {
    return user.avatar;
  }
  
  // If user has no avatar, assign one based on their ID for consistency
  if (user?.id) {
    const avatarIndex = user.id % DEFAULT_AVATARS.length;
    return DEFAULT_AVATARS[avatarIndex];
  }
  
  // Fallback to first avatar
  return DEFAULT_AVATARS[0];
};

// Check if avatar is default
const isDefaultAvatar = (avatarUrl) => {
  if (!avatarUrl) return true;
  return DEFAULT_AVATARS.some(avatar => avatarUrl.includes(avatar));
};

// Export all functions
export { DEFAULT_AVATARS, getConsistentAvatar, isDefaultAvatar };