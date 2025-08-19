import React, { useState } from 'react';
import './VideoForm.css';

const VideoForm = ({ onSubmit, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const MAX_CHARS = 500;

  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setInputText(text);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSubmit(inputText);
      setInputText('');
    }
  };

  const getCharCounterClass = () => {
    const ratio = inputText.length / MAX_CHARS;
    if (ratio > 0.9) return 'error';
    if (ratio > 0.75) return 'warning';
    return '';
  };

  return (
    <div className="video-form-container">
      <h2 className="video-form-title">Create AI Video</h2>
      <form onSubmit={handleSubmit} className="video-form">
        <div className="form-group">
          <label htmlFor="textInput">Enter text to generate video</label>
          <div style={{ position: 'relative' }}>
            <textarea
              id="textInput"
              value={inputText}
              onChange={handleChange}
              rows="4"
              placeholder="Describe what you want to see in the video..."
              required
              disabled={isLoading}
            />
            <div className={`character-counter ${getCharCounterClass()}`}>
              {inputText.length}/{MAX_CHARS}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className={isLoading ? "auth-btn loading" : "auth-btn"}
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              Generating Video...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              Generate Video
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default VideoForm;