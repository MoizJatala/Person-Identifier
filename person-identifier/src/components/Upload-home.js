// upload-home.js
import React, { useState, useEffect } from 'react';
import Upload from './Upload';
import Result from './result';

const Home = () => {
  const [showResult, setShowResult] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);

  const handleUploadStatus = (status, message) => {
    if (status === 'Upload successful') {
      setUploadMessage(message);
      setShowResult(true);
      // Reset the result after 10 seconds
      setTimeout(() => {
        setShowResult(false);
        setUploadMessage(null);
      }, 20000);
    } else {
      setShowResult(false);
      setUploadMessage(null);
    }
  };

  useEffect(() => {
    // Add an event listener for beforeunload
    const handleBeforeUnload = () => {
      setShowResult(false);
      setUploadMessage(null);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className='h-screen'>
      <div className="flex-1 flex flex-col overflow-hidden p-20">
        <div className="flex-1 overflow-auto p-4">
          {showResult ? (
            <div className="flex-1 overflow-auto p-4 flex">
              <div className="w-2/3 pr-2">
                <Upload onUploadStatus={handleUploadStatus} />
              </div>
              <div className="w-1/3 pl-2">{showResult && <Result message={uploadMessage} />}</div>
            </div>
          ) : (
            <div className="w-full">
              <Upload onUploadStatus={handleUploadStatus} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
