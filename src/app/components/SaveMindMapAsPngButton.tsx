import React from "react";
import { FaFileImage } from "react-icons/fa";

interface SaveMindMapAsPngButtonProps {
  targetId: string;
}

const SaveMindMapAsPngButton: React.FC<SaveMindMapAsPngButtonProps> = ({
  targetId,
}) => {
  const saveAsPng = () => {
    const element = document.getElementById(targetId);
    if (element) {
      import("html-to-image").then((htmlToImage) => {
        htmlToImage.toPng(element).then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "mind-map.png";
          link.click();
        });
      });
    } else {
      alert("Target element bulunamadı!");
    }
  };

  return (
    <button
      onClick={saveAsPng}
      title="PNG Olarak Kaydet"
      className="p-2 rounded"
      style={{ position: "absolute", top: "32px", left: "160px" }}
    >
      <FaFileImage
        style={{ color: "#668b8b", fontSize: "20px", padding: "0.05rem" }}
      />
    </button>
  );
};

export default SaveMindMapAsPngButton;
