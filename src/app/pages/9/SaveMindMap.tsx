import React, { useEffect } from "react";
import { FaSave, FaUpload } from "react-icons/fa";

interface Node {
  id: string;
  data: {
    label: string;
    src?: string; // Resim yolu
  };
  position: {
    x: number;
    y: number;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface SaveMindMapButtonProps {
  nodes: Node[]; // Düğüm tipleri
  edges: Edge[]; // Kenar tipleri
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>; // Düğüm güncelleme fonksiyonu
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>; // Kenar güncelleme fonksiyonu
}

const id = 9; // Sayfanın benzersiz ID'si

const SaveMindMapButton: React.FC<SaveMindMapButtonProps> = ({
  nodes,
  edges,
  setNodes,
  setEdges,
}) => {
  const encodeImageToBase64 = async (src: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Resim dönüştürme hatası:", error);
      return src; // Hata durumunda orijinal yolu döndür
    }
  };

  const saveMindMap = async () => {
    const nodesWithBase64 = await Promise.all(
      nodes.map(async (node) => {
        if (node.data.src) {
          const base64 = await encodeImageToBase64(node.data.src);
          return {
            ...node,
            data: { ...node.data, src: base64 },
          };
        }
        return node;
      })
    );

    const mindMapData = { nodes: nodesWithBase64, edges };
    localStorage.setItem(`mindMapData_${id}`, JSON.stringify(mindMapData));
    alert("Zihin haritası kaydedildi!");
  };

  const loadMindMap = () => {
    const savedMindMap = localStorage.getItem(`mindMapData_${id}`);
    if (savedMindMap) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedMindMap);

      const updatedNodes = savedNodes.map((node: Node) => ({
        ...node,
        data: {
          ...node.data,
          src: typeof node.data.src === "string" ? node.data.src : "",
        },
      }));

      setNodes(updatedNodes);
      setEdges(savedEdges);
      alert("Zihin haritası yüklendi!");
    } else {
      alert("Kaydedilmiş bir zihin haritası bulunamadı.");
    }
  };

  useEffect(() => {
    loadMindMap();
  }, []);

  return (
    <div>
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

      <button
        onClick={loadMindMap}
        title="Yükle"
        className="p-2 rounded"
        style={{ position: "absolute", top: "32px", left: "160px" }}
      >
        <FaUpload
          className="mr-2"
          style={{ color: "#668b8b", fontSize: "20px", padding: "0.05rem" }}
        />
      </button>
    </div>
  );
};

export default SaveMindMapButton;
