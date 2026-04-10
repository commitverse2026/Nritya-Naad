
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MudraDetection from "../components/MudraDetection";
import UserStories from "../components/UserStories";
import Navbar from '../components/Navbar';
import features from '../data/features.json';
import IndiaMap from "../features/IndiaMap";
import Academy from "../features/Academy";

const FEATURE_THEMES = {
  mudra: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🤲" },
  gallery: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🖼️" },
  academy: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🏛️" },
  chatbot: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "💬" },
  stories: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "📖" },
  map: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🗺️" },
  upload: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎬" },
  danceform: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎵" },
  quiz: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "❓" },
  event: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "📅" },
  reels: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎞️" },
  mindmap: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🧠" },
  pitch: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🎙️" },
  karaoke: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🎤" },
  visualizer: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🌊" },
  swaras: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎶" },
};

const FEATURE_COMPONENTS = {
  map: IndiaMap,

// src/pages/FeaturePage.jsx
import { useParams, Link } from "react-router-dom";
import features from "../data/features.json";
import Navbar from "../components/Navbar";
import UserStories from "../components/UserStories";
import DanceGallery from "../components/DanceGallery";
import AcademyListing from "../components/AcademyListing";
import CulturalChatbot from "../components/CulturalChatbot";
import ArtLineageMindMap from "../components/ArtLineageMindMap";
import LearnSwarasTool from "../components/LearnSwarasTool";
import BeatVisualizer from "../components/BeatVisualizer";

const FEATURE_THEMES = {
  mudra: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "Mudra" },
  gallery: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "Gallery" },
  academy: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "Academy" },
  chatbot: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "Chat" },
  stories: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "Stories" },
  map: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "Map" },
  upload: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "Upload" },
  danceform: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "Dance" },
  quiz: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "Quiz" },
  event: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "Events" },
  reels: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "Reels" },
  mindmap: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "Mind Map" },
  pitch: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "Pitch" },
  karaoke: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "Karaoke" },
  visualizer: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "Visualizer" },
  swaras: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "Swaras" },
};

const FEATURE_COMPONENTS = {
  academy: Academy,

};

