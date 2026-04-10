import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "../components/Navbar";

const REELS = [
  {
    id: 1,
    src: "https://cdn.coverr.co/videos/coverr-a-woman-dancing-in-a-studio-5652/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80",
    dancer: "Priya Sharma",
    style: "Bharatanatyam",
    location: "Chennai",
    caption: "The rhythm of the earth flows through every mudra — Navarasas in full bloom 🌺",
    likes: 4821,
    comments: 213,
  },
  {
    id: 2,
    src: "https://cdn.coverr.co/videos/coverr-woman-doing-yoga-stretches-1178/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&q=80",
    dancer: "Meera Nair",
    style: "Mohiniyattam",
    location: "Thiruvananthapuram",
    caption: "Like the sway of Kerala palms, Mohiniyattam is grace made visible 🌊",
    likes: 3390,
    comments: 178,
  },
  {
    id: 3,
    src: "https://cdn.coverr.co/videos/coverr-silhouette-of-a-woman-dancing-4913/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1518611507436-f9221403cca2?w=400&q=80",
    dancer: "Ananya Roy",
    style: "Kathak",
    location: "Varanasi",
    caption: "A thousand spins and each one a story — Kathak is poetry in motion ✨",
    likes: 6102,
    comments: 340,
  },
  {
    id: 4,
    src: "https://cdn.coverr.co/videos/coverr-a-woman-meditating-in-a-field-7414/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80",
    dancer: "Kavitha Reddy",
    style: "Kuchipudi",
    location: "Vijayawada",
    caption: "From Andhra sacred tradition — drama, devotion and dance as one 🎭",
    likes: 2940,
    comments: 97,
  },
  {
    id: 5,
    src: "https://cdn.coverr.co/videos/coverr-woman-dancing-in-autumn-leaves-7773/1080p.mp4",
    poster: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
    dancer: "Divya Pillai",
    style: "Odissi",
    location: "Bhubaneswar",
    caption: "Sculpted from temple walls — Odissi breathes life into stone 🪷",
    likes: 5213,
    comments: 261,
  },
];

function fmt(n) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
}

function ActionBtn(props) {
  const icon = props.icon;
  const label = props.label;
  const onClick = props.onClick;
  const glow = props.glow;
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={function() { setPressed(true); }}
      onMouseUp={function() { setPressed(false); }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3px",
        transform: pressed ? "scale(0.88)" : "scale(1)",
        transition: "transform 0.15s ease",
        filter: glow ? "drop-shadow(0 0 8px rgba(255,107,0,0.9))" : "none",
      }}
    >
      <span style={{ fontSize: "28px", lineHeight: 1 }}>{icon}</span>
      <span style={{
        color: "rgba(255,255,255,0.82)",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.3px",
        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
      }}>{label}</span>
    </button>
  );
}

function ReelCard(props) {
  const reel = props.reel;
  const isActive = props.isActive;
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(reel.likes);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(function() {
    var v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(function() {});
      setPaused(false);
    } else {
      v.pause();
      v.currentTime = 0;
      setProgress(0);
    }
  }, [isActive]);

  useEffect(function() {
    var v = videoRef.current;
    if (!v) return;
    function onTime() {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    }
    v.addEventListener("timeupdate", onTime);
    return function() { v.removeEventListener("timeupdate", onTime); };
  }, []);

  function togglePlay() {
    var v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); }
    else { v.pause(); setPaused(true); }
  }

  function handleDoubleTap() {
    if (!liked) {
      setLiked(true);
      setLikes(function(l) { return l + 1; });
    }
    setShowHeart(true);
    setTimeout(function() { setShowHeart(false); }, 900);
  }

  function toggleLike(e) {
    e.stopPropagation();
    setLiked(function(l) { return !l; });
    setLikes(function(l) { return liked ? l - 1 : l + 1; });
  }

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      background: "#0a0200",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        loop
        muted={muted}
        playsInline
        onClick={togglePlay}
        onDoubleClick={handleDoubleTap}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,2,0,0.92) 0%, rgba(10,2,0,0.3) 40%, rgba(10,2,0,0.05) 70%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "80px",
        background: "linear-gradient(to bottom, rgba(10,2,0,0.6), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", top: "20px", left: "20px",
        background: "linear-gradient(135deg, #FF6B00, #C2185B)",
        color: "#fff",
        fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px",
        textTransform: "uppercase",
        padding: "5px 14px", borderRadius: "20px",
        boxShadow: "0 2px 12px rgba(255,107,0,0.5)",
      }}>
        {reel.style}
      </div>

      {showHeart && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
          animation: "heartPop 0.9s ease forwards",
          fontSize: "90px",
        }}>❤️</div>
      )}

      {paused && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            width: "64px", height: "64px",
            background: "rgba(0,0,0,0.55)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(4px)",
            fontSize: "28px",
          }}>▶</div>
        </div>
      )}

      <div style={{
        position: "absolute", right: "16px", bottom: "100px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "22px",
      }}>
        <ActionBtn icon={liked ? "❤️" : "🤍"} label={fmt(likes)} onClick={toggleLike} glow={liked} />
        <ActionBtn icon="💬" label={fmt(reel.comments)} />
        <ActionBtn
          icon={muted ? "🔇" : "🔊"}
          label={muted ? "Muted" : "Sound"}
          onClick={function(e) { e.stopPropagation(); setMuted(function(m) { return !m; }); }}
        />
        <ActionBtn icon="↗️" label="Share" />
      </div>

      <div style={{
        position: "absolute", bottom: "20px", left: "16px", right: "80px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{
            width: "38px", height: "38px",
            background: "linear-gradient(135deg, #FF6B00, #C2185B)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
            border: "2px solid #FFB300",
            flexShrink: 0,
          }}>🎭</div>
          <div>
            <div style={{ color: "#FFE082", fontWeight: 700, fontSize: "14px", fontFamily: "'Playfair Display', serif" }}>
              {reel.dancer}
            </div>
            <div style={{ color: "rgba(255,224,130,0.6)", fontSize: "11px" }}>
              📍 {reel.location}
            </div>
          </div>
        </div>
        <p style={{
          color: "rgba(255,255,255,0.88)", fontSize: "13px",
          lineHeight: 1.5,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {reel.caption}
        </p>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "3px", background: "rgba(255,255,255,0.15)",
      }}>
        <div style={{
          height: "100%",
          width: progress + "%",
          background: "linear-gradient(90deg, #FF6B00, #FFB300)",
          transition: "width 0.1s linear",
        }} />
      </div>
    </div>
  );
}

