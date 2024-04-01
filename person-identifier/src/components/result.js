import React, { useState, useEffect } from 'react';

const Result = ({ message }) => {
  const [showParagraph, setShowParagraph] = useState(false);
  const [personName, setPersonName] = useState('');

  useEffect(() => {
    // Set a timeout to show the paragraph after 5 seconds (adjust as needed)
    const timeoutId = setTimeout(() => {
      setShowParagraph(true);
      // Extract the "Person Name: {class_}" part from the message using regex
      const regex = /Person Name: (.*?)(?="})/;
      const match = message.match(regex);
      if (match) {
        setPersonName(match[1]);
      }
    }, 2000);
    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, [message]); // Include message in the dependency array to update when message changes

  return (
    <div>
      {!showParagraph && (
        <div className="flex items-center justify-center f-screen">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}
      {showParagraph && (
        <div className="mx-auto w-full max-w-[550px]">
          <p className="mt-4 text-center text-black mt-2 font-bold">Person Name: {personName}</p>
        </div>
      )}
    </div>
  );
};

export default Result;
