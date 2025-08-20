import React, { useState } from 'react';

const PromptInput = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    
    onGenerate(prompt);
  };

  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
        Describe your video
      </label>
      
      <form onSubmit={handleSubmit}>
        <textarea
          id="prompt"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition"
          placeholder="Describe the video you want to generate (e.g., 'A serene beach at sunset with gentle waves crashing')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating}
        />
        
        <div className="flex justify-between items-center mt-3">
          <span className={`text-sm ${prompt.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
            {prompt.length}/500 characters
          </span>
          
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating || prompt.length > 500}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isGenerating ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </div>
            ) : (
              'Generate Video'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;