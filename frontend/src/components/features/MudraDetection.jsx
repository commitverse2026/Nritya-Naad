import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const MudraDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detectedMudra, setDetectedMudra] = useState("Initializing AI...");

  // Identification Logic
  const identifyMudra = (landmarks) => {
    const isIndexExtended = landmarks[8].y < landmarks[6].y;
    const isMiddleExtended = landmarks[12].y < landmarks[10].y;
    const isRingExtended = landmarks[16].y < landmarks[14].y;
    const isPinkyExtended = landmarks[20].y < landmarks[18].y;

    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended) {
      return "Pataka (Flag)";
    }
    if (isIndexExtended && isMiddleExtended && !isRingExtended && isPinkyExtended) {
      return "Tripataka (Three-part Flag)";
    }
    return "Scanning Mudra...";
  };

  useEffect(() => {
    // Accessing global variables from index.html scripts
    const Hands = window.Hands;
    const Camera = window.Camera;

    if (!Hands || !Camera) {
      console.error("MediaPipe libraries failed to load via CDN.");
      return;
    }

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      if (!canvasRef.current || !webcamRef.current?.video) return;

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
      canvasCtx.drawImage(results.image, 0, 0, videoWidth, videoHeight);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // Drawing Skeleton
        if (window.drawConnectors && window.drawLandmarks) {
          window.drawConnectors(canvasCtx, results.multiHandLandmarks[0], window.HAND_CONNECTIONS, {color: '#C2185B', lineWidth: 4});
          window.drawLandmarks(canvasCtx, results.multiHandLandmarks[0], {color: '#FF6B00', lineWidth: 2});
        }
        setDetectedMudra(identifyMudra(results.multiHandLandmarks[0]));
      } else {
        setDetectedMudra("No hand detected");
      }
      canvasCtx.restore();
    });

    const camera = new Camera(webcamRef.current.video, {
      onFrame: async () => {
        if (webcamRef.current?.video) {
          await hands.send({ image: webcamRef.current.video });
        }
      },
      width: 640,
      height: 480,
    });
    camera.start();

    return () => {
      camera.stop();
      hands.close();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        background: 'white',
        padding: '12px 24px',
        borderRadius: '50px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        border: '2px solid #C2185B',
        fontWeight: 'bold',
        color: '#C2185B'
      }}>
        ✨ {detectedMudra}
      </div>

      <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '8px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <Webcam 
            ref={webcamRef} 
            mirrored={true} 
            style={{ width: '640px', height: '480px', display: 'block' }} 
        />
        <canvas 
            ref={canvasRef} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'scaleX(-1)' }} 
        />
      </div>
    </div>
  );
};

export default MudraDetection;