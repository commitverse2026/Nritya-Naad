import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const MudraDetection = () => {
  const webcamRef = useRef(null);
  const [detected, setDetected] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [flash, setFlash] = useState(false);

  const mudraList = [
    { name: "Pataka", icon: "✋", desc: "The Flag - Represents victory or clouds." },
    { name: "Tripataka", icon: "🤟", desc: "Three parts of the flag - Represents a crown or tree." },
    { name: "Shikhara", icon: "👍", desc: "The Peak - Represents strength or a bow." }
  ];

  const handleDetection = () => {
    setIsAnalyzing(true);
    
    // Simulate Processing Delay
    setTimeout(() => {
      const result = mudraList[Math.floor(Math.random() * mudraList.length)];
      setDetected(result);
      setIsAnalyzing(false);
      
      // ✨ ADDON: Haptic Feedback (Vibration)
      if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]); // Short double pulse
      }

      // ✨ ADDON: Visual Flash
      setFlash(true);
      setTimeout(() => setFlash(false), 300);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', color: '#fff', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'Playfair Display', color: '#C2185B', marginBottom: '20px' }}>
        Mudra Recognition Workspace
      </h2>

      {/* Camera Feed Container */}
      <div style={{ 
        position: 'relative', 
        borderRadius: '25px', 
        overflow: 'hidden', 
        border: '5px solid #C2185B',
        boxShadow: '0 10px 40px rgba(194, 24, 91, 0.3)'
      }}>
        <Webcam audio={false} ref={webcamRef} width="100%" screenshotFormat="image/jpeg" />
        
        {/* Visual Feedback Flash Overlay */}
        {flash && (
          <div style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 10, opacity: 0.8 }} />
        )}

        {/* Loading Spinner Overlay */}
        {isAnalyzing && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '50px', height: '50px', border: '5px solid #C2185B', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        )}
      </div>

      {/* Detection Results */}
      <div style={{ minHeight: '120px', marginTop: '20px' }}>
        {detected && !isAnalyzing ? (
          <div style={{ padding: '20px', background: 'rgba(194, 24, 91, 0.1)', borderRadius: '15px', border: '1px solid #C2185B' }}>
            <span style={{ fontSize: '2rem' }}>{detected.icon}</span>
            <h3 style={{ margin: '5px 0', color: '#C2185B' }}>{detected.name}</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{detected.desc}</p>
          </div>
        ) : (
          <p style={{ opacity: 0.6 }}>Position your hand and click identify...</p>
        )}
      </div>

      <button 
        onClick={handleDetection}
        disabled={isAnalyzing}
        style={{
          background: '#C2185B', color: 'white', padding: '15px 40px',
          borderRadius: '50px', border: 'none', fontWeight: 'bold',
          cursor: 'pointer', fontSize: '1.1rem', transition: 'transform 0.2s'
        }}
        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
      >
        {isAnalyzing ? "Analyzing Gesture..." : "Identify Mudra"}
      </button>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default MudraDetection;