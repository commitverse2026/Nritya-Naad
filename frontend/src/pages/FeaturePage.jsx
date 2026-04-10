import { useParams, useNavigate } from "react-router-dom";
import features from "../data/features.json";

// Existing feature components
import DanceGallery from "../components/DanceGallery";
import AcademyListing from "../components/AcademyListing";
import CulturalChatbot from "../components/CulturalChatbot";
import ArtLineageMindMap from "../components/ArtLineageMindMap";
import UserStories from "../components/UserStories";
import MindMap from "./MindMap";

// NEW: Feature 13
import PitchDetector from "../components/PitchDetector";

export default function FeaturePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const feature = features.find((f) => f.id === id);

  if (!feature) {
    return <div style={{ padding: "20px" }}>Feature not found</div>;
  }

  // 🎨 Theme mapping
  const themes = {
    gallery: {
      color: "#6A1B9A",
      bg: "rgba(106,27,154,0.08)",
      gradient: "linear-gradient(135deg, #6A1B9A, #8E24AA)",
      icon: "💃"
    },
    academy: {
      color: "#2E7D32",
      bg: "rgba(46,125,50,0.08)",
      gradient: "linear-gradient(135deg, #2E7D32, #66BB6A)",
      icon: "🎓"
    },
    chatbot: {
      color: "#0277BD",
      bg: "rgba(2,119,189,0.08)",
      gradient: "linear-gradient(135deg, #0277BD, #29B6F6)",
      icon: "🤖"
    },
    mindmap: {
      color: "#F57C00",
      bg: "rgba(245,124,0,0.08)",
      gradient: "linear-gradient(135deg, #F57C00, #FB8C00)",
      icon: "🧠"
    },
    stories: {
      color: "#AD1457",
      bg: "rgba(173,20,87,0.08)",
      gradient: "linear-gradient(135deg, #AD1457, #D81B60)",
      icon: "📖"
    },
    pitch: {
      color: "#C2185B",
      bg: "rgba(194,24,91,0.08)",
      gradient: "linear-gradient(135deg, #C2185B, #880E4F)",
      icon: "🎙️"
    }
  };

  const theme = themes[id] || {
    color: "#333",
    bg: "#f5f5f5",
    gradient: "#ccc",
    icon: "✨"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        background: theme.bg
      }}
    >
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "16px",
          padding: "8px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      {/* 🧾 Header */}
      <div
        style={{
          background: theme.gradient,
          padding: "20px",
          borderRadius: "12px",
          color: "white",
          marginBottom: "20px"
        }}
      >
        <h1>
          {theme.icon} {feature.name}
        </h1>
      </div>

      {/* 🚀 Feature Implementation Area */}
      {id === "gallery" ? (
        <DanceGallery theme={theme} />

      ) : id === "academy" ? (
        <AcademyListing theme={theme} />

      ) : id === "chatbot" ? (
        <CulturalChatbot theme={theme} />

      ) : id === "mindmap" || id === "map" ? (
        <ArtLineageMindMap theme={theme} />

      ) : id === "stories" ? (
        <UserStories theme={theme} />

      ) : id === "pitch" ? (
        <div style={{ marginTop: "8px" , width:"100%"}}>
          <PitchDetector />
        </div>

        {/* Implementation area */}
        {id === "stories" ? (
          <div style={{ marginTop: "32px", width: "100%", display: "flex", justifyContent: "center" }}>
            <UserStories theme={theme} />
          </div>
        ) : (
          <div style={{
            borderRadius: "24px",
            padding: "60px 40px",
            border: `2px dashed ${theme.color}40`,
            background: theme.bg,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚀</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: theme.color,
              marginBottom: "10px",
            }}>
              Implementation Area
            </h2>
            <p style={{ fontSize: "14px", color: "#8B6452", fontWeight: 300 }}>
              Drop your feature components and logic right here
            </p>
          </div>
        )}

      </div>
    </div>
  );}
