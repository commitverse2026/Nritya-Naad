import { useParams, Link } from "react-router-dom";
import features from "../data/features.json";
import Navbar from "../components/Navbar";
import UserStories from "../components/UserStories";
import Karaoke from "../components/Karaoke";

const FEATURE_THEMES = {
  mudra: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🤲" },
  music: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎵" },
  stories: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "📖" },
  map: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🗺️" },
  upload: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎬" },
  danceform: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎵" },
  quiz: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "❓" },
  event: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "📅" },
  reels: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎞️" },
  karaoke: { color: "#6A1B9A", bg: "rgba(106,27,154,0.08)", gradient: "linear-gradient(135deg, #6A1B9A, #4A148C)", icon: "🎤" }
};

export default function FeaturePage() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);

  if (!feature) {
    return <div>Feature not found</div>;
  }

  const theme = FEATURE_THEMES[id] || FEATURE_THEMES.music;

  return (
    <div>
      <Navbar />

      <div style={{ padding: "24px" }}>
        <Link to="/">← Back</Link>

        <h1 style={{ color: theme.color }}>{feature.title}</h1>
        <p>{feature.description}</p>

        {/* 🎤 Karaoke Feature */}
        {id === "karaoke" ? (
          <div style={{ marginTop: "32px", width: "100%" }}>
            <Karaoke theme={theme} />
          </div>
        ) : id === "stories" ? (
          <div style={{ marginTop: "32px", width: "100%", display: "flex", justifyContent: "center" }}>
            <UserStories theme={theme} />
          </div>
        ) : (
          <div style={{
            marginTop: "32px",
            padding: "20px",
            borderRadius: "12px",
            background: theme.bg
          }}>
            <p>Feature UI coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}