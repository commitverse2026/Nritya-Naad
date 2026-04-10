import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

// Data mapping of Indian states to famous dance forms
const STATE_DANCES = {
  "Andhra Pradesh": { dance: "Kuchipudi", description: "Known for its fluid movements and dramatic storytelling." },
  "Assam": { dance: "Sattriya", description: "A tradition originating from the Vaishnavite monasteries." },
  "Bihar": { dance: "Bidesiya", description: "A popular folk dance dealing with social issues and migration." },
  "Gujarat": { dance: "Garba / Dandiya", description: "Vibrant folk dances traditionally performed during Navratri." },
  "Haryana": { dance: "Jhumar", description: "A lively traditional dance commonly performed by women." },
  "Himachal Pradesh": { dance: "Nati", description: "A picturesque folk dance celebrating local festivals and harvests." },
  "Karnataka": { dance: "Yakshagana", description: "A traditional theater form combining dance, music, and distinct costumes." },
  "Kerala": { dance: "Kathakali / Mohiniyattam", description: "Famous for elaborate makeup and graceful feminine movements." },
  "Madhya Pradesh": { dance: "Maanch", description: "A lyrical folk drama and dance native to the Malwa region." },
  "Maharashtra": { dance: "Lavani", description: "A high-energy traditional dance driven by the beats of the Dholki." },
  "Odisha": { dance: "Odissi", description: "A major ancient classical dance known for its lyrical grace and sculptural poses." },
  "Punjab": { dance: "Bhangra / Giddha", description: "Energetic and rhythmic celebrations of harvest and joy." },
  "Rajasthan": { dance: "Ghoomar", description: "A swirling, colorful folk dance historically performed by royalty." },
  "Tamil Nadu": { dance: "Bharatanatyam", description: "One of the oldest classical dance forms known for its geometric precision." },
  "Telangana": { dance: "Perini Sivatandavam", description: "An ancient warrior dance historically performed before battles." },
  "Uttar Pradesh": { dance: "Kathak", description: "A classical dance form rooted in storytelling and intricate footwork." },
  "West Bengal": { dance: "Chhau / Gaudiya Nritya", description: "Combining martial arts and classical traditions." },
  "Jammu and Kashmir": { dance: "Rouf", description: "A welcoming spring dance traditionally performed by women." },
  "Goa": { dance: "Fugdi", description: "A Goan folk dance performed during the Hindu festivals like Ganesh Chaturthi." },
  "Manipur": { dance: "Manipuri", description: "A gentle and graceful classical dance often depicting the Raslila." }
};

export default function IndiaMap({ theme }) {
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);

  const handleStateClick = (geo) => {
    // Topojson usually specifies the state name under properties.NAME_1 or simply id
    // We try multiple known property keys to ensure compatibility
    const stateName = geo.properties.NAME_1 || geo.properties.name || geo.id;
    if (stateName) {
      setSelectedState(stateName);
    }
  };

  const getDanceInfo = (stateName) => {
    if (!stateName) return null;
    return STATE_DANCES[stateName] || { 
      dance: "Traditional Folk/Classical", 
      description: "Explore the diverse cultural heritage of this region." 
    };
  };

  const info = getDanceInfo(selectedState);

  return (
    <div style={{ display: "flex", gap: "32px", width: "100%", alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center" }}>
      {/* Map Interactive Area */}
      <div style={{
        flex: "1 1 400px",
        background: "#fff",
        borderRadius: "24px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        border: `1.5px solid ${theme.color}30`,
        position: "relative"
      }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: theme.color, marginTop: 0, marginBottom: "16px", textAlign: "center" }}>
          Explore by Region
        </h3>
        
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 900,
            center: [80, 22] // Centered strictly on India coordinates
          }}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.NAME_1 || geo.properties.name || geo.id;
                const isSelected = selectedState === stateName;
                const isHovered = hoveredState === stateName;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleStateClick(geo)}
                    onMouseEnter={() => setHoveredState(stateName)}
                    onMouseLeave={() => setHoveredState(null)}
                    style={{
                      default: {
                        fill: isSelected ? theme.color : "#ECECEC",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.75,
                        outline: "none",
                        transition: "all 250ms"
                      },
                      hover: {
                        fill: theme.color,
                        opacity: 0.8,
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer",
                        transition: "all 250ms"
                      },
                      pressed: {
                        fill: theme.color,
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Dynamic Info Panel */}
      <div style={{
        flex: "0 1 300px",
        background: "#fff",
        borderRadius: "24px",
        padding: "32px 24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        border: `1.5px solid ${theme.color}30`,
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        {!selectedState ? (
          <div style={{ textAlign: "center", color: "#8B6452" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>🗺️</div>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: 500 }}>Select a state on the map to discover its traditional dance forms.</p>
          </div>
        ) : (
          <div style={{ textAlign: "left" }}>
            <span style={{ 
              background: theme.bg, 
              color: theme.color, 
              padding: "4px 12px", 
              borderRadius: "16px", 
              fontSize: "12px", 
              fontWeight: 600,
              display: "inline-block",
              marginBottom: "16px"
            }}>
              {selectedState}
            </span>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              color: "#4A2C1D", 
              fontSize: "26px", 
              margin: "0 0 12px 0",
              lineHeight: 1.2
            }}>
              {info.dance}
            </h2>
            <p style={{ 
              margin: 0, 
              color: "#5D3A1A", 
              fontSize: "15px", 
              lineHeight: 1.6 
            }}>
              {info.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
