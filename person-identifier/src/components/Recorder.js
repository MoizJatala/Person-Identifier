import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const mimeType = "video/webm";
const VideoRecorder = ({onRecordStatus}) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const liveVideoFeed = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
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

  const getCameraPermission = async () => {
    setRecordedVideo(null);
    if ("MediaRecorder" in window) {
        try {
            const videoConstraints = {
                audio: false,
                video: true,
            };
            const audioConstraints = { audio: true };
            // create audio and video streams separately
            const audioStream = await navigator.mediaDevices.getUserMedia(
                audioConstraints
            );
            const videoStream = await navigator.mediaDevices.getUserMedia(
                videoConstraints
            );
            setPermission(true);
            //combine both audio and video streams
            const combinedStream = new MediaStream([
                ...videoStream.getVideoTracks(),
                ...audioStream.getAudioTracks(),
            ]);
            setStream(combinedStream);
            //set videostream to live feed player
            liveVideoFeed.current.srcObject = videoStream;
        } catch (err) {
            alert(err.message);
        }
    } else {
        alert("The MediaRecorder API is not supported in your browser.");
    }
};

const startRecording = async () => {
  setRecordingStatus("recording");
  const media = new MediaRecorder(stream, { mimeType });
  mediaRecorder.current = media;
  mediaRecorder.current.start();
  let localVideoChunks = [];
  mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localVideoChunks.push(event.data);
  };
  setVideoChunks(localVideoChunks);
};

const stopRecording = () => {
  setPermission(false);
  setRecordingStatus("inactive");
  mediaRecorder.current.stop();
  mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);
      setRecordedVideo(videoUrl);
      setVideoChunks([]);

      const formData = new FormData();
      formData.append("video", videoBlob);
      const authToken = Cookies.get('authToken');
      axios
      .post("http://localhost:3001/Recorded", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`, 
        },
        withCredentials:true,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          //setUploadStatus("Upload successful");
          onRecordStatus("Upload successful");
          // Clear the status after 5 seconds
        } else {
          //setUploadStatus("File not uploaded");
          onRecordStatus("not uploaded");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

    return (
      <div>
      <main>
          <div className="audio-controls">
              {!permission ? (
              <button onClick={getCameraPermission} type="button" className="w-full bg-indigo-700 hover:bg-red-300 text-white font-bold py-2 px-4 mb-6 rounded">
                  Get Camera
              </button>
              ) : null}
              {permission && recordingStatus === "inactive" ? (
              <button onClick={startRecording} type="button" className="w-full bg-indigo-700 hover:bg-red-500 text-white font-bold py-2 px-4 mb-6 rounded">
                  Start Recording
              </button>
              ) : null}
              {recordingStatus === "recording" ? (
              <button onClick={stopRecording} type="button" className="w-full bg-indigo-700 hover:bg-red-700 text-white font-bold py-2 px-4 mb-6 rounded">
                  Stop Recording
              </button>
              ) : null}
          </div>
          {recordedVideo ? (
          <div className="audio-player">
              <video src={recordedVideo} controls></video>
              <a download href={recordedVideo}>
                  Download Recording
              </a>
          </div>
          ) : null}
      </main>
  </div>
    );
};
export default VideoRecorder;