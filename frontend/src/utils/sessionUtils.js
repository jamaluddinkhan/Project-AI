// Session management utilities

export const saveUserSession = (userData) => {
  const sessionData = {
    user: userData,
    timestamp: new Date().getTime()
  };
  localStorage.setItem('userSession', JSON.stringify(sessionData));
};

export const getUserSession = () => {
  const sessionStr = localStorage.getItem('userSession');
  if (!sessionStr) return null;
  
  const sessionData = JSON.parse(sessionStr);
  
  // Check if session is expired (24 hours)
  const now = new Date().getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  
  if (now - sessionData.timestamp > twentyFourHours) {
    localStorage.removeItem('userSession');
    return null;
  }
  
  return sessionData.user;
};

export const clearUserSession = () => {
  localStorage.removeItem('userSession');
};