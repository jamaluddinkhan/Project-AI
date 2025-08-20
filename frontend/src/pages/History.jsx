import React from 'react';
import Header from '../components/common/Header';
import HistoryItem from '../components/video/HistoryItem';

const History = () => {
  // Sample history data
  const historyItems = [
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
    },
    {
      id: 3,
      prompt: "A magical forest with glowing mushrooms",
      thumbnail: "/assets/images/previews/forest.jpg",
      createdAt: "2023-10-13T09:45:00Z",
      status: "processing",
      videoUrl: null
    },
    {
      id: 4,
      prompt: "Underwater coral reef with tropical fish",
      thumbnail: "/assets/images/previews/reef.jpg",
      createdAt: "2023-10-12T16:15:00Z",
      status: "failed",
      videoUrl: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Video History</h1>
          <p className="text-gray-600 mt-2">View all your generated videos</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {historyItems.length > 0 ? (
            <div className="grid gap-4">
              {historyItems.map(item => (
                <HistoryItem key={item.id} video={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg 
                className="w-16 h-16 text-gray-400 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
              <p className="text-gray-500">Your generated videos will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;