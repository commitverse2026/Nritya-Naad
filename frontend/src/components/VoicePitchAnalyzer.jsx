import { useEffect, useMemo, useRef, useState } from "react";

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function VoicePitchAnalyzer({ theme }) {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const sourceRef = useRef(null);
  const rafRef = useRef(0);
  const bufferRef = useRef(new Float32Array(2048));

  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [pitch, setPitch] = useState(null);
  const [clarity, setClarity] = useState(0);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    return () => stop();
  }, []);

  const noteInfo = useMemo(() => {
    if (!pitch) return null;
    const midi = Math.round(69 + 12 * Math.log2(pitch / 440));
    const note = NOTE_NAMES[((midi % 12) + 12) % 12];
    const octave = Math.floor(midi / 12) - 1;
    const exact = 69 + 12 * Math.log2(pitch / 440);
    const cents = Math.round((exact - midi) * 100);
    return { note, octave, cents };
  }, [pitch]);

  async function start() {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
        },
      });

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioCtx();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.15;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      streamRef.current = stream;
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
      setRunning(true);
      tick();
    } catch (e) {
      setError("Microphone access was denied or unavailable.");
    }
  }

  function stop() {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    sourceRef.current?.disconnect?.();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioContextRef.current?.close?.();
    streamRef.current = null;
    audioContextRef.current = null;
    analyserRef.current = null;
    sourceRef.current = null;
    setRunning(false);
    setPitch(null);
    setClarity(0);
    setLevel(0);
  }

  function tick() {
    const analyser = analyserRef.current;
    const audioContext = audioContextRef.current;
    if (!analyser || !audioContext) return;

    const buffer = bufferRef.current;
    analyser.getFloatTimeDomainData(buffer);

    const detected = autoCorrelate(buffer, audioContext.sampleRate);
    setPitch(detected.frequency);
    setClarity(detected.clarity);
    setLevel(rms(buffer));

    rafRef.current = requestAnimationFrame(tick);
  }

  const gaugeColor =
    level < 0.02 ? "#BDBDBD" : clarity > 0.82 ? "#2E7D32" : clarity > 0.6 ? "#FF8F00" : "#C62828";

  return (
    <div style={{ width: "100%", maxWidth: "920px", margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        <div style={panel(theme)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: theme.color, margin: 0 }}>
                Live Voice Pitch
              </h2>
              <p style={{ fontSize: "13px", color: "#8B6452", margin: "6px 0 0" }}>
                Allow mic access, sing a steady note, and watch the detected frequency in real time.
              </p>
            </div>
            <button
              type="button"
              onClick={running ? stop : start}
              style={{
                border: "none",
                borderRadius: "14px",
                padding: "12px 18px",
                background: running ? "#5D3A1A" : theme.color,
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {running ? "Stop" : "Start mic"}
            </button>
          </div>

          <div
            style={{
              borderRadius: "22px",
              background: `linear-gradient(135deg, ${theme.bg}, #fff)`,
              border: `1.5px solid ${theme.color}22`,
              padding: "28px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "13px", color: "#8B6452", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Detected frequency
            </div>
            <div style={{ fontSize: "clamp(42px, 7vw, 68px)", lineHeight: 1, fontWeight: 700, color: theme.color }}>
              {pitch ? `${pitch.toFixed(1)} Hz` : "--"}
            </div>
            <div style={{ marginTop: "14px", fontSize: "18px", color: "#5D3A1A", fontWeight: 600 }}>
              {noteInfo ? `${noteInfo.note}${noteInfo.octave}` : "Waiting for voice..."}
            </div>
            <div style={{ marginTop: "6px", fontSize: "13px", color: "#8B6452" }}>
              {noteInfo ? `${Math.abs(noteInfo.cents)} cents ${noteInfo.cents >= 0 ? "sharp" : "flat"}` : "Sing one clean sustained note"}
            </div>
          </div>

          {error ? (
            <p style={{ marginTop: "14px", color: "#B71C1C", fontSize: "13px" }}>{error}</p>
          ) : null}
        </div>

        <div style={panel(theme)}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "21px", color: theme.color, marginTop: 0, marginBottom: "16px" }}>
            Signal quality
          </h3>

          <Meter label="Input level" value={Math.min(level * 6, 1)} color={theme.color} />
          <Meter label="Pitch confidence" value={clarity} color={gaugeColor} />

          <div
            style={{
              marginTop: "20px",
              borderRadius: "16px",
              padding: "16px",
              background: theme.bg,
              border: `1px solid ${theme.color}20`,
            }}
          >
            <div style={{ fontSize: "13px", color: "#5D3A1A", lineHeight: 1.7 }}>
              <strong>Tips:</strong> keep the mic close, reduce room noise, and sing a long vowel like "aa" or "sa".
            </div>
          </div>

          <div style={{ marginTop: "18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <StatCard title="Target use" value="Singing practice" />
            <StatCard title="Best input" value="Single steady note" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Meter({ label, value, color }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#5D3A1A", marginBottom: "6px" }}>
        <span>{label}</span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <div style={{ height: "10px", borderRadius: "999px", background: "rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div
          style={{
            width: `${Math.max(4, value * 100)}%`,
            height: "100%",
            borderRadius: "999px",
            background: color,
            transition: "width 0.12s linear",
          }}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={{ borderRadius: "14px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", padding: "14px" }}>
      <div style={{ fontSize: "12px", color: "#8B6452", marginBottom: "6px" }}>{title}</div>
      <div style={{ fontSize: "14px", color: "#5D3A1A", fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function panel(theme) {
  return {
    background: "#fff",
    borderRadius: "22px",
    border: `1.5px solid ${theme.color}22`,
    boxShadow: "0 8px 28px rgba(0,0,0,0.05)",
    padding: "22px",
  };
}

function rms(buffer) {
  let sum = 0;
  for (let i = 0; i < buffer.length; i += 1) sum += buffer[i] * buffer[i];
  return Math.sqrt(sum / buffer.length);
}

function autoCorrelate(buffer, sampleRate) {
  const size = buffer.length;
  const signal = rms(buffer);
  if (signal < 0.01) return { frequency: null, clarity: 0 };

  let bestOffset = -1;
  let bestCorrelation = 0;
  const correlations = new Array(size).fill(0);

  for (let offset = 8; offset < size / 2; offset += 1) {
    let correlation = 0;
    for (let i = 0; i < size / 2; i += 1) {
      correlation += Math.abs(buffer[i] - buffer[i + offset]);
    }
    correlation = 1 - correlation / (size / 2);
    correlations[offset] = correlation;
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }

  if (bestOffset === -1 || bestCorrelation < 0.55) {
    return { frequency: null, clarity: Math.max(0, bestCorrelation) };
  }

  const shift =
    (correlations[bestOffset + 1] || 0) - (correlations[bestOffset - 1] || 0);
  const refinedOffset = bestOffset + 8 * shift;

  return {
    frequency: sampleRate / refinedOffset,
    clarity: Math.min(1, bestCorrelation),
  };
}
