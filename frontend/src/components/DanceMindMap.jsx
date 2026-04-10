import { useState } from "react";

const NODES = [
  {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    region: "Tamil Nadu",
    family: "South India",
    x: 18,
    y: 26,
    color: "#c2185b",
    summary: "Known for geometric lines, expressive abhinaya, and precise footwork.",
  },
  {
    id: "kathak",
    name: "Kathak",
    region: "Uttar Pradesh",
    family: "North India",
    x: 80,
    y: 22,
    color: "#3949ab",
    summary: "Storytelling tradition with spins, rhythmic footwork, and intricate bols.",
  },
  {
    id: "kuchipudi",
    name: "Kuchipudi",
    region: "Andhra Pradesh",
    family: "South India",
    x: 28,
    y: 64,
    color: "#ff6b00",
    summary: "Combines graceful movement, expressive drama, and a light theatrical energy.",
  },
  {
    id: "mohiniyattam",
    name: "Mohiniyattam",
    region: "Kerala",
    family: "South India",
    x: 15,
    y: 82,
    color: "#00897b",
    summary: "Gentle, swaying movement vocabulary rooted in lasya and fluidity.",
  },
  {
    id: "kathakali",
    name: "Kathakali",
    region: "Kerala",
    family: "South India",
    x: 42,
    y: 84,
    color: "#6d4c41",
    summary: "Dramatic dance-theatre with codified gestures, makeup, and heroic narratives.",
  },
  {
    id: "odissi",
    name: "Odissi",
    region: "Odisha",
    family: "East India",
    x: 61,
    y: 58,
    color: "#8e24aa",
    summary: "Sculptural tribhanga stance and lyrical movement inspired by temple traditions.",
  },
  {
    id: "manipuri",
    name: "Manipuri",
    region: "Manipur",
    family: "Northeast India",
    x: 88,
    y: 66,
    color: "#00838f",
    summary: "Soft, rounded motion often connected with devotional Vaishnav themes.",
  },
];

const CONNECTIONS = [
  ["bharatanatyam", "kuchipudi"],
  ["kuchipudi", "mohiniyattam"],
  ["mohiniyattam", "kathakali"],
  ["kuchipudi", "odissi"],
  ["odissi", "manipuri"],
  ["odissi", "kathak"],
  ["bharatanatyam", "odissi"],
];

export default function DanceMindMap() {
  const [activeNodeId, setActiveNodeId] = useState("bharatanatyam");
  const activeNode = NODES.find((node) => node.id === activeNodeId) || NODES[0];

  return (
    <section className="mindmap-tool">
      <div className="mindmap-tool__intro">
        <div>
          <p className="mindmap-tool__eyebrow">Interactive Atlas</p>
          <h2>Dance forms connected by region and style</h2>
          <p className="mindmap-tool__description">
            Explore how classical Indian dance traditions branch across the country. Tap a node to
            reveal its region and movement identity.
          </p>
        </div>

        <div className="mindmap-tool__legend">
          <span>Connected nodes highlight cultural relationships</span>
        </div>
      </div>

      <div className="mindmap-tool__layout">
        <div className="mindmap-canvas">
          <div className="mindmap-canvas__glow" />
          <svg
            className="mindmap-canvas__lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {CONNECTIONS.map(([fromId, toId]) => {
              const from = NODES.find((node) => node.id === fromId);
              const to = NODES.find((node) => node.id === toId);

              if (!from || !to) return null;

              const isActive = activeNodeId === fromId || activeNodeId === toId;

              return (
                <line
                  key={`${fromId}-${toId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={isActive ? "mindmap-canvas__line is-active" : "mindmap-canvas__line"}
                />
              );
            })}
          </svg>

          {NODES.map((node) => (
            <button
              key={node.id}
              type="button"
              className={`mindmap-node${activeNodeId === node.id ? " is-active" : ""}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                "--node-color": node.color,
              }}
              onClick={() => setActiveNodeId(node.id)}
            >
              <span className="mindmap-node__name">{node.name}</span>
              <span className="mindmap-node__region">{node.region}</span>
            </button>
          ))}
        </div>

        <aside className="mindmap-panel">
          <p className="mindmap-panel__label">Selected Dance Form</p>
          <h3>{activeNode.name}</h3>

          <div className="mindmap-panel__meta">
            <div>
              <span className="mindmap-panel__meta-title">Region</span>
              <strong>{activeNode.region}</strong>
            </div>
            <div>
              <span className="mindmap-panel__meta-title">Cluster</span>
              <strong>{activeNode.family}</strong>
            </div>
          </div>

          <p className="mindmap-panel__summary">{activeNode.summary}</p>

          <div className="mindmap-panel__chips">
            {CONNECTIONS.filter(([fromId, toId]) => fromId === activeNode.id || toId === activeNode.id).map(
              ([fromId, toId]) => {
                const connectedId = fromId === activeNode.id ? toId : fromId;
                const connectedNode = NODES.find((node) => node.id === connectedId);
                if (!connectedNode) return null;

                return (
                  <button
                    key={`${activeNode.id}-${connectedNode.id}`}
                    type="button"
                    className="mindmap-panel__chip"
                    onClick={() => setActiveNodeId(connectedNode.id)}
                  >
                    {connectedNode.name}
                  </button>
                );
              }
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
