import { useParams, Link } from "react-router-dom";
import features from "../data/features.json";
import Navbar from "../components/Navbar";

// 1. Import your feature components here
import MudraDetection from "../components/features/MudraDetection";
import Chatbot from "../components/features/Chatbot";

const FEATURE_THEMES = {
  mudra:      { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🤲" },
  gallery:    { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🖼️" },
  academy:    { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🏛️" },
  chatbot:    { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "💬" },
  stories:    { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "📖" },
  map:        { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🗺️" },
  upload:     { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎬" },
  danceform:  { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎵" },
  quiz:       { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "❓" },
  event:      { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "📅" },
  reels:      { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎞️" },
  mindmap:    { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🧠" },
  pitch:      { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🎙️" },
  karaoke:    { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🎤" },
  visualizer: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🌊" },
  swaras:     { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎶" },
};

export default function FeaturePage() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);
  const theme = FEATURE_THEMES[id] || FEATURE_THEMES.mudra;

  // 2. This function handles which implementation to show based on the URL ID
  const renderFeatureModule = () => {
    switch (id) {
      case "mudra":
        return <MudraDetection />;
      case "chatbot":
        return <Chatbot />;
      default:
        return (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎨</div>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "24px", 
              color: theme.color 
            }}>
              Module Under Construction
            </h2>
            <p style={{ color: "#8B6452", fontWeight: 300 }}>
              We are currently weaving the digital fabric for the {feature?.name} module.
            </p>
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fcfaf8" }}>
      <Navbar />

      <div style={{ padding: "48px 24px 80px", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>

        {/* Breadcrumb Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px" }}>
          <Link to="/features" style={{ textDecoration: "none", fontSize: "13px", color: "#8B6452" }}>
            ← All Features
          </Link>
          <span style={{ color: "#cbb", fontSize: "13px" }}>/</span>
          <span style={{ fontSize: "13px", color: theme.color, fontWeight: 500 }}>{feature?.name}</span>
        </div>

        {/* Feature Context Header */}
        <div style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "32px",
          border: `1px solid rgba(0,0,0,0.05)`,
          marginBottom: "32px",
          position: "relative",
          boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "6px",
            background: theme.gradient,
            borderRadius: "24px 24px 0 0",
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{
              width: "60px", height: "60px",
              borderRadius: "16px",
              background: theme.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              border: `1px solid ${theme.color}20`
            }}>
              {theme.icon}
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                color: theme.color,
                margin: 0
              }}>
                {feature?.name}
              </h1>
              <p style={{ fontSize: "13px", color: "#8B6452", margin: "4px 0 0" }}>
                Interactive Cultural Workspace
              </p>
            </div>
          </div>
        </div>

        {/* Core Implementation Display Area */}
        <div style={{
          background: id === "mudra" ? "transparent" : "#fff",
          borderRadius: "32px",
          padding: id === "mudra" ? "0" : "40px",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: id === "mudra" ? "none" : "0 20px 50px rgba(0,0,0,0.04)",
          border: id === "mudra" ? "none" : "1px solid rgba(0,0,0,0.03)"
        }}>
          {renderFeatureModule()}
        </div>

      </div>
    </div>
  );
}