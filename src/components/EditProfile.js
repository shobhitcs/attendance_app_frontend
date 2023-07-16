import React, { useRef, useState } from 'react';

const CameraCapture = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = () => {
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
  };

  // Access front camera stream
  const getCameraStream = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
          const video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((error) => {
          console.log('Error accessing camera:', error);
        });
    }
  };

  // Start camera stream on component mount
  React.useEffect(() => {
    getCameraStream();
    return () => {
      // Stop camera stream on component unmount
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: '500px', height: 'auto' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={handleCapture}>Capture</button>
      {capturedImage && (
        <div>
          <h2>Captured Image:</h2>
          <img src={capturedImage} style={{width:'500px'}} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
