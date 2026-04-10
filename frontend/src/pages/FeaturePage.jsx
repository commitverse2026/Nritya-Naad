import { useParams, Link } from "react-router-dom";
import features from "../data/features.json";
import Navbar from "../components/Navbar";
import { useState } from "react";
const FEATURE_THEMES = {
  mudra:      { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🤲" },
  gallery:    { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🖼️" },
  academy:    { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🏛️" },
  chatbot:    { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "💬" },
  stories:    { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "📖" },
  map:        { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🗺️" },
  upload:     { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎬" },
  danceform:       { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎵" },
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
  const [academies, setAcademies] = useState([]);
const [form, setForm] = useState({
  name: "",
  location: "",
  fees: "",
  offerings: "",
});

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.name || !form.location) return;

  setAcademies([...academies, form]);

  setForm({
    name: "",
    location: "",
    fees: "",
    offerings: "",
  });
};
const inputStyle = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  outline: "none",
};
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ padding: "48px 48px 80px", maxWidth: "860px", margin: "0 auto", width: "100%" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px" }}>
          <Link to="/features" style={{
            textDecoration: "none",
            fontSize: "13px",
            color: "#8B6452",
            transition: "color 0.2s",
          }}>← All Features</Link>
          <span style={{ color: "#cbb", fontSize: "13px" }}>/</span>
          <span style={{ fontSize: "13px", color: theme.color, fontWeight: 500 }}>{feature?.name}</span>
        </div>

        {/* Feature header card */}
        <div style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "40px",
          border: `1.5px solid rgba(0,0,0,0.06)`,
          marginBottom: "24px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Gradient accent bar */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "5px",
            background: theme.gradient,
            borderRadius: "24px 24px 0 0",
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <div style={{
              width: "68px", height: "68px",
              borderRadius: "18px",
              background: theme.bg,
              border: `2px solid ${theme.color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}>
              {theme.icon}
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                fontWeight: 700,
                color: theme.color,
                marginBottom: "4px",
              }}>
                {feature?.name}
              </h1>
              <p style={{ fontSize: "14px", color: "#8B6452" }}>
                NrityaNaad Feature Module
              </p>
            </div>
          </div>

          <p style={{
            fontSize: "15px",
            color: "#5D3A1A",
            lineHeight: 1.7,
            fontWeight: 300,
          }}>
            This is your dedicated workspace for the <strong style={{ color: theme.color, fontWeight: 500 }}>{feature?.name}</strong> module.
            Build your feature UI and logic here, with full access to the NrityaNaad design system and theme.
          </p>
        </div>

        {/* Implementation area */}
        <div style={{
  borderRadius: "24px",
  padding: "40px",
  border: `2px dashed ${theme.color}40`,
  background: theme.bg,
}}>

  {/* FORM */}
  <h2 style={{
    fontSize: "20px",
    marginBottom: "20px",
    color: theme.color,
    fontWeight: "600"
  }}>
    Add Academy
  </h2>

  <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
    <div style={{ display: "grid", gap: "12px" }}>
      <input
        type="text"
        name="name"
        placeholder="Academy Name"
        value={form.name}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="fees"
        placeholder="Fees"
        value={form.fees}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="offerings"
        placeholder="Offerings (e.g. Bharatanatyam, Kathak)"
        value={form.offerings}
        onChange={handleChange}
        style={inputStyle}
      />

      <button type="submit" style={{
        padding: "10px",
        background: theme.color,
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "500"
      }}>
        Add Academy
      </button>
    </div>
  </form>

  {/* LIST VIEW */}
  <h2 style={{
    fontSize: "20px",
    marginBottom: "20px",
    color: theme.color,
    fontWeight: "600"
  }}>
    Academy Listings
  </h2>

  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  }}>
    {academies.map((academy, index) => (
      <div key={index} style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <h3 style={{ color: theme.color }}>{academy.name}</h3>
        <p><strong>📍</strong> {academy.location}</p>
        <p><strong>💰</strong> {academy.fees}</p>
        <p><strong>🎭</strong> {academy.offerings}</p>
      </div>
    ))}
  </div>

</div>

      </div>
    </div>
  );
}