import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CameraCapture.css';
import { redirect } from 'react-router-dom';
import axiosInstance from '../axios';

const CameraCapture = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);
  const [student_Id, setStudent_Id] = useState(2103199);

  useEffect(() => {
    // Set up the video stream
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => console.error('Error accessing the camera:', error));
    }
  }, []);

  const handleCapture = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame on canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data from canvas
    const imageData = canvas.toDataURL('image/png');

    // Update captured image state
    setCapturedImage(imageData);
    console.log(imageData);
      const res= await axiosInstance.post("Face_Recog/register_image", {
        student_Id,
        image: imageData,
      });
      console.log(res)
    };

  return (
    <div className="video-container">
    <video ref={videoRef} autoPlay playsInline />
    <canvas ref={canvasRef} style={{ display: "none" }} />
    <button onClick={handleCapture}>Capture Image</button>
  </div>
);
};
export default CameraCapture;
