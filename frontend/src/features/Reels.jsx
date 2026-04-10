import React, { useState, useEffect } from "react";

const reelsData = [
  {
    id: 1,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Bharatanatyam Performance",
    initialLikes: 12,
  },
  {
    id: 2,
    video: "https://www.w3schools.com/html/movie.mp4",
    title: "Kathak Spins",
    initialLikes: 8,
  },
];

const Reels = () => {
  const [likes, setLikes] = useState({});

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reelLikes")) || {};
    setLikes(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("reelLikes", JSON.stringify(likes));
  }, [likes]);

  const toggleLike = (id, initialLikes) => {
    setLikes((prev) => {
      const current = prev[id] || {
        count: initialLikes,
        liked: false,
      };

      return {
        ...prev,
        [id]: {
          liked: !current.liked,
          count: current.liked
            ? current.count - 1
            : current.count + 1,
        },
      };
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {reelsData.map((reel) => {
        const data = likes[reel.id] || {
          liked: false,
          count: reel.initialLikes,
        };

        return (
          <div
            key={reel.id}
            style={{
              height: "100vh",
              scrollSnapAlign: "start",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "black",
            }}
          >
            <video
              src={reel.video}
              autoPlay
              loop
              controls
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />

            {/* Title */}
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                left: "20px",
                color: "white",
              }}
            >
              <h3>{reel.title}</h3>
            </div>

            {/* Like Button */}
            <button
              onClick={() => toggleLike(reel.id, reel.initialLikes)}
              style={{
                position: "absolute",
                right: "20px",
                bottom: "80px",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                borderRadius: "30px",
                padding: "8px 12px",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "20px" }}>
                {data.liked ? "❤️" : "🤍"}
              </span>

              <span style={{ fontSize: "14px" }}>
                {data.count}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Reels;