import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi"; // İkonları eklemek için

const VisualNodePanel = ({ images, onDragStart }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Panelin açık/kapalı durumu

  return (
    <div
      className="mt-5"
      style={{
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "270px",
        transition: "all 0.3s ease-in-out",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div className="flex justify-between items-center">
        <h3
          style={{
            fontWeight: "700",
            fontSize: "1.4rem",
            textAlign: "center",
            marginBottom: "10px",
            marginLeft: "10px",
            color: "#333",
            fontFamily: "'Poppins', sans-serif",
          }}
          className="font-semibold"
        >
          Görseller
        </h3>
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="text-lg"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#668b8b",
            fontSize: "20px",
          }}
        >
          {isPanelOpen ? (
            <FiChevronUp style={{ fontSize: "20px", color: "#668b8b" }} />
          ) : (
            <FiChevronDown style={{ fontSize: "20px", color: "#668b8b" }} />
          )}
        </button>
      </div>
      {isPanelOpen && (
        <div
          style={{
            display: "flex", // Flex düzenini aktif et
            flexWrap: "wrap", // Görsellerin satırlara sığması için
            justifyContent: "center", // Yatayda ortala
            alignItems: "center", // Dikeyde ortala
            gap: "10px", // Görseller arasında boşluk ekle
            padding: "5px", // Panelin iç kenar boşluğu
          }}
        >
          {images.map((image) => (
            <div
              key={image.id}
              draggable
              onDragStart={(e) => onDragStart(e, image)}
              style={{
                margin: "0px",
                cursor: "grab",
                width: "70px",
                height: "70px",
                backgroundImage: `url(${image.src})`,
                backgroundSize: "cover",
                border: "1px solid #333",
                borderRadius: "4px", // Kenar yuvarlama
                position: "relative", // Konumlandırma için
              }}
            >
              <span
                style={{
                  color: "#fff",
                  textAlign: "center",
                  display: "block",
                  position: "absolute",
                  bottom: "5px", // Alt kısımda göster
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              ></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisualNodePanel;
