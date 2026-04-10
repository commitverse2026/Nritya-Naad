import { useState } from "react";
import Navbar from "../components/Navbar";

const EVENTS = [
  {
    id: 1,
    title: "Bharatanatyam Intensive Workshop",
    instructor: "Guru Lakshmi Narayanan",
    category: "Dance",
    date: "2026-04-18",
    time: "10:00 AM – 1:00 PM",
    location: "Mumbai, Maharashtra",
    venue: "Shanmukhananda Hall",
    fees: "₹800",
    seats: 20,
    seatsLeft: 7,
    description: "A three-hour intensive session covering Adavus, Hastas, and expressive Abhinaya for intermediate students.",
    tags: ["Bharatanatyam", "Intermediate", "Workshop"],
  },
  {
    id: 2,
    title: "Hindustani Vocal — Raga Yaman",
    instructor: "Pandit Suresh Mishra",
    category: "Music",
    date: "2026-04-22",
    time: "6:00 PM – 8:00 PM",
    location: "Pune, Maharashtra",
    venue: "Bal Gandharva Rang Mandir",
    fees: "₹500",
    seats: 30,
    seatsLeft: 15,
    description: "Deep exploration of Raga Yaman — its aroha-avaroha, characteristic phrases, and bandish compositions.",
    tags: ["Hindustani", "Vocal", "Raga"],
  },
  {
    id: 3,
    title: "Kathak Footwork Masterclass",
    instructor: "Vidushi Priya Sharma",
    category: "Dance",
    date: "2026-05-03",
    time: "11:00 AM – 2:00 PM",
    location: "Delhi",
    venue: "Kamani Auditorium",
    fees: "₹1000",
    seats: 15,
    seatsLeft: 3,
    description: "Focus on Tatkar — the foundation of Kathak footwork. Suitable for students with 2+ years of Kathak training.",
    tags: ["Kathak", "Advanced", "Masterclass"],
  },
  {
    id: 4,
    title: "Tabla for Beginners",
    instructor: "Ustad Farooq Khan",
    category: "Music",
    date: "2026-05-10",
    time: "9:00 AM – 11:00 AM",
    location: "Hyderabad, Telangana",
    venue: "Ravindra Bharathi",
    fees: "₹400",
    seats: 25,
    seatsLeft: 18,
    description: "Introduction to Tabla — basic bols, hand positioning, and Teentaal for absolute beginners.",
    tags: ["Tabla", "Beginner", "Percussion"],
  },
  {
    id: 5,
    title: "Odissi Dance — Tribhangi Posture",
    instructor: "Guru Aruna Mohanty",
    category: "Dance",
    date: "2026-05-17",
    time: "3:00 PM – 6:00 PM",
    location: "Bhubaneswar, Odisha",
    venue: "Rabindra Mandap",
    fees: "₹750",
    seats: 20,
    seatsLeft: 12,
    description: "A detailed session on the iconic Tribhangi posture of Odissi and its application in compositions.",
    tags: ["Odissi", "Intermediate", "Workshop"],
  },
  {
    id: 6,
    title: "Carnatic Music — Varnam Workshop",
    instructor: "Vidwan T.M. Krishna",
    category: "Music",
    date: "2026-06-01",
    time: "10:00 AM – 12:30 PM",
    location: "Chennai, Tamil Nadu",
    venue: "Music Academy",
    fees: "₹600",
    seats: 40,
    seatsLeft: 22,
    description: "An in-depth workshop on Varnams — the backbone of Carnatic music training — with live demonstration.",
    tags: ["Carnatic", "Vocal", "Varnam"],
  },
];

const CATEGORY_COLORS = {
  Dance: { bg: "rgba(194,24,91,0.12)", border: "rgba(194,24,91,0.35)", text: "#C2185B" },
  Music: { bg: "rgba(0,137,123,0.12)", border: "rgba(0,137,123,0.35)", text: "#00897B" },
};

const TAG_COLORS = [
  { bg: "rgba(255,107,0,0.1)",   border: "rgba(255,107,0,0.3)",   text: "#FF6B00" },
  { bg: "rgba(57,73,171,0.1)",   border: "rgba(57,73,171,0.3)",   text: "#3949AB" },
  { bg: "rgba(255,179,0,0.1)",   border: "rgba(255,179,0,0.3)",   text: "#FFB300" },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
}

