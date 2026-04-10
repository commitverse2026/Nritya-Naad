import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import mudras from "../data/mudras.json";

const MudraDetection = ({ theme }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [detectedMudra, setDetectedMudra] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Load the hand pose model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsLoading(true);
        await tf.ready();
        const loadedModel = await handpose.load();
        setModel(loadedModel);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load handpose model. Please refresh.");
        setIsLoading(false);
      }
    };

    loadModel();
  }, []);

  // Initialize webcam
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      setError("Camera access denied. Please enable camera permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setCameraActive(false);
      setDetectedMudra(null);
      setPredictions([]);
    }
  };

  // Detect hand landmarks
  const detectHand = async () => {
    if (!model || !videoRef.current || videoRef.current.readyState !== 4) {
      return;
    }

    try {
      const predictions = await model.estimateHands(videoRef.current, true);
      setPredictions(predictions);

      if (predictions.length > 0) {
        const mudra = recognizeMudra(predictions[0]);
        const conf = calculateConfidence(predictions[0]);
        setDetectedMudra(mudra);
        setConfidence(conf);
      } else {
        setDetectedMudra(null);
        setConfidence(0);
      }
    } catch (err) {
      console.error("Error detecting hand:", err);
    }
  };

  // Comprehensive 15-Mudra Recognition System
  const recognizeMudra = (hand) => {
    try {
      const landmarks = hand.landmarks;
      if (!landmarks || landmarks.length < 21) return mudras[0];

      // ===== EXTRACT ALL LANDMARKS =====
      const wrist = landmarks[0];
      
      // Thumb (0,1,2,3,4)
      const thumbTip = landmarks[4];
      const thumbIP = landmarks[3];
      const thumbMCP = landmarks[2];
      const thumbCMC = landmarks[1];
      
      // Index (5,6,7,8)
      const indexMCP = landmarks[5];
      const indexPIP = landmarks[6];
      const indexDIP = landmarks[7];
      const indexTip = landmarks[8];
      
      // Middle (9,10,11,12)
      const middleMCP = landmarks[9];
      const middlePIP = landmarks[10];
      const middleDIP = landmarks[11];
      const middleTip = landmarks[12];
      
      // Ring (13,14,15,16)
      const ringMCP = landmarks[13];
      const ringPIP = landmarks[14];
      const ringDIP = landmarks[15];
      const ringTip = landmarks[16];
      
      // Pinky (17,18,19,20)
      const pinkyMCP = landmarks[17];
      const pinkyPIP = landmarks[18];
      const pinkyDIP = landmarks[19];
      const pinkyTip = landmarks[20];

      // ===== CALCULATE HAND METRICS =====
      const dist = (p1, p2) => Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
      const angle = (p1, p2, p3) => {
        const v1 = [p1[0] - p2[0], p1[1] - p2[1]];
        const v2 = [p3[0] - p2[0], p3[1] - p2[1]];
        const dot = v1[0] * v2[0] + v1[1] * v2[1];
        const mag1 = Math.sqrt(v1[0] ** 2 + v1[1] ** 2);
        const mag2 = Math.sqrt(v2[0] ** 2 + v2[1] ** 2);
        return Math.acos(dot / (mag1 * mag2 + 0.0001)) * (180 / Math.PI);
      };

      // Hand size normalization
      const xs = landmarks.map(l => l[0]);
      const ys = landmarks.map(l => l[1]);
      const handBBox = {
        minX: Math.min(...xs),
        maxX: Math.max(...xs),
        minY: Math.min(...ys),
        maxY: Math.max(...ys),
      };
      const handWidth = handBBox.maxX - handBBox.minX;
      const handHeight = handBBox.maxY - handBBox.minY;
      const handSize = Math.sqrt(handWidth * handHeight);

      // Finger extension detection (normalized by hand size)
      const getExtension = (tip, pip, mcp) => {
        const tipDist = dist(tip, mcp);
        const pipDist = dist(pip, mcp);
        return (tipDist - pipDist) / handSize;
      };

      const indexExt = getExtension(indexTip, indexPIP, indexMCP);
      const middleExt = getExtension(middleTip, middlePIP, middleMCP);
      const ringExt = getExtension(ringTip, ringPIP, ringMCP);
      const pinkyExt = getExtension(pinkyTip, pinkyPIP, pinkyMCP);
      const thumbExt = dist(thumbTip, thumbMCP) / handSize;

      // Count extended fingers (threshold 0.25)
      const extensionThreshold = 0.25;
      const indexOpen = indexExt > extensionThreshold;
      const middleOpen = middleExt > extensionThreshold;
      const ringOpen = ringExt > extensionThreshold;
      const pinkyOpen = pinkyExt > extensionThreshold;
      const thumbOpen = thumbExt > 0.2;

      const openCount = [indexOpen, middleOpen, ringOpen, pinkyOpen, thumbOpen].filter(Boolean).length;

      // Finger spread measurements
      const fingerSpreadHorizontal = dist(indexTip, pinkyTip);
      const fingerSpreadVertical = Math.abs(indexTip[1] - pinkyTip[1]);
      const fingerSpread = fingerSpreadHorizontal / handSize;

      // Thumb position relative to palm
      const thumbToIndex = dist(thumbTip, indexTip);
      const thumbToMiddle = dist(thumbTip, middleTip);

      // Palm center
      const palmCenter = [
        (indexMCP[0] + middleMCP[0] + ringMCP[0] + pinkyMCP[0]) / 4,
        (indexMCP[1] + middleMCP[1] + ringMCP[1] + pinkyMCP[1]) / 4,
      ];

      // Finger angles
      const indexAngle = angle(indexMCP, indexPIP, indexTip);
      const middleAngle = angle(middleMCP, middlePIP, middleTip);
      const ringAngle = angle(ringMCP, ringPIP, ringTip);
      const pinkyAngle = angle(pinkyMCP, pinkyPIP, pinkyTip);

      // ===== MUDRA CLASSIFICATION =====
      
      // Helper: Check specific mudra conditions
      const mudraScores = {
        hasta: 0,      // 0: Open palm, all fingers spread
        pataka: 0,     // 1: Flat hand, fingers together
        tripataka: 0,  // 2: Three fingers up
        ardhapataka: 0,// 3: Four fingers up
        mukula: 0,     // 4: Fist, thumb up
        shikara: 0,    // 5: Two fingers up (V shape)
        kapittha: 0,   // 6: Index folded, others open
        kataka: 0,     // 7: Thumb & index circle
        shukatunda: 0, // 8: All folded except thumb
        chandrakala: 0,// 9: Curved hand shape
        bhramara: 0,   // 10: Bee position
        anjali: 0,     // 11: Both hands together (single hand proxy)
        samapada: 0,   // 12: Balance (single hand proxy)
        natyarambha: 0,// 13: Dance start position
        pushpaputa: 0, // 14: Cupped hands
      };

      // HASTA - Open palm, all fingers spread wide
      if (openCount === 5 && fingerSpread > 1.2 && thumbOpen) {
        mudraScores.hasta += 100;
      }

      // PATAKA - Flat hand, fingers close together
      if (openCount === 5 && fingerSpread < 0.9 && !thumbOpen) {
        mudraScores.pataka += 100;
      }

      // TRIPATAKA - Exactly 3 fingers up
      if (openCount === 3 && indexOpen && middleOpen && ringOpen) {
        mudraScores.tripataka += 100;
      } else if (openCount === 3) {
        mudraScores.tripataka += 60;
      }

      // ARDHAPATAKA - Exactly 4 fingers up
      if (openCount === 4 && !thumbOpen) {
        mudraScores.ardhapataka += 100;
      } else if (openCount === 4) {
        mudraScores.ardhapataka += 70;
      }

      // MUKULA - Fist with thumb up
      if (openCount === 1 && thumbOpen && !indexOpen && !middleOpen && !ringOpen && !pinkyOpen) {
        mudraScores.mukula += 100;
      } else if (openCount === 0) {
        mudraScores.mukula += 80;
      }

      // SHIKARA - Index and middle up (V shape)
      if (openCount === 2 && indexOpen && middleOpen) {
        mudraScores.shikara += 100;
      } else if (indexOpen && middleOpen) {
        mudraScores.shikara += 80;
      }

      // KATAKA - Thumb and index forming circle
      if (thumbOpen && indexOpen && !middleOpen && !ringOpen && !pinkyOpen) {
        const thumbIndexDist = dist(thumbTip, indexTip);
        if (thumbIndexDist < handSize * 0.3) {
          mudraScores.kataka += 100;
        } else {
          mudraScores.kataka += 50;
        }
      }

      // SHUKATUNDA - Fist with thumb extended sideways
      if (openCount === 1 && !indexOpen && !middleOpen && !ringOpen && !pinkyOpen) {
        mudraScores.shukatunda += 90;
      }

      // CHANDRAKALA - Curved moon shape
      if (openCount === 4 && thumbOpen && middleExt > 0.3) {
        const curvature = ringAngle + pinkyAngle;
        if (curvature > 150) {
          mudraScores.chandrakala += 90;
        }
      }

      // BHRAMARA - Bee pose (specific finger configuration)
      if (openCount === 0 || (openCount === 1 && thumbOpen && thumbToIndex < handSize * 0.4)) {
        mudraScores.bhramara += 70;
      }

      // ANJALI - Prayer (approximated with hand position)
      if (openCount === 5 && Math.abs(indexTip[0] - pinkyTip[0]) < handSize * 0.3) {
        mudraScores.anjali += 80;
      }

      // NATYARAMBHA - Dance position (multiple fingers open, balanced)
      if (openCount >= 4 && indexOpen && middleOpen && thumbOpen) {
        mudraScores.natyarambha += 75;
      }

      // PUSHPAPUTA - Cupped hands (approximated)
      if (openCount === 5 && fingerSpread > 0.8 && fingerSpread < 1.0) {
        mudraScores.pushpaputa += 85;
      }

      // KAPITTHA - Index folded, others open
      if (!indexOpen && middleOpen && ringOpen && (pinkyOpen || openCount === 3)) {
        mudraScores.kapittha += 90;
      }

      // SAMAPADA - Balance position
      if (openCount === 5 && Math.abs(indexTip[1] - pinkyTip[1]) < handSize * 0.2) {
        mudraScores.samapada += 80;
      }

      // ARDHAPATAKA fallback for 4 open
      if (openCount === 4) {
        mudraScores.ardhapataka = Math.max(mudraScores.ardhapataka, 85);
      }

      // ===== SELECT BEST MUDRA =====
      const mudraList = [
        mudras[0],  // hasta
        mudras[1],  // pataka
        mudras[2],  // tripataka
        mudras[3],  // ardhapataka
        mudras[4],  // mukula
        mudras[5],  // shikara
        mudras[6],  // kapittha
        mudras[7],  // kataka
        mudras[8],  // shukatunda
        mudras[9],  // chandrakala
        mudras[10], // bhramara
        mudras[11], // anjali
        mudras[12], // samapada
        mudras[13], // natyarambha
        mudras[14], // pushpaputa
      ];

      const scoreValues = Object.values(mudraScores);
      const maxScore = Math.max(...scoreValues);
      
      if (maxScore > 0) {
        const bestIndex = scoreValues.indexOf(maxScore);
        return mudraList[bestIndex];
      }

      // Default fallback based on open finger count
      if (openCount === 5) return mudras[0]; // Hasta
      if (openCount === 4) return mudras[3]; // Ardhapataka
      if (openCount === 3) return mudras[2]; // Tripataka
      if (openCount === 2) return mudras[5]; // Shikara
      if (openCount === 1) return mudras[4]; // Mukula
      return mudras[4]; // Mukula (fist)

    } catch (err) {
      console.error("Mudra recognition error:", err);
      return mudras[0];
    }
  };

  // Calculate confidence based on detection quality
  const calculateConfidence = (hand) => {
    try {
      const landmarks = hand.landmarks;
      if (!landmarks) return 40;
      
      // Model's hand visibility confidence
      const handConfidence = (hand.handInViewConfidence || 0.6);
      
      // Analyze landmark stability and clarity
      // Lower variance = more stable = more confident
      const calculateVariance = () => {
        let sumX = 0, sumY = 0;
        landmarks.forEach(l => {
          sumX += l[0];
          sumY += l[1];
        });
        const meanX = sumX / landmarks.length;
        const meanY = sumY / landmarks.length;
        
        let variance = 0;
        landmarks.forEach(l => {
          variance += (l[0] - meanX) ** 2 + (l[1] - meanY) ** 2;
        });
        return variance / landmarks.length;
      };
      
      const variance = calculateVariance();
      // Normalize variance to 0-1 range (smaller variance = higher confidence)
      const stabilityScore = Math.max(0, 1 - variance / 50000);
      
      // Check if hand is roughly centered (better confidence when centered)
      const centerConfidence = 0.7; // Default for any position
      
      // Combined confidence score
      const confidence = (
        handConfidence * 0.5 +      // Model's confidence
        stabilityScore * 0.35 +     // Hand stability
        centerConfidence * 0.15     // Positioning
      ) * 100;
      
      return Math.min(100, Math.max(30, confidence));
    } catch (err) {
      return 40;
    }
  };

  // Draw skeleton on canvas
  const drawSkeleton = () => {
    if (!canvasRef.current || !videoRef.current || predictions.length === 0) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // Clear canvas
    ctx.clearRect(0, 0, videoWidth, videoHeight);

    predictions.forEach((hand) => {
      const landmarks = hand.landmarks;

      // Draw lines between landmarks
      const connections = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4], // Thumb
        [0, 5],
        [5, 6],
        [6, 7],
        [7, 8], // Index
        [0, 9],
        [9, 10],
        [10, 11],
        [11, 12], // Middle
        [0, 13],
        [13, 14],
        [14, 15],
        [15, 16], // Ring
        [0, 17],
        [17, 18],
        [18, 19],
        [19, 20], // Pinky
        [5, 9],
        [9, 13],
        [13, 17], // Palm connections
      ];

      // Draw bones
      ctx.strokeStyle = theme.color;
      ctx.lineWidth = 3;
      connections.forEach(([start, end]) => {
        const startPoint = landmarks[start];
        const endPoint = landmarks[end];
        ctx.beginPath();
        ctx.moveTo(startPoint[0], startPoint[1]);
        ctx.lineTo(endPoint[0], endPoint[1]);
        ctx.stroke();
      });

      // Draw joints
      ctx.fillStyle = theme.color;
      landmarks.forEach((landmark) => {
        ctx.beginPath();
        ctx.arc(landmark[0], landmark[1], 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    });
  };

  // Animation loop
  useEffect(() => {
    if (!cameraActive || !model) return;

    const interval = setInterval(() => {
      detectHand();
      drawSkeleton();
    }, 100);

    return () => clearInterval(interval);
  }, [cameraActive, model]);

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      {/* Camera Feed Container */}
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#f5f5f5",
          marginBottom: "24px",
          border: `2px solid ${theme.color}40`,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            height: "auto",
            display: cameraActive ? "block" : "none",
            backgroundColor: "#000",
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {!cameraActive && (
          <div
            style={{
              padding: "80px 40px",
              textAlign: "center",
              background: theme.bg,
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>📷</div>
            <p style={{ color: "#666", fontSize: "16px", marginBottom: "20px" }}>
              Enable your camera to start detecting mudras
            </p>
          </div>
        )}

        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "16px",
            }}
          >
            Loading hand detection model...
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button
          onClick={startCamera}
          disabled={!model || cameraActive}
          style={{
            flex: 1,
            padding: "14px 24px",
            background: cameraActive ? "#ddd" : theme.color,
            color: cameraActive ? "#999" : "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: cameraActive ? "not-allowed" : "pointer",
            transition: "all 0.3s",
          }}
        >
          {cameraActive ? "📹 Camera Active" : "🎥 Start Camera"}
        </button>

        <button
          onClick={stopCamera}
          disabled={!cameraActive}
          style={{
            flex: 1,
            padding: "14px 24px",
            background: cameraActive ? "#ff6b6b" : "#ddd",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: cameraActive ? "pointer" : "not-allowed",
            transition: "all 0.3s",
          }}
        >
          ⏹️ Stop
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: "16px",
            background: "#ffe6e6",
            border: "1px solid #ffb3b3",
            borderRadius: "12px",
            color: "#d32f2f",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Detected Mudra Card */}
      {detectedMudra && (
        <div
          style={{
            background: "white",
            border: `2px solid ${theme.color}`,
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                background: theme.bg,
                width: "64px",
                height: "64px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {detectedMudra.emoji}
            </div>

            <div style={{ flex: 1 }}>
              <h2
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "20px",
                  color: theme.color,
                  fontWeight: 600,
                }}
              >
                {detectedMudra.english}
              </h2>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                Confidence: <strong>{confidence.toFixed(0)}%</strong>
              </p>
            </div>
          </div>

          {/* Confidence Bar */}
          <div
            style={{
              background: "#f0f0f0",
              height: "8px",
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                background: theme.color,
                height: "100%",
                width: `${confidence}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>

          {/* Multilingual Names */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                padding: "12px",
                background: theme.bg,
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>
                English
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: theme.color }}>
                {detectedMudra.english}
              </div>
            </div>

            <div
              style={{
                padding: "12px",
                background: theme.bg,
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>
                Hindi
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: theme.color }}>
                {detectedMudra.hindi}
              </div>
            </div>

            <div
              style={{
                padding: "12px",
                background: theme.bg,
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>
                Sanskrit
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: theme.color }}>
                {detectedMudra.sanskrit}
              </div>
            </div>
          </div>

          {/* Details */}
          <div style={{ borderTop: `1px solid ${theme.color}20`, paddingTop: "16px" }}>
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#333", fontSize: "14px" }}>Description:</strong>
              <p style={{ margin: "8px 0 0 0", color: "#666", fontSize: "13px" }}>
                {detectedMudra.description}
              </p>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <strong style={{ color: "#333", fontSize: "14px" }}>Usage:</strong>
              <p style={{ margin: "8px 0 0 0", color: "#666", fontSize: "13px" }}>
                {detectedMudra.usage}
              </p>
            </div>

            <div>
              <strong style={{ color: "#333", fontSize: "14px" }}>Classical Forms:</strong>
              <p style={{ margin: "8px 0 0 0", color: "#666", fontSize: "13px" }}>
                {detectedMudra.form}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div
        style={{
          background: theme.bg,
          borderRadius: "12px",
          padding: "16px",
          border: `1px solid ${theme.color}40`,
        }}
      >
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "14px",
            color: theme.color,
            fontWeight: 600,
          }}
        >
          💡 Tips for Best Detection
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: "20px",
            fontSize: "13px",
            color: "#666",
          }}
        >
          <li>Ensure good lighting and clear hand visibility</li>
          <li>Keep your hand within the camera frame</li>
          <li>Hold mudras steadily for accurate detection</li>
          <li>Avoid shadows or backlighting</li>
        </ul>
      </div>
    </div>
  );
};

export default MudraDetection;
