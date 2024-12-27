import React, { useEffect } from "react";
import { FaSave, FaUpload } from "react-icons/fa";

interface SaveMindMapButtonProps {
  nodes: any[]; // Replace `any` with the actual type of your nodes
  edges: any[]; // Replace `any` with the actual type of your edges
  setNodes: React.Dispatch<React.SetStateAction<any[]>>; // Function to update nodes
  setEdges: React.Dispatch<React.SetStateAction<any[]>>; // Function to update edges
}
const id = 9;

const SaveMindMapButton: React.FC<SaveMindMapButtonProps> = ({
  nodes,
  edges,
  setNodes,
  setEdges,
}) => {
  // Sayfanın benzersiz ID'sini almak için

  const saveMindMap = () => {
    const mindMapData = { nodes, edges };
    localStorage.setItem(`mindMapData_${id}`, JSON.stringify(mindMapData));
    alert("Zihin haritası kaydedildi!");
  };

  const loadMindMap = () => {
    const savedMindMap = localStorage.getItem(`mindMapData_${id}`);
    if (savedMindMap) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedMindMap);
      setNodes(savedNodes);
      setEdges(savedEdges);
    } else {
      alert("Kaydedilmiş bir zihin haritası bulunamadı.");
    }
  };

  // Sayfa yüklendiğinde zihin haritasını otomatik yükle
  useEffect(() => {
    loadMindMap(id);
  }, []);

  return (
    <div>
      {/* Kaydet Butonu */}
      <button
        onClick={saveMindMap}
        title="Kaydet"
        className="p-2 rounded mr-2"
        style={{ position: "absolute", top: "32px", left: "100px" }}
      >
        <FaSave
          className="mr-2"
          style={{ color: "#668b8b", fontSize: "20px", padding: "0.05rem" }}
        />
      </button>

      {/* <button
        onClick={loadMindMap}
        title="Yükle"
        className="p-2 rounded"
        style={{ position: "absolute", top: "32px", left: "160px" }}
      >
        <FaUpload
          className="mr-2"
          style={{ color: "#668b8b", fontSize: "24px", padding: "0.1rem" }}
        />
      </button> */}
    </div>
  );
};

export default SaveMindMapButton;
