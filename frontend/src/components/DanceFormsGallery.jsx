import { useState } from "react";
import danceForms from "../data/danceForms.json";

export default function DanceFormsGallery() {
  const [selectedDance, setSelectedDance] = useState(null);

  const closeModal = () => {
    setSelectedDance(null);
  };

  return (
    <div>
      {/* Gallery Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
        marginBottom: "32px",
      }}>
        {danceForms.map((dance) => (
          <div
            key={dance.id}
            onClick={() => setSelectedDance(dance)}
            style={{
              cursor: "pointer",
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1.5px solid rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              transform: "translateY(0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{
              height: "200px",
              overflow: "hidden",
              position: "relative",
            }}>
              <img
                src={dance.image}
                alt={dance.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                padding: "16px",
              }}>
                <h3 style={{
                  color: "#fff",
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 600,
                }}>
                  {dance.name}
                </h3>
              </div>
            </div>
            <div style={{
              padding: "16px",
            }}>
              <p style={{
                margin: 0,
                color: "#8B6452",
                fontSize: "14px",
                fontWeight: 500,
              }}>
                {dance.origin}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDance && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(0,0,0,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#333",
                transition: "background 0.2s",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.1)";
              }}
            >
              ×
            </button>

            {/* Image */}
            <div style={{
              height: "300px",
              overflow: "hidden",
              borderRadius: "24px 24px 0 0",
            }}>
              <img
                src={selectedDance.image}
                alt={selectedDance.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Content */}
            <div style={{
              padding: "32px",
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                fontWeight: 700,
                color: "#C2185B",
                margin: "0 0 8px 0",
              }}>
                {selectedDance.name}
              </h2>
              
              <p style={{
                fontSize: "16px",
                color: "#FF6B00",
                fontWeight: 500,
                margin: "0 0 20px 0",
              }}>
                Origin: {selectedDance.origin}
              </p>

              <p style={{
                fontSize: "16px",
                color: "#5D3A1A",
                lineHeight: 1.7,
                margin: 0,
              }}>
                {selectedDance.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
