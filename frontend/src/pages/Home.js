import React, { useState } from 'react';
import Header from '../components/Header/Header';
import UserProfile from '../components/UserProfile/UserProfile';
import VideoForm from '../components/VideoForm/VideoForm';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import './Home.css';

const Home = ({ user, onLogout }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateVideo = (text) => {
    // This is a mock implementation for frontend only
    // In a real app, this would call your backend API
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, we'll use a sample video that can be downloaded
      // Using a video from a domain that allows cross-origin requests
      setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="home-container">
      <Header user={user} onLogout={onLogout} />
      <main className="home-main">
        <UserProfile user={user} />
        
        <div className="video-section">
          <VideoForm onSubmit={handleGenerateVideo} isLoading={isLoading} />
          <VideoPlayer videoUrl={videoUrl} />
        </div>
      </main>
    </div>
  );
};

export default Home;