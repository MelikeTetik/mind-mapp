import React, { useState } from "react";
import { FcDeleteRow } from "react-icons/fc";
import { RiArrowGoBackLine } from "react-icons/ri";
import { RiArrowGoForwardLine } from "react-icons/ri";

interface MindMapActionsProps {
  nodes: any[]; // Düğümler
  setNodes: React.Dispatch<React.SetStateAction<any[]>>; // Düğümleri güncelleme
  edges: any[]; // Kenarlar
  setEdges: React.Dispatch<React.SetStateAction<any[]>>; // Kenarları güncelleme
  selectedNodeId: string | null; // Seçilen düğüm ID'si
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>; // Seçilen düğüm ID'sini güncelleme
}

const MindMapActions: React.FC<MindMapActionsProps> = ({
  nodes,
  setNodes,
  edges,
  setEdges,
  selectedNodeId,
  setSelectedNodeId,
}) => {
  const [deletedNodes, setDeletedNodes] = useState<any[]>([]); // Silinen düğümler
  const [deletedEdges, setDeletedEdges] = useState<any[]>([]); // Silinen kenarlar
  const [redoNodes, setRedoNodes] = useState<any[]>([]); // İleri alınacak düğümler
  const [redoEdges, setRedoEdges] = useState<any[]>([]); // İleri alınacak kenarlar

  // Düğüm silme işlemi
  const handleDeleteNode = () => {
    if (!selectedNodeId) return alert("Lütfen bir düğüm seçin.");

    const deletedNode = nodes.find((node) => node.id === selectedNodeId);
    const relatedEdges = edges.filter(
      (edge) => edge.source === selectedNodeId || edge.target === selectedNodeId
    );

    setDeletedNodes((prev) => [...prev, deletedNode]);
    setDeletedEdges((prev) => [...prev, ...relatedEdges]);

    setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          edge.source !== selectedNodeId && edge.target !== selectedNodeId
      )
    );
    setSelectedNodeId(null);
  };

  // Geri alma işlemi
  const handleUndoDelete = () => {
    if (deletedNodes.length === 0) return alert("Geri alınacak bir işlem yok.");

    const lastDeletedNode = deletedNodes[deletedNodes.length - 1];
    const relatedEdges = deletedEdges.filter(
      (edge) =>
        edge.source === lastDeletedNode.id || edge.target === lastDeletedNode.id
    );

    setNodes((prev) => [...prev, lastDeletedNode]);
    setEdges((prev) => [...prev, ...relatedEdges]);

    setRedoNodes((prev) => [...prev, lastDeletedNode]);
    setRedoEdges((prev) => [...prev, ...relatedEdges]);

    setDeletedNodes((prev) => prev.slice(0, -1));
    setDeletedEdges((prev) =>
      prev.filter(
        (edge) =>
          edge.source !== lastDeletedNode.id &&
          edge.target !== lastDeletedNode.id
      )
    );
  };

  // İleri alma işlemi
  const handleRedoDelete = () => {
    if (redoNodes.length === 0) return alert("İleri alınacak bir işlem yok.");

    const lastRedoNode = redoNodes[redoNodes.length - 1];
    const relatedRedoEdges = redoEdges.filter(
      (edge) =>
        edge.source === lastRedoNode.id || edge.target === lastRedoNode.id
    );

    setNodes((prev) => prev.filter((node) => node.id !== lastRedoNode.id));
    setEdges((prev) =>
      prev.filter(
        (edge) =>
          edge.source !== lastRedoNode.id && edge.target !== lastRedoNode.id
      )
    );

    setDeletedNodes((prev) => [...prev, lastRedoNode]);
    setDeletedEdges((prev) => [...prev, ...relatedRedoEdges]);

    setRedoNodes((prev) => prev.slice(0, -1));
    setRedoEdges((prev) =>
      prev.filter(
        (edge) =>
          edge.source !== lastRedoNode.id && edge.target !== lastRedoNode.id
      )
    );
  };

  return (
    <div>
      <button
        onClick={handleDeleteNode}
        style={{ position: "absolute", top: "32px", left: "220px" }}
      >
        <FcDeleteRow
          className="p-2"
          style={{
            color: "#668b8b",
            fontSize: "24px",
            padding: "0.05rem",
          }}
        />
      </button>
      <button
        onClick={handleUndoDelete}
        style={{ position: "absolute", top: "32px", left: "275px" }}
      >
        <RiArrowGoBackLine
          className="p-2"
          style={{
            color: "#668b8b",
            fontSize: "24px",
            padding: "0.05rem",
          }}
        />
      </button>
      <button
        onClick={handleRedoDelete}
        style={{ position: "absolute", top: "32px", left: "315px" }}
      >
        <RiArrowGoForwardLine
          className="p-2"
          style={{
            color: "#668b8b",
            fontSize: "24px",
            padding: "0.05rem",
          }}
        />
      </button>
    </div>
  );
};

export default MindMapActions;
