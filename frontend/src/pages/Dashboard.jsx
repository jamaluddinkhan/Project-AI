import React, { useState } from 'react';
import Header from '../components/common/Header';
import PromptInput from '../components/video/PromptInput';
import VideoPreview from '../components/video/VideoPreview';
import VideoControls from '../components/video/VideoControls';
import HistoryItem from '../components/video/HistoryItem';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptHistory, setPromptHistory] = useState([]);

  // Sample data for demonstration
  const sampleVideos = [
    {
      id: 1,
      prompt: "A serene beach at sunset with gentle waves",
      thumbnail: "/assets/images/previews/beach.jpg",
      createdAt: "2023-10-15T14:30:00Z",
      status: "completed",
      videoUrl: "/assets/videos/sample1.mp4"
    },
    {
      id: 2,
      prompt: "A bustling city street in Tokyo at night",
      thumbnail: "/assets/images/previews/tokyo.jpg",
      createdAt: "2023-10-14T11:20:00Z",
      status: "completed",
      videoUrl: "/assets/videos/sample2.mp4"
    }
  ];

  const handleGenerateVideo = async (prompt) => {
    setIsGenerating(true);
    
    // Simulate API call
    try {
      // This would be your actual API call
      // const response = await generateVideoApi(prompt);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock response
      const mockVideo = {
        id: Date.now(),
        prompt,
        thumbnail: "/assets/images/previews/generated.jpg",
        createdAt: new Date().toISOString(),
        status: "completed",
        videoUrl: "/assets/videos/generated.mp4"
      };
      
      setGeneratedVideo(mockVideo);
      setPromptHistory(prev => [mockVideo, ...prev]);
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (generatedVideo) {
      handleGenerateVideo(generatedVideo.prompt);
    }
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log("Downloading video:", generatedVideo);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Sharing video:", generatedVideo);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Video Creation */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Video</h2>
              
              <PromptInput 
                onGenerate={handleGenerateVideo} 
                isGenerating={isGenerating}
              />
              
              <div className="mt-6">
                <VideoPreview 
                  video={generatedVideo} 
                  isGenerating={isGenerating}
                />
              </div>
              
              {generatedVideo && (
                <div className="mt-6">
                  <VideoControls 
                    onRegenerate={handleRegenerate}
                    onDownload={handleDownload}
                    onShare={handleShare}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Videos</h2>
              
              <div className="space-y-4">
                {promptHistory.length > 0 ? (
                  promptHistory.map(video => (
                    <HistoryItem key={video.id} video={video} />
                  ))
                ) : (
                  sampleVideos.map(video => (
                    <HistoryItem key={video.id} video={video} />
                  ))
                )}
                
                {promptHistory.length === 0 && sampleVideos.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No videos created yet. Generate your first video!
                  </p>
                )}
              </div>
              
              {(promptHistory.length > 0 || sampleVideos.length > 0) && (
                <button className="w-full mt-6 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
                  View All History
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;