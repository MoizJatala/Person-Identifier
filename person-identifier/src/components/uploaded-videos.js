import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import motion from Framer Motion library

const VideoList = () => {
  const [videosByUser, setVideosByUser] = useState({});
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
           if(res.data.user.role==='admin'){
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

    fetchVideos();
  }, [authToken,navigate]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/videos');
      if (response && response.data.videos) {
        const videos = response.data.videos;
        const videosGroupedByUser = {};

        // Group videos by user email
        videos.forEach(video => {
          const userEmail = video.split('-')[0];
          if (!videosGroupedByUser[userEmail]) {
            videosGroupedByUser[userEmail] = [];
          }
          videosGroupedByUser[userEmail].push(video);
        });

        setVideosByUser(videosGroupedByUser);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <>
      
      <div className="video-container" style={{ background: 'white' }}>
        {Object.entries(videosByUser).map(([email, videos]) => (
          <div key={email} className="user-video-container">
           <h5 
  class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-grey md:text-3xl lg:text-3xl" 
  style={{ padding: '5px' }} // Add padding of 10px
>
  <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">User Email: </span> 
  {email}
</h5>


            <div className="user-videos-row" style={{ display: 'flex', overflowX: 'auto' }}>
              {videos.map(video => (
                <motion.div 
                  key={video} 
                  className="video-item"
                  whileHover={{ scale: 1.05 }} // Add hover effect
                  whileTap={{ scale: 0.95 }}   // Add tap effect
                  style={{ marginRight: '10px', padding: '10px' }} // Add spacing between videos
                >
                  <video width="320" height="240" controls>
                    <source src={`http://localhost:3001/videos/${video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoList;
