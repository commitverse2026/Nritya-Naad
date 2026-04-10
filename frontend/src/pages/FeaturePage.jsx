import { useParams, Link } from "react-router-dom";
import features from "../data/features.json";
import Navbar from "../components/Navbar";
import UserStories from "../components/UserStories";
import DanceGallery from "../components/DanceGallery";
import AcademyListing from "../components/AcademyListing";
import CulturalChatbot from "../components/CulturalChatbot";
import ArtLineageMindMap from "../components/ArtLineageMindMap";

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
  const contentMaxWidth =
    id === "gallery" || id === "mindmap" || id === "map"
      ? "1200px"
      : id === "academy" || id === "chatbot"
        ? "900px"
        : "860px";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ padding: "48px 48px 80px", maxWidth: contentMaxWidth, margin: "0 auto", width: "100%" }}>

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
            ) : id === "mindmap" || id === "map" ? (
              <>
                A <strong style={{ color: theme.color, fontWeight: 500 }}>visual mind map</strong> of Indian classical art lineages — dance (SNA forms), Hindustani &amp; Carnatic music, and key śāstras &amp; pedagogy. Tap any node for details.
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
        ) : id === "mindmap" || id === "map" ? (
          <div style={{ marginTop: "8px", width: "100%" }}>
            <ArtLineageMindMap theme={theme} />
          </div>
        ) : id === "stories" ? (
          <div style={{ marginTop: "32px", width: "100%", display: "flex", justifyContent: "center" }}>
            <UserStories theme={theme} />
          </div>
        ) : (
          <div style={{
            borderRadius: "24px",
            padding: "60px 40px",
            border: `2px dashed ${theme.color}40`,
            background: theme.bg,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚀</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: theme.color,
              marginBottom: "10px",
            }}>
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
git%                                                                                                                       
mrunaldeosarkar@mrunals-MacBook-Air Nritya-Naad % git add .
mrunaldeosarkar@mrunals-MacBook-Air Nritya-Naad % git commit -m"f08:
dquote> git add .
dquote> git commit -m "f08"
dquote> 
mrunaldeosarkar@mrunals-MacBook-Air Nritya-Naad % git branch

  feat/event-lisiting
* feat/quiz-challenge-section
  master
mrunaldeosarkar@mrunals-MacBook-Air Nritya-Naad % danceImage: { width: '100%', height: '100%', objectFit: 'contain', display: 'block' },
mrunaldeosarkar@mrunals-MacBook-Air Nritya-Naad % git add .
mrunaldeosarkar@mrunals-MacBook-Air Nritya-Naad % git add .
mrunaldeosarkar@mrunals-MacBook-Air Nritya-Naad % git commit -m "feat: quiz/challenge section with interactive questions and scoring"
[feat/quiz-challenge-section 898e37e] feat: quiz/challenge section with interactive questions and scoring
 5 files changed, 353 insertions(+), 1 deletion(-)
 create mode 100644 frontend/src/assets/bhart.jpeg
 create mode 100644 frontend/src/assets/kathak-dance.png
 create mode 100644 frontend/src/assets/oddisi.jpeg
 create mode 100644 frontend/src/components/GuessDanceForm.jsx
mrunaldeosarkar@mrunals-MacBook-Air Nritya-Naad % git push --set-upstream origin feat/quiz-challenge-section
Enumerating objects: 19, done.
Counting objects:   5% (1/19Counting objects:  10% (2/19Counting objects:  15% (3/19Counting objects:  21% (4/19Counting objects:  26% (5/19Counting objects:  31% (6/19Counting objects:  36% (7/19Counting objects:  42% (8/19Counting objects:  47% (9/19Counting objects:  52% (10/1Counting objects:  57% (11/1Counting objects:  63% (12/1Counting objects:  68% (13/1Counting objects:  73% (14/1Counting objects:  78% (15/1Counting objects:  84% (16/1Counting objects:  89% (17/1Counting objects:  94% (18/1Counting objects: 100% (19/1Counting objects: 100% (19/19), done.
Delta compression using up to 8 threads
Compressing objects:   8% (1Compressing objects:  16% (2Compressing objects:  25% (3Compressing objects:  33% (4Compressing objects:  41% (5Compressing objects:  50% (6Compressing objects:  58% (7Compressing objects:  66% (8Compressing objects:  75% (9Compressing objects:  83% (1Compressing objects:  91% (1Compressing objects: 100% (1Compressing objects: 100% (12/12), done.
Writing objects:  83% (10/12Writing objects:  91% (11/12Writing objects: 100% (12/12Writing objects: 100% (12/12), 267.26 KiB | 987.00 KiB/s, done.
Total 12 (delta 4), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas:   remote: Resolving deltas:  2remote: Resolving deltas:  5remote: Resolving deltas:  7remote: Resolving deltas: 10remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
remote: 
remote: Create a pull request for 'feat/quiz-challenge-section' on GitHub by visiting:
remote:      https://github.com/team-fetch12/Nritya-Naad/pull/new/feat/quiz-challenge-section
remote: 
To github.com:team-fetch12/Nritya-Naad
 * [new branch]      feat/quiz-challenge-section -> feat/quiz-challenge-section
mrunaldeosarkar@mrunals-MacBook-Air Nritya-Naad % 
