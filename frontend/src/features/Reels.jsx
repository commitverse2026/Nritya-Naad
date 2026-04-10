import React, { useState, useEffect } from "react";

const reelsData = [
  {
    id: 1,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Bharatanatyam Performance",
  },
  {
    id: 2,
    video: "https://www.w3schools.com/html/movie.mp4",
    title: "Kathak Spins",
  },
];

const Reels = () => {
  const [likes, setLikes] = useState({});

  // Load likes from localStorage
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("reelLikes")) || {};
    setLikes(savedLikes);
  }, []);

  // Save likes
  useEffect(() => {
    localStorage.setItem("reelLikes", JSON.stringify(likes));
  }, [likes]);

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {reelsData.map((reel) => (
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

          {/* Like */}
          <button
            onClick={() => toggleLike(reel.id)}
            style={{
              position: "absolute",
              right: "20px",
              bottom: "80px",
              fontSize: "26px",
              background: "none",
              border: "none",
              color: likes[reel.id] ? "red" : "white",
              cursor: "pointer",
            }}
          >
            ❤️
          </button>
        </div>
      ))}
    </div>
  );
};

export default Reels;