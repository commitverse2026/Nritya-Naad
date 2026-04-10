import { useMemo, useState } from "react";
import data from "../data/lineageMindMap.json";

const BRANCH = {
  dance: "#E91E63",
  music: "#1E88E5",
  theory: "#43A047",
};

export default function ArtLineageMindMap({ theme }) {
  const [active, setActive] = useState(null);

  const detail = useMemo(() => {
    if (!active) return null;
    for (const p of data.pillars) {
      const n = p.nodes.find((x) => x.id === active);
      if (n) return { pillar: p, node: n };
    }
    return null;
  }, [active]);

  const leftNodes = data.pillars.find((p) => p.id === "dance")?.nodes || [];
  const rightTop = data.pillars.find((p) => p.id === "music")?.nodes || [];
  const rightBottom = data.pillars.find((p) => p.id === "theory")?.nodes || [];

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          borderRadius: "24px",
          border: `1.5px solid ${theme.color}25`,
          background: "linear-gradient(145deg, #fff, #fffaf6)",
          boxShadow: "0 8px 26px rgba(0,0,0,0.06)",
          padding: "18px",
          overflowX: "auto",
        }}
      >
        <div style={{ minWidth: "1020px", position: "relative", height: "640px" }}>
          <svg width="1020" height="640" viewBox="0 0 1020 640" style={{ position: "absolute", inset: 0 }}>
            <path d="M500 320 C390 255, 300 205, 180 170" stroke={BRANCH.dance} strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M500 320 C390 290, 300 285, 170 300" stroke={BRANCH.dance} strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M500 320 C390 350, 300 385, 185 455" stroke={BRANCH.dance} strokeWidth="8" fill="none" strokeLinecap="round" />

            <path d="M520 320 C640 245, 740 200, 855 170" stroke={BRANCH.music} strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M520 320 C640 275, 740 280, 860 305" stroke={BRANCH.music} strokeWidth="8" fill="none" strokeLinecap="round" />

            <path d="M520 320 C640 355, 750 390, 860 460" stroke={BRANCH.theory} strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M520 320 C620 395, 700 465, 780 535" stroke={BRANCH.theory} strokeWidth="8" fill="none" strokeLinecap="round" />
          </svg>

          <div style={centerStyle(theme)}>
            <div style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.7 }}>NrityaNaad</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "22px" }}>Mind Map</div>
            <div style={{ fontSize: "13px", marginTop: "2px" }}>Indian classical art lineages</div>
          </div>

          <div style={{ position: "absolute", left: "78px", top: "150px" }}>
            <BranchTitle text="Classical Dance" color={BRANCH.dance} />
            <NodeStack nodes={leftNodes} active={active} setActive={setActive} color={BRANCH.dance} />
          </div>

          <div style={{ position: "absolute", right: "58px", top: "135px" }}>
            <BranchTitle text="Classical Music" color={BRANCH.music} />
            <NodeStack nodes={rightTop} active={active} setActive={setActive} color={BRANCH.music} />
          </div>

          <div style={{ position: "absolute", right: "72px", top: "410px" }}>
            <BranchTitle text="Texts & Pedagogy" color={BRANCH.theory} />
            <NodeStack nodes={rightBottom} active={active} setActive={setActive} color={BRANCH.theory} />
          </div>
        </div>
      </div>

      {detail && (
        <div
          style={{
            marginTop: "18px",
            background: "#fff",
            borderRadius: "16px",
            border: `1.5px solid ${theme.color}30`,
            padding: "16px 18px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#8B6452", textTransform: "uppercase", letterSpacing: "0.06em" }}>{detail.pillar.title}</div>
          <div style={{ marginTop: "4px", fontFamily: "'Playfair Display', serif", color: theme.color, fontSize: "22px", fontWeight: 700 }}>
            {detail.node.label}
          </div>
          <p style={{ margin: "8px 0 0", color: "#5D3A1A", fontSize: "14px", lineHeight: 1.6 }}>{detail.node.hint}</p>
        </div>
      )}
    </div>
  );
}

function BranchTitle({ text, color }) {
  return (
    <div style={{ marginBottom: "8px", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "18px", color }}>
      {text}
    </div>
  );
}

function NodeStack({ nodes, active, setActive, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "220px" }}>
      {nodes.map((n) => {
        const on = active === n.id;
        return (
          <button
            key={n.id}
            type="button"
            onClick={() => setActive(on ? null : n.id)}
            style={{
              textAlign: "left",
              borderRadius: "11px",
              border: `1.5px solid ${on ? color : `${color}55`}`,
              background: on ? `${color}18` : "#fff",
              color: "#4B2A12",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              padding: "8px 10px",
              cursor: "pointer",
              fontWeight: on ? 600 : 500,
            }}
          >
            {n.label}
          </button>
        );
      })}
    </div>
  );
}

function centerStyle(theme) {
  return {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "260px",
    height: "126px",
    borderRadius: "14px",
    background: "#FFF59D",
    border: `2px solid ${theme.color}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#3A2300",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  };
}
