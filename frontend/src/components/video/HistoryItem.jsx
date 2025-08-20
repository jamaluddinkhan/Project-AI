import React from 'react';

const HistoryItem = ({ video }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
      <div className="flex-shrink-0 w-20 h-16 bg-gray-200 rounded-md overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.prompt}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {video.prompt}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {formatDate(video.createdAt)}
        </p>
        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(video.status)} mt-1`}>
          {video.status}
        </div>
      </div>
      
      <button className="self-center flex-shrink-0 text-gray-400 hover:text-gray-600 transition">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>
    </div>
  );
};

export default HistoryItem;