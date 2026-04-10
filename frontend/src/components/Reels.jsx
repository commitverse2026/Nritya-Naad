import { useMemo, useState } from "react";
import reels from "../data/reels.json";

const DANCE_FORMS = ["Bharatanatyam", "Kathak", "Odissi", "Kuchipudi", "Mohiniyattam", "Manipuri", "Classical Music"];

export default function Reels({ theme }) {
  const [query, setQuery] = useState("");
  const [activeForm, setActiveForm] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reels.filter((reel) => {
      const matchesForm = activeForm === "all" || reel.form === activeForm;
      if (!matchesForm) return false;
      if (!q) return true;
      const blob = `${reel.title} ${reel.artist} ${reel.form} ${reel.description}`.toLowerCase();
      return blob.includes(q);
    });
  }, [query, activeForm]);

  return (
    <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", textAlign: "left" }}>
      {/* Description */}
      <p style={{
        fontSize: "15px",
        color: "#5D3A1A",
        lineHeight: 1.75,
        fontWeight: 300,
        marginBottom: "28px",
      }}>
        Short-form videos celebrating Indian classical dance and music. Watch performances, learn techniques, and discover artists across all traditions — Bharatanatyam, Kathak, Odissi, Kuchipudi, and more.
      </p>

      {/* Search Bar */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        alignItems: "center",
        marginBottom: "20px",
      }}>
        <input
          type="search"
          placeholder="Search by title, artist, or form…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter reels by text"
          style={{
            flex: "1 1 220px",
            minWidth: "200px",
            padding: "12px 16px",
            borderRadius: "14px",
            border: `1.5px solid ${theme.color}35`,
            background: "#fff",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            outline: "none",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        />
      </div>

      {/* Filter Chips */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "28px",
      }}>
        <button
          type="button"
          onClick={() => setActiveForm("all")}
          style={chipStyle(activeForm === "all", theme)}
        >
          All forms
        </button>
        {DANCE_FORMS.map((form) => (
          <button
            key={form}
            type="button"
            onClick={() => setActiveForm(form)}
            style={chipStyle(activeForm === form, theme)}
          >
            {form}
          </button>
        ))}
      </div>

      {/* No Results */}
      {filtered.length === 0 ? (
        <p style={{ color: "#8B6452", fontSize: "15px", textAlign: "center", padding: "48px 16px" }}>
          No reels match that filter. Try clearing search or choosing "All forms".
        </p>
      ) : (
        /* Reels Grid */
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {filtered.map((reel) => (
            <div
              key={reel.id}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                background: "#fff",
                border: `1.5px solid ${theme.color}18`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 16px 40px ${theme.color}35`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
              }}
            >
              {/* Video Thumbnail */}
              <div style={{
                aspectRatio: "9 / 16",
                background: `linear-gradient(145deg, ${theme.bg}, #fff)`,
                position: "relative",
                overflow: "hidden",
              }}>
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Overlay Gradient */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(26,10,0,0.75) 100%)",
                  pointerEvents: "none",
                }} />

                {/* Play Button */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: `${theme.color}dd`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  opacity: 0.9,
                }}>
                  ▶
                </div>

                {/* Duration Badge */}
                <div style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}>
                  {reel.duration}
                </div>

                {/* Form Badge */}
                <div style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: theme.color,
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}>
                  {reel.form}
                </div>

                {/* Title Overlay */}
                <div style={{
                  position: "absolute",
                  left: "12px",
                  right: "12px",
                  bottom: "50px",
                  color: "#fff",
                  pointerEvents: "none",
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                  }}>
                    {reel.title}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                flex: 1,
              }}>
                {/* Artist */}
                <div style={{
                  fontSize: "13px",
                  color: theme.color,
                  fontWeight: 600,
                }}>
                  {reel.artist}
                </div>

                {/* Description */}
                <p style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#5D3A1A",
                  lineHeight: 1.5,
                  fontWeight: 400,
                  flex: 1,
                }}>
                  {reel.description}
                </p>

                {/* Stats */}
                <div style={{
                  display: "flex",
                  gap: "16px",
                  fontSize: "12px",
                  color: "#8B6452",
                  borderTop: `1px solid ${theme.color}18`,
                  paddingTop: "12px",
                }}>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <span>❤️</span> {reel.likes.toLocaleString()}
                  </div>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <span>👁️</span> {reel.views.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function chipStyle(isActive, theme) {
  return {
    padding: "8px 14px",
    borderRadius: "20px",
    border: `1.5px solid ${isActive ? theme.color : theme.color + "30"}`,
    background: isActive ? theme.color : theme.bg,
    color: isActive ? "#fff" : theme.color,
    fontSize: "13px",
    fontWeight: isActive ? 700 : 500,
    cursor: "pointer",
    transition: "all 0.22s ease",
    fontFamily: "'DM Sans', sans-serif",
  };
}