export default function Reels() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(function() {
    var container = containerRef.current;
    if (!container) return;
    var observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            var idx = parseInt(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );
    var slides = container.querySelectorAll("[data-index]");
    slides.forEach(function(s) { observer.observe(s); });
    return function() { observer.disconnect(); };
  }, []);

  useEffect(function() {
    function onKey(e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        var dir = e.key === "ArrowDown" ? 1 : -1;
        var next = Math.max(0, Math.min(REELS.length - 1, activeIndex + dir));
        scrollTo(next);
      }
    }
    window.addEventListener("keydown", onKey);
    return function() { window.removeEventListener("keydown", onKey); };
  }, [activeIndex]);

  function scrollTo(idx) {
    var container = containerRef.current;
    if (!container) return;
    var slide = container.querySelector("[data-index=\"" + idx + "\"]");
    if (slide) slide.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <style>{"\
        @keyframes heartPop {\
          0%   { transform: scale(0); opacity: 0; }\
          30%  { transform: scale(1.3); opacity: 1; }\
          60%  { transform: scale(1); opacity: 1; }\
          100% { transform: scale(1.1); opacity: 0; }\
        }\
        .reel-snap-container::-webkit-scrollbar { display: none; }\
        .reel-snap-container { -ms-overflow-style: none; scrollbar-width: none; }\
      "}</style>

      <Navbar />

      <div style={{
        background: "#0a0200",
        minHeight: "calc(100vh - 68px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "24px 0",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          width: "60px",
          marginRight: "20px",
          position: "sticky",
          top: "50vh",
          transform: "translateY(-50%)",
          height: "0",
        }}>
          <div style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            color: "#FFB300",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            opacity: 0.7,
          }}>NrityaNaad Reels</div>
          <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, #FF6B00, transparent)" }} />
        </div>

        <div
          ref={containerRef}
          className="reel-snap-container"
          style={{
            width: "min(400px, 88vw)",
            height: "calc(100vh - 116px)",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
            borderRadius: "20px",
            boxShadow: "0 0 0 1.5px rgba(255,179,0,0.3), 0 24px 80px rgba(0,0,0,0.8), 0 0 60px rgba(255,107,0,0.12)",
          }}
        >
          {REELS.map(function(reel, i) {
            return (
              <div
                key={reel.id}
                data-index={i}
                style={{
                  width: "100%",
                  height: "100%",
                  scrollSnapAlign: "start",
                  flexShrink: 0,
                }}
              >
                <ReelCard reel={reel} isActive={activeIndex === i} />
              </div>
            );
          })}
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "20px",
          position: "sticky",
          top: "50vh",
          transform: "translateY(-50%)",
          height: "0",
        }}>
          {REELS.map(function(_, i) {
            return (
              <button
                key={i}
                onClick={function() { scrollTo(i); }}
                style={{
                  width: i === activeIndex ? "10px" : "6px",
                  height: i === activeIndex ? "28px" : "6px",
                  borderRadius: "10px",
                  background: i === activeIndex
                    ? "linear-gradient(180deg, #FF6B00, #FFB300)"
                    : "rgba(255,224,130,0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  boxShadow: i === activeIndex ? "0 0 10px rgba(255,107,0,0.7)" : "none",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}