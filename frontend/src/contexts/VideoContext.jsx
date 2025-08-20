import React, { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider = ({ children }) => {
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const value = {
    generatedVideo,
    isGenerating,
    setGeneratedVideo,
    setIsGenerating
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};