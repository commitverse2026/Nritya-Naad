import { useParams, Link } from "react-router-dom";
import features from "../data/features.json";
import Navbar from "../components/Navbar";
import UserStories from "../components/UserStories";
import DanceGallery from "../components/DanceGallery";
import AcademyListing from "../components/AcademyListing";
import CulturalChatbot from "../components/CulturalChatbot";
import ArtLineageMindMap from "../components/ArtLineageMindMap";
import Reels from "../components/Reels";

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

  const contentMaxWidth =
    id === "gallery" || id === "mindmap" || id === "map"
      ? "1200px"
      : id === "academy" || id === "chatbot"
      ? "900px"
      : "860px";

  if (!feature) {
    return (
      <div style={{ padding: "40px" }}>
        <Navbar />
        <h2>Feature not found</h2>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ padding: "48px", maxWidth: contentMaxWidth, margin: "0 auto", width: "100%" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "36px" }}>
          <Link to="/features" style={{ textDecoration: "none", fontSize: "13px", color: "#8B6452" }}>
            ← All Features
          </Link>
          <span>/</span>
          <span style={{ color: theme.color }}>{feature.name}</span>
        </div>

        {/* Header */}
        <div style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "40px",
          border: "1px solid rgba(0,0,0,0.06)",
          marginBottom: "24px"
        }}>
          <h1 style={{ color: theme.color }}>{feature.name}</h1>
          <p>NrityaNaad Feature Module</p>
        </div>

        {/* Dynamic Content */}
        {id === "gallery" && <DanceGallery theme={theme} />}
        {id === "academy" && <AcademyListing theme={theme} />}
        {id === "chatbot" && <CulturalChatbot theme={theme} />}
        {(id === "mindmap" || id === "map") && <ArtLineageMindMap theme={theme} />}
        {id === "stories" && <UserStories theme={theme} />}
        {id === "reels" && <Reels theme={theme} />}

        {/* Default */}
        {!["gallery", "academy", "chatbot", "mindmap", "map", "stories", "reels"].includes(id) && (
          <div style={{
            borderRadius: "24px",
            padding: "60px",
            border: `2px dashed ${theme.color}`,
            textAlign: "center"
          }}>
            <h2>🚀 Implementation Area</h2>
            <p>Add your feature here</p>
          </div>
        )}

      </div>
    </div>
  );
}