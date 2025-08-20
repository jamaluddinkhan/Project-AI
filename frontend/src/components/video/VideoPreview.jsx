import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

const VideoPreview = ({ video, isGenerating }) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">Video Preview</h3>
      
      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        {video ? (
          <video 
            className="w-full h-full object-cover"
            controls
            src={video.videoUrl}
            poster={video.thumbnail}
          />
        ) : isGenerating ? (
          <div className="text-center p-6">
            <LoadingSpinner size="large" />
            <p className="text-gray-600 mt-4">Generating your video...</p>
            <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
          </div>
        ) : (
          <div className="text-center p-6">
            <svg 
              className="w-16 h-16 text-gray-400 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">Your video will appear here</p>
            <p className="text-sm text-gray-400 mt-1">Enter a prompt and generate to create a video</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;