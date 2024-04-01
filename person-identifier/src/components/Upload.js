import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'; 

const Upload = ({ onUploadStatus }) => {
  const [videos, setVideos] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploadView, setIsUploadView] = useState(true);
  const authToken = Cookies.get('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === 'Success') {
           if(res.data.user.role==='user'){
            return;
           }
           else{
            navigate('/login')
           }
        } else {
          navigate('/login')
        }
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });

  }, [authToken,navigate]);

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const filesArray = Array.from(fileList);
    setVideos(filesArray);
  };

  const handleVideoClose = () => {
    setVideos([]);
    setIsUploadView(true);
  };

  const handleSubmit = (e) => {
    onUploadStatus(null);
    e.preventDefault();
    if (!videos.length) {
      setUploadStatus("No files selected");
      return;
    }

    setIsUploadView(false);

    const formData = new FormData();
    videos.forEach((file, index) => {
      formData.append(`videos`, file);
    });

    const authToken = Cookies.get('authToken');
    axios
      .post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`, 
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          setUploadStatus("Upload successful");
          onUploadStatus("Upload successful", res.data.message);
        } else {
          setUploadStatus("Files not uploaded");
          onUploadStatus(null);
        }
      })
      .catch((err) => {
        console.log(err);
        setUploadStatus("Error uploading files");
        setIsUploadView(true);
      });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="py-9 mx-auto w-full max-w-[550px] bg-white hover:shadow">
        <form className="py-4 px-9 " onSubmit={handleSubmit}>
          <div className="mb-8">
            <input
              type="file"
              id="file"
              className="sr-only"
              onChange={handleFileChange}
              multiple
            />
            <label
              htmlFor="file"
              className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
            >
              <div>
                <span className="mb-2 block text-xl font-semibold text-indigo-300">
                  Drop videos here
                </span>
                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                  Or
                </span>
                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-indigo-700">
                  Browse
                </span>
              </div>
            </label>
            {videos.length > 0 && (
              <div className="mt-2">
                {videos.map((file, index) => (
                  <p key={index}>{file.name}</p>
                ))}
              </div>
            )}
          </div>

          {videos.length > 0 && (
            <div>
              <button
                className="hover:shadow-form w-full rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                type="submit"
              >
                Send Files
              </button>
            </div>
          )}

          {!isUploadView && (
            <div className="mb-6 pt-4">
              <div className="mb-3 block text-l font-semibold text-red-700">
                {uploadStatus && <p>✔{uploadStatus}</p>}
              </div>
              <p>Uploading...</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Upload;
