import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px 100px",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Decorative arcs */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "700px",
          borderRadius: "50%",
          border: "1px solid rgba(255,179,0,0.1)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px", height: "500px",
          borderRadius: "50%",
          border: "1px solid rgba(194,24,91,0.1)",
          pointerEvents: "none",
        }} />

        {/* Ornament top */}
        <div style={{
          fontSize: "48px",
          marginBottom: "24px",
          filter: "drop-shadow(0 4px 12px rgba(255,107,0,0.4))",
          animation: "float 4s ease-in-out infinite",
        }}>🪘</div>

        {/* Badge */}
        <div style={{
          display: "inline-block",
          padding: "6px 20px",
          borderRadius: "30px",
          background: "linear-gradient(135deg, rgba(194,24,91,0.15), rgba(255,107,0,0.15))",
          border: "1px solid rgba(255,107,0,0.35)",
          color: "#C2185B",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: "28px",
        }}>
          Indian Classical Arts Platform
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(52px, 9vw, 92px)",
          fontWeight: 900,
          lineHeight: 1.05,
          marginBottom: "24px",
          letterSpacing: "-1px",
        }}>
          <span style={{
            background: "linear-gradient(135deg, #FF6B00 0%, #C2185B 40%, #FFB300 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Nritya</span>
          <br />
          <span style={{
            background: "linear-gradient(135deg, #00897B 0%, #3949AB 60%, #C2185B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Naad</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "#5D3A1A",
          maxWidth: "560px",
          lineHeight: 1.7,
          marginBottom: "48px",
          fontWeight: 300,
        }}>
          Where the rhythm of <em style={{ color: "#C2185B", fontStyle: "italic" }}>Indian dance</em> meets
          the soul of <em style={{ color: "#00897B", fontStyle: "italic" }}>classical music</em> —
          a living digital <em style={{ color: "#FF6B00", fontStyle: "italic" }}>mandala</em> of culture.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/features" style={{
            textDecoration: "none",
            padding: "16px 40px",
            borderRadius: "50px",
            background: "linear-gradient(135deg, #FF6B00, #C2185B)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "0.3px",
            boxShadow: "0 8px 32px rgba(255,107,0,0.4)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,107,0,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,107,0,0.4)"; }}
          >
            Explore Culture →
          </Link>
          <Link to="/features" style={{
            textDecoration: "none",
            padding: "16px 40px",
            borderRadius: "50px",
            background: "transparent",
            color: "#C2185B",
            fontSize: "16px",
            fontWeight: 500,
            border: "2px solid #C2185B",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(194,24,91,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            View Features
          </Link>
        </div>

        {/* Feature pills */}
        <div style={{
          marginTop: "72px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "640px",
        }}>
          {["Mudra Detection", "Raga Explorer", "Beat Visualizer", "Learn Swaras", "Dance Gallery", "Karaoke"].map((tag, i) => (
            <span key={i} style={{
              padding: "6px 16px",
              borderRadius: "30px",
              fontSize: "13px",
              fontWeight: 400,
              color: ["#C2185B", "#00897B", "#FF6B00", "#3949AB", "#C2185B", "#00897B"][i % 6],
              background: ["rgba(194,24,91,0.1)", "rgba(0,137,123,0.1)", "rgba(255,107,0,0.1)", "rgba(57,73,171,0.1)", "rgba(194,24,91,0.1)", "rgba(0,137,123,0.1)"][i % 6],
              border: `1px solid ${{ 0: "rgba(194,24,91,0.25)", 1: "rgba(0,137,123,0.25)", 2: "rgba(255,107,0,0.25)", 3: "rgba(57,73,171,0.25)", 4: "rgba(194,24,91,0.25)", 5: "rgba(0,137,123,0.25)" }[i % 6]}`,
            }}>{tag}</span>
          ))}
        </div>

        {/* Divider ornament */}
        <div style={{
          marginTop: "64px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          opacity: 0.5,
        }}>
          <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, #FFB300)" }} />
          <span style={{ fontSize: "18px" }}>✦</span>
          <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, #FFB300, transparent)" }} />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}