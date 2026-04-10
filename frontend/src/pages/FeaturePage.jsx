return (
  <div
    style={{
      minHeight: "100vh",
      padding: "24px",
      background: theme.bg
    }}
  >
    {/* 🔙 Back Button */}
    <button
      onClick={() => navigate("/")}
      style={{
        marginBottom: "16px",
        padding: "8px 12px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      ← Back
    </button>

    {/* 🧾 Header */}
    <div
      style={{
        background: theme.gradient,
        padding: "20px",
        borderRadius: "12px",
        color: "white",
        marginBottom: "20px"
      }}
    >
      <h1>
        {theme.icon} {feature.name}
      </h1>
    </div>

    {/* 🚀 Feature Implementation Area */}
    {id === "gallery" ? (
      <DanceGallery theme={theme} />

    ) : id === "academy" ? (
      <AcademyListing theme={theme} />

    ) : id === "chatbot" ? (
      <CulturalChatbot theme={theme} />

    ) : id === "mindmap" || id === "map" ? (
      <ArtLineageMindMap theme={theme} />

    ) : id === "pitch" ? (
      <div style={{ marginTop: "8px", width: "100%" }}>
        <PitchDetector />
      </div>

    ) : id === "stories" ? (
      <div
        style={{
          marginTop: "32px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UserStories theme={theme} />
      </div>

    ) : (
      <div
        style={{
          borderRadius: "24px",
          padding: "60px 40px",
          border: `2px dashed ${theme.color}40`,
          background: theme.bg,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚀</div>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: 700,
            color: theme.color,
            marginBottom: "10px",
          }}
        >
          Implementation Area
        </h2>

        <p style={{ fontSize: "14px", color: "#8B6452", fontWeight: 300 }}>
          Drop your feature components and logic right here
        </p>
      </div>
    )}
  </div>
);