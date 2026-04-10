import features from "../data/features.json";
import FeatureCard from "../components/FeatureCard";
import Navbar from "../components/Navbar";

export default function Features() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ padding: "64px 48px 80px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ fontSize: "36px", marginBottom: "16px" }}>✦</div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "16px",
          }}>
            <span style={{
              background: "linear-gradient(135deg, #C2185B, #FF6B00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Explore</span>{" "}
            <span style={{
              background: "linear-gradient(135deg, #00897B, #3949AB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Features</span>
          </h1>

          <p style={{
            fontSize: "17px",
            color: "#5D3A1A",
            fontWeight: 300,
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Dive into the <em style={{ color: "#C2185B" }}>16 modules</em> celebrating the
            living tradition of Indian dance & music
          </p>

          {/* Ornament divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginTop: "32px",
          }}>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #FFB300)" }} />
            <div style={{
              width: "8px", height: "8px",
              borderRadius: "50%",
              background: "#FFB300",
            }} />
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #FFB300, transparent)" }} />
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {features.map((f) => (
            <FeatureCard key={f.id} feature={f} />
          ))}
        </div>
      </div>
    </div>
  );
}