function getDaysLeft(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function Events() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [registered, setRegistered] = useState([]);

  const filters = ["All", "Dance", "Music"];

  const filtered = EVENTS.filter(e => {
    const matchCat = filter === "All" || e.category === filter;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()) ||
      e.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleRegister(id) {
    setRegistered(r => r.includes(id) ? r : [...r, id]);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1A0A00 0%, #2D1200 60%, #1A0A00 100%)",
        borderBottom: "1px solid rgba(255,179,0,0.2)",
        padding: "52px 24px 40px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(255,107,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>🎪</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, background: "linear-gradient(90deg, #FFB300, #FF6B00, #FFE082)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "10px" }}>
          Events & Workshops
        </h1>
        <p style={{ color: "#9C7B52", fontSize: "15px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
          Upcoming dance and music workshops by master practitioners across India.
        </p>
      </div>

      {/* Filters + Search */}
      <div style={{ background: "#0D0500", borderBottom: "1px solid rgba(255,179,0,0.1)", padding: "20px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "7px 20px", borderRadius: "30px", fontSize: "13px", fontWeight: 500,
                cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
                background: filter === f ? "linear-gradient(135deg, #FF6B00, #C2185B)" : "transparent",
                color: filter === f ? "#fff" : "#A0785A",
                border: filter === f ? "none" : "1px solid rgba(255,107,0,0.3)",
              }}>{f}</button>
            ))}
          </div>
          <div style={{ position: "relative", flex: 1, maxWidth: "320px" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", opacity: 0.4, fontSize: "14px" }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search events, instructors…"
              style={{ width: "100%", padding: "9px 14px 9px 36px", borderRadius: "30px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,179,0,0.2)", color: "#FFE082", fontSize: "13px", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
        </div>
      </div>

      {/* Events list */}
      <div style={{ flex: 1, background: "linear-gradient(180deg, #0D0500 0%, #0A0300 100%)", padding: "36px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ color: "#5D3A1A", fontSize: "13px", marginBottom: "20px" }}>
            {filtered.length} {filtered.length === 1 ? "event" : "events"} found
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "40px", opacity: 0.4, marginBottom: "16px" }}>🎪</div>
              <p style={{ color: "#5D3A1A", fontSize: "15px" }}>No events match your search.</p>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filtered.map(event => {
              const daysLeft = getDaysLeft(event.date);
              const isRegistered = registered.includes(event.id);
              const isFull = event.seatsLeft === 0;
              const isUrgent = event.seatsLeft <= 5 && event.seatsLeft > 0;
              const cat = CATEGORY_COLORS[event.category];

              return (
                <div key={event.id} style={{
                  background: "linear-gradient(135deg, #1A0A00, #200D00)",
                  border: "1px solid rgba(255,179,0,0.15)",
                  borderRadius: "16px", padding: "24px",
                  display: "grid", gridTemplateColumns: "auto 1fr auto",
                  gap: "24px", alignItems: "start",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,179,0,0.3)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,107,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,179,0,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {/* Date block */}
                  <div style={{ textAlign: "center", minWidth: "64px", background: "rgba(255,179,0,0.06)", border: "1px solid rgba(255,179,0,0.15)", borderRadius: "12px", padding: "12px 10px" }}>
                    <div style={{ fontSize: "22px", fontWeight: 800, color: "#FFB300", lineHeight: 1 }}>
                      {new Date(event.date).getDate()}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9C7B52", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "2px" }}>
                      {new Date(event.date).toLocaleString("en-IN", { month: "short" })}
                    </div>
                    <div style={{ fontSize: "11px", color: "#5D3A1A", marginTop: "2px" }}>
                      {new Date(event.date).getFullYear()}
                    </div>
                  </div>

                  {/* Main info */}
                  <div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px", alignItems: "center" }}>
                      <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 500, background: cat.bg, border: `1px solid ${cat.border}`, color: cat.text }}>
                        {event.category}
                      </span>
                      {daysLeft <= 7 && daysLeft > 0 && (
                        <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 500, background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.4)", color: "#FF6B00" }}>
                          {daysLeft === 1 ? "Tomorrow!" : `${daysLeft} days left`}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#FFE082", marginBottom: "4px", lineHeight: 1.3 }}>
                      {event.title}
                    </h3>
                    <div style={{ fontSize: "13px", color: "#9C7B52", marginBottom: "10px" }}>
                      by {event.instructor}
                    </div>

                    <p style={{ fontSize: "13px", color: "#7A5C3A", lineHeight: 1.6, marginBottom: "12px" }}>
                      {event.description}
                    </p>

                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "13px", color: "#9C7B52", marginBottom: "12px" }}>
                      <span>🕐 {event.time}</span>
                      <span>📍 {event.venue}, {event.location}</span>
                      <span>💰 {event.fees}</span>
                    </div>

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {event.tags.map((tag, i) => {
                        const tc = TAG_COLORS[i % TAG_COLORS.length];
                        return (
                          <span key={tag} style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text }}>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: seats + register */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px", minWidth: "120px" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: isUrgent ? "#FF6B00" : isFull ? "#E57373" : "#4DB6AC" }}>
                        {isFull ? "Sold out" : isUrgent ? `Only ${event.seatsLeft} left!` : `${event.seatsLeft} seats left`}
                      </div>
                      <div style={{ fontSize: "11px", color: "#5D3A1A" }}>{event.seats} total</div>
                    </div>

                    <button
                      onClick={() => handleRegister(event.id)}
                      disabled={isFull || isRegistered}
                      style={{
                        padding: "9px 20px", borderRadius: "30px", fontSize: "13px", fontWeight: 500,
                        cursor: isFull || isRegistered ? "default" : "pointer",
                        fontFamily: "inherit", transition: "all 0.2s", border: "none",
                        background: isRegistered
                          ? "rgba(0,137,123,0.2)"
                          : isFull
                          ? "rgba(255,255,255,0.05)"
                          : "linear-gradient(135deg, #FF6B00, #C2185B)",
                        color: isRegistered ? "#4DB6AC" : isFull ? "#5D3A1A" : "#fff",
                        boxShadow: isRegistered || isFull ? "none" : "0 4px 16px rgba(255,107,0,0.3)",
                      }}
                    >
                      {isRegistered ? "✓ Registered" : isFull ? "Full" : "Register"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        input::placeholder { color: #5D3A1A; }
        input:focus { outline: none; border-color: rgba(255,107,0,0.6) !important; }
      `}</style>
    </div>
  );
}