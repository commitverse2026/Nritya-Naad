# 🪷 NrityaNaad

> A vibrant digital platform celebrating the living tradition of **Indian classical dance & music**.

---

## ✨ Overview

**NrityaNaad** (नृत्यनाद) is a React-based web application that brings together 16 interactive modules exploring Indian dance forms, ragas, music theory, and cultural storytelling — all wrapped in a jewel-tone, mandala-inspired design system.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router DOM v6 |
| Styling | Inline styles + CSS variables |
| Fonts | Playfair Display · DM Sans (Google Fonts) |
| Data | `features.json` (static) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Sticky top nav with active link highlighting
│   └── FeatureCard.jsx   # Themed card for each feature module
├── pages/
│   ├── Home.jsx          # Hero landing page
│   ├── Features.jsx      # 4-column feature grid
│   └── FeaturePage.jsx   # Individual feature workspace
├── data/
│   └── features.json     # 16 feature module definitions
├── App.jsx               # Route declarations
├── App.css               # Global theme + background pattern
├── index.css             # Base reset + typography
└── main.jsx              # React root entry point
```

---

## 🎨 Design System

The UI uses a 4-color jewel palette rotating across all 16 feature modules:

| Color | Hex | Usage |
|---|---|---|
| 🔴 Deep Magenta | `#C2185B` | Mudra, Stories, Quiz, Pitch |
| 🟠 Saffron | `#FF6B00` | Chatbot, Raga, Mind Map, Swaras |
| 🟢 Peacock Teal | `#00897B` | Gallery, Map, Event, Karaoke |
| 🔵 Indigo | `#3949AB` | Academy, Upload, Reels, Visualizer |

**Typography:**
- Headings — `Playfair Display` (serif, editorial)
- Body — `DM Sans` (clean, lightweight)

---

## 🧩 Features

| ID | Module | Description |
|---|---|---|
| `mudra` | Mudra Detection | Recognise hand gestures using computer vision |
| `gallery` | Dance Gallery | Browse classical dance form imagery |
| `academy` | Academy Listing | Discover dance & music academies near you |
| `chatbot` | Chatbot | AI-powered cultural Q&A assistant |
| `stories` | User Stories | Community stories from artists & learners |
| `map` | India Map | Explore regional dance traditions on a map |
| `upload` | Upload Performance | Share your dance/music performance |
| `raga` | Raga Explorer | Discover ragas by time, season, and mood |
| `quiz` | Quiz | Test your knowledge of Indian classical arts |
| `event` | Event Listing | Find upcoming concerts and workshops |
| `reels` | Reels | Short-form video feed for performances |
| `mindmap` | Mind Map | Visual map of Indian classical art lineages |
| `pitch` | Voice Pitch | Analyse your singing pitch in real time |
| `karaoke` | Karaoke | Sing along to classical compositions |
| `visualizer` | Beat Visualizer | See your tabla/mridangam beats visualised |
| `swaras` | Learn Swaras | Interactive swara (note) learning tool |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nritya-naad.git
cd nritya-naad

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at **`http://localhost:5173`**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗺️ Routes

| Path | Page |
|---|---|
| `/` | Home — hero landing page |
| `/features` | Features — all 16 module cards |
| `/feature/:id` | Feature — individual module workspace |

---

## 🛠️ Adding a New Feature

1. Add an entry to `src/data/features.json`:
   ```json
   { "id": "yourfeature", "name": "Your Feature Name" }
   ```

2. Add a theme entry in both `FeatureCard.jsx` and `FeaturePage.jsx`:
   ```js
   yourfeature: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", icon: "🎯" }
   ```

3. Build your UI inside the **Implementation Area** in `FeaturePage.jsx` — or create a dedicated component and import it conditionally by `id`.

---

## 📄 License

MIT © NrityaNaad — Built with ❤️ for Indian classical arts