export default function FeaturePage() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);
  const theme = FEATURE_THEMES[id] || FEATURE_THEMES.mudra;
  const contentMaxWidth =
    id === "gallery" || id === "mindmap"
      ? "1200px"
      : id === "academy" || id === "chatbot"
        ? "900px"
        : "860px";
  const isSwaras = id === "swaras";
  const isVisualizer = id === "visualizer";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ padding: "48px 48px 80px", maxWidth: "860px", margin: "0 auto", width: "100%" }}>


        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px" }}>
          <Link to="/features" style={{ textDecoration: "none", fontSize: "13px", color: "#8B6452" }}>
            ← All Features

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px", flexWrap: "wrap" }}>
          <Link
            to="/features"
            style={{
              textDecoration: "none",
              fontSize: "13px",
              color: "#8B6452",
              transition: "color 0.2s",
            }}
          >
            Back to All Features

          </Link>
          <span style={{ color: "#cbb", fontSize: "13px" }}>/</span>
          <span style={{ fontSize: "13px", color: theme.color, fontWeight: 500 }}>
            {feature?.name}
          </span>
        </div>


        {/* Header */}
        <div style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "40px",
          border: "1.5px solid rgba(0,0,0,0.06)",
          marginBottom: "24px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "5px",
            background: theme.gradient,
            borderRadius: "24px 24px 0 0",
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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

        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "40px",
            border: "1.5px solid rgba(0,0,0,0.06)",
            marginBottom: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: theme.gradient,
              borderRadius: "24px 24px 0 0",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <div
              style={{
                minWidth: "68px",
                height: "68px",
                borderRadius: "18px",
                background: theme.bg,
                border: `2px solid ${theme.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                color: theme.color,
                fontWeight: 700,
                padding: "8px",
                textAlign: "center",
              }}
            >

              {theme.icon}
            </div>

            <div>

              <h1 style={{
                fontSize: "32px",
                fontWeight: 700,
                color: theme.color,
              }}>

              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "32px",
                  fontWeight: 700,
                  color: theme.color,
                  marginBottom: "4px",
                }}
              >

                {feature?.name}
              </h1>
              <p style={{ fontSize: "14px", color: "#8B6452" }}>NrityaNaad Feature Module</p>
            </div>
          </div>
        </div>

          <p style={{
            fontSize: "15px",
            color: "#5D3A1A",
            lineHeight: 1.7,
            fontWeight: 300,
          }}>
            {id === "gallery" ? (
              <>
                Curated imagery and short notes on the classical dance traditions of India — part of the{" "}
                <strong style={{ color: theme.color, fontWeight: 500 }}>{feature?.name}</strong> module in NrityaNaad.
              </>
            ) : id === "academy" ? (
              <>
                Discover dance and music <strong style={{ color: theme.color, fontWeight: 500 }}>academies</strong> — filter by city, call, or open maps.
              </>
            ) : id === "chatbot" ? (
              <>
                <strong style={{ color: theme.color, fontWeight: 500 }}>AI-powered</strong> cultural Q&A. Put{" "}
                <code style={{ fontSize: "13px", background: theme.bg, padding: "2px 6px", borderRadius: "6px" }}>GROQ_API_KEY</code>{" "}
                (free at console.groq.com) or <code style={{ fontSize: "13px", background: theme.bg, padding: "2px 6px", borderRadius: "6px" }}>OPENAI_API_KEY</code> /{" "}
                <code style={{ fontSize: "13px", background: theme.bg, padding: "2px 6px", borderRadius: "6px" }}>GEMINI_API_KEY</code> in <code style={{ fontSize: "13px", background: theme.bg, padding: "2px 6px", borderRadius: "6px" }}>backend/.env</code> — restart the server after saving.
              </>
            ) : id === "mindmap" ? (
              <>
                A <strong style={{ color: theme.color, fontWeight: 500 }}>visual map</strong> of classical dance forms, music systems, and foundational texts — tap nodes to explore lineage hints.
              </>
            ) : (
              <>
                This is your dedicated workspace for the <strong style={{ color: theme.color, fontWeight: 500 }}>{feature?.name}</strong> module.
                Build your feature UI and logic here, with full access to the NrityaNaad design system and theme.
              </>
            )}
          </p>
        </div>

        {/* Implementation area */}
        {id === "gallery" ? (
          <div style={{ marginTop: "8px", width: "100%" }}>
            <DanceGallery theme={theme} />
          </div>
        ) : id === "academy" ? (
          <div style={{ marginTop: "8px", width: "100%" }}>
            <AcademyListing theme={theme} />
          </div>
        ) : id === "chatbot" ? (
          <div style={{ marginTop: "8px", width: "100%" }}>
            <CulturalChatbot theme={theme} />
          </div>
        ) : id === "mindmap" ? (
          <div style={{ marginTop: "8px", width: "100%" }}>
            <ArtLineageMindMap theme={theme} />
          </div>
        ) : id === "stories" ? (
          <div style={{ marginTop: "32px", width: "100%", display: "flex", justifyContent: "center" }}>

        {/* Implementation */}
        <div style={{
          borderRadius: "24px",
          padding: "60px 40px",
          border: `2px dashed ${theme.color}40`,
          background: theme.bg,
          textAlign: "center",
        }}>
          {id === "mudra" ? (
            <MudraDetection />
          ) : (
            <>
              <div style={{ fontSize: "48px" }}>🚀</div>
              <h2>Implementation Area</h2>
            </>
          )}
        </div>

        {id === "stories" && (
          <div style={{ marginTop: "32px" }}>
            <UserStories theme={theme} />

          <p
            style={{
              fontSize: "15px",
              color: "#5D3A1A",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            This is your dedicated workspace for the{" "}
            <strong style={{ color: theme.color, fontWeight: 500 }}>{feature?.name}</strong> module.
            Build your feature UI and logic here, with full access to the NrityaNaad design system and theme.
          </p>
        </div>

        {isSwaras ? (
          <LearnSwarasTool />
        ) : isVisualizer ? (
          <BeatVisualizer />
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
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>Feature</div>
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
    </div>
  );
}