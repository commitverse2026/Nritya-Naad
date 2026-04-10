import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";
import FeaturePage from "./pages/FeaturePage";
import Quiz from "./pages/Quiz";
import Events from "./pages/Events";
import Reels from "./pages/Reels";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/feature/:id" element={<FeaturePage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/events" element={<Events />} />
        <Route path="/reels" element={<Reels />} />
      </Routes>
    </Router>
  );
}