import { useState, useRef } from "react";

export default function PitchDetector() {
  const [pitch, setPitch] = useState(null);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Click Start");

  const isRunningRef = useRef(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);
  const streamRef = useRef(null);

  const startDetection = async () => {
    if (isRunningRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // 🔥 IMPORTANT FIX (Chrome autoplay policy)
      await audioContext.resume();

      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 2048;
      const dataArray = new Float32Array(analyser.fftSize);

      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      isRunningRef.current = true;
      setStatus("Listening...");

      detectPitch();
    } catch (err) {
      console.error(err);
      setStatus("Microphone access denied ❌");
    }
  };

  const stopDetection = () => {
    isRunningRef.current = false;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    setStatus("Stopped ⛔");
    setPitch(null);
    setNote("");
  };

  const detectPitch = () => {
    if (!isRunningRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    const audioContext = audioContextRef.current;

    if (!analyser || !dataArray || !audioContext) return;

    analyser.getFloatTimeDomainData(dataArray);

    const freq = autoCorrelate(dataArray, audioContext.sampleRate);

    if (freq !== -1) {
      setPitch(freq.toFixed(2));
      setNote(getNoteFromFrequency(freq));
      setStatus("Detected ✅");
    } else {
      setStatus("Listening...");
    }

    animationRef.current = requestAnimationFrame(detectPitch);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎤 Voice Pitch Detection</h2>

      <button onClick={startDetection}>Start</button>
      <button onClick={stopDetection} style={{ marginLeft: "10px" }}>
        Stop
      </button>

      <h3>Pitch: {pitch ? `${pitch} Hz` : "--"}</h3>
      <h3>Note: {note || "--"}</h3>
      <p>Status: {status}</p>
    </div>
  );
}

/* -------- HELPER FUNCTIONS -------- */

function autoCorrelate(buffer, sampleRate) {
  let SIZE = buffer.length;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) {
    rms += buffer[i] * buffer[i];
  }
  rms = Math.sqrt(rms / SIZE);

  if (rms < 0.01) return -1;

  let r1 = 0, r2 = SIZE - 1;

  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < 0.2) {
      r1 = i;
      break;
    }
  }

  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < 0.2) {
      r2 = SIZE - i;
      break;
    }
  }

  buffer = buffer.slice(r1, r2);
  SIZE = buffer.length;

  let c = new Array(SIZE).fill(0);

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
      c[i] += buffer[j] * buffer[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;

  let maxval = -1;
  let maxpos = -1;

  for (let i = d; i < SIZE; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;
  return sampleRate / T0;
}

function getNoteFromFrequency(freq) {
  if (freq < 120) return "Sa";
  if (freq < 140) return "Re";
  if (freq < 160) return "Ga";
  if (freq < 180) return "Ma";
  if (freq < 200) return "Pa";
  if (freq < 230) return "Dha";
  if (freq < 260) return "Ni";
  return "Sa (High)";
}