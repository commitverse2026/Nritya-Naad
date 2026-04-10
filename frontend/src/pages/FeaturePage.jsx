import { useParams, Link } from "react-router-dom";
import features from "../data/features.json";
import Navbar from "../components/Navbar";
import MudraDetection from "../components/features/MudraDetection";

const FEATURE_THEMES = {
  mudra: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🤲" },
  // ... other themes same as before
};

export default function FeaturePage() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);
  const theme = FEATURE_THEMES[id] || FEATURE_THEMES.mudra;

  const renderFeature = () => {
    switch (id) {
      case "mudra":
        return <MudraDetection />;
      default:
        return (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "48px" }}>🚀</div>
            <h2 style={{ color: theme.color }}>Implementation Area</h2>
            <p>The {feature?.name} module is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fcfaf8" }}>
      <Navbar />
      <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ background: "#fff", padding: "30px", borderRadius: "20px", borderTop: `5px solid ${theme.color}`, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
          <h1 style={{ color: theme.color, fontFamily: "Playfair Display" }}>{feature?.name}</h1>
          <p style={{ color: "#8B6452" }}>Explore the art of Indian Classical traditions.</p>
        </div>

        {/* Live Feature Area */}
        <div style={{ background: id === 'mudra' ? 'transparent' : theme.bg, borderRadius: "20px" }}>
          {renderFeature()}
        </div>
      </div>
    </div>
  );
}