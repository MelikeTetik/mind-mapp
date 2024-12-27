"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { AnimatedSVGEdge } from "@/app/EdgeNodeType/AnimatedSVGEdge";
import ResizableNodeSelected from "@/app/EdgeNodeType/ResizableNodeSelected";
import "react-resizable/css/styles.css"; // CSS for resizable nodes
import "@xyflow/react/dist/style.css";
import "@/app/index.css";
import ConnectionLine from "@/app/EdgeNodeType/ConnectionLine";
import ButtonEdge from "@/app/EdgeNodeType/ButtonEdge";
import { MdOutlineDownloadDone } from "react-icons/md";
import ThemeToggle from "@/app/components/ThemeToggle";
import SaveMindMapButton from "./SaveMindMap";
import MindMapActions from "@/app/components/Actions";
import SaveMindMapAsPngButton from "@/app/components/SaveMindMapAsPngButton";

const MindMapPage = () => {
  const initialNodes = [
    {
      id: "0",
      type: "ResizableNodeSelected",
      data: { label: "Dünya Gücü Osmanlı Devleti (1453-1600)" },
      position: { x: -100, y: -200 },
    },
    {
      id: "1",
      type: "ResizableNodeSelected",
      data: { label: "Fatih Sultan Mehmet (1451-1481)" },
      position: { x: -300, y: 0 },
    },
    {
      id: "2",
      type: "ResizableNodeSelected",
      data: { label: "II. Bayezid (1481-1512)" },
      position: { x: 100, y: 0 },
    },
  ];

  const initialEdges = [
    { id: "0->1", source: "0", target: "1" },
    { id: "0->2", source: "0", target: "2" },
  ];
  const nodeTypes = {
    ResizableNodeSelected,
  };

  const edgeTypes = {
    animatedSvg: AnimatedSVGEdge,
    buttonedge: ButtonEdge,
  };

  const getId = () => `node_${+new Date()}`;
  const nodeOrigin = [0.5, 0];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, getNode } = useReactFlow();
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  const [editingLabel, setEditingLabel] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<string>("none");
  const [nodeContent, setNodeContent] = useState<string>("");

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState.isValid) {
        const id = getId();
        const { clientX, clientY } =
          "changedTouches" in event ? event.changedTouches[0] : event;
        const newNode = {
          id,
          type: "ResizableNodeSelected",
          position: screenToFlowPosition({ x: clientX, y: clientY }),
          data: { label: ` ` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectionState.fromNode.id,
            target: id,
            type: "animatedSvg",
          })
        );
      }
    },
    [screenToFlowPosition]
  );

  const handleUpdateNodeLabel = () => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: editingLabel } }
          : node
      )
    );
    setEditingLabel("");
  };

  const handleUpdateNodeCategory = () => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              data: { ...node.data, category: editingCategory },
              style: {
                ...node.style,
                backgroundColor:
                  editingCategory === "none"
                    ? "#A52A2A"
                    : editingCategory === "ton1"
                    ? "#d2b48c"
                    : editingCategory === "ton2"
                    ? "#c8ad7f"
                    : editingCategory === "ton3"
                    ? "#a67b5b"
                    : editingCategory === "ton4"
                    ? "#daa520"
                    : editingCategory === "ton5"
                    ? "#f5deb3"
                    : editingCategory === "ton6"
                    ? "#6f4e37"
                    : editingCategory === "ton7"
                    ? "#986960"
                    : editingCategory === "ton8"
                    ? "#d2691e"
                    : editingCategory === "ton9"
                    ? "#e3a869"
                    : editingCategory === "ton10"
                    ? "#8b4513"
                    : "#A52A2A",
              },
            }
          : node
      )
    );
  };

  const handleUpdateNodeContent = () => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, content: nodeContent } }
          : node
      )
    );
    setNodeContent("");
  };

  const saveAsPng = () => {
    const element = document.getElementById("react-flow-wrapper");
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

  const [isPanelOpen, setIsPanelOpen] = useState(false); // Panelin açık/kapalı durumu

  const images2 = [
    { id: "image1", src: "/img1.jpeg", alt: "Image 1" },
    { id: "image2", src: "/img2.jpeg", alt: "Image 2" },
    { id: "image3", src: "/img3.jpg", alt: "Image 3" },
    { id: "image4", src: "/img4.jpeg", alt: "Image 4" },
    { id: "image5", src: "/img5.jpg", alt: "Image 5" },
    { id: "image6", src: "/img6.jpeg", alt: "Image 6" },
    { id: "image7", src: "/img7.jpeg", alt: "Image 7" },
    { id: "image8", src: "/img8.jpg", alt: "Image 8" },
    { id: "image9", src: "/img9.jpg", alt: "Image 9" },
    { id: "image10", src: "/img10.jpeg", alt: "Image 10" },
  ];
  const handleDragStart = (e, img) => {
    e.dataTransfer.setData("imageId", img.id);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const imageId = event.dataTransfer.getData("imageId");
    const droppedImage = images2.find((img) => img.id === imageId);

    const reactFlowBounds = document
      .getElementById("react-flow-wrapper")
      ?.getBoundingClientRect();

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `${droppedImage.id}-${Date.now()}`,
      type: "default",
      position,
      data: {
        label: (
          <img
            src={droppedImage.src}
            alt={droppedImage.alt}
            style={{ maxWidth: "100px" }}
          />
        ),
      },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div
      style={{
        color: "var(--foreground)",
        background: "var(--background)",
      }}
      className="h-screen p-8"
    >
      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Zihin Haritası</h1> */}
        <ThemeToggle />
      </div>
      <div className="mb-4">
        <SaveMindMapButton
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />

        <SaveMindMapAsPngButton targetId="react-flow-wrapper" />
        <div>
          <MindMapActions
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
          />

          <h1
            style={{
              position: "absolute",
              top: "690px",
              right: "1170px",
              color: "lightblue",
              fontStyle: "italic", // Yazıyı eğik yapar
              fontFamily: "'Georgia', serif", // Farklı bir yazı tipi
              fontWeight: "bold", // Kalın yazı stili
              fontSize: "12px", // Yazı boyutu
            }}
          >
            Bin atlı akınlarda çocuklar gibi şendik<br></br>
            Bin atlı o gün dev gibi bir orduyu yendik
          </h1>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: "80%",
            border: "1px solid #ccc",
            backgroundColor: "#e5e7eb",
            width: "74%",
          }}
          id="react-flow-wrapper"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            snapToGrid={true}
            onConnectEnd={onConnectEnd}
            connectionLineComponent={ConnectionLine}
            defaultEdgeOptions={{ type: "animatedSvg" }}
            fitView
            nodeOrigin={nodeOrigin}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            style={{ backgroundColor: "#F7F9FB" }}
            fitViewOptions={{ padding: 2 }}
            onNodeClick={(event, node) => {
              setSelectedNodeId(node.id);
              setEditingLabel(node.data.label);
              setEditingCategory(node.data.category);
              setNodeContent(node.data.content);
            }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <div
          className="mt-4"
          style={{
            marginTop: "5.5rem",
            position: "absolute",
            top: "0",
            right: "0",
            padding: "15px",
            marginRight: "30px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "300px",
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
                color: "#333",
                fontFamily: "'Poppins', sans-serif",
              }}
              className="font-semibold"
            >
              Düğüm Ayarları
            </h3>
            <button
              onClick={togglePanel}
              className="text-lg"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#668b8b",
                fontSize: "20px",
              }}
            >
              {isOpen ? (
                <FiChevronUp style={{ fontSize: "20px", color: "#668b8b" }} />
              ) : (
                <FiChevronDown style={{ fontSize: "20px", color: "#668b8b" }} />
              )}
            </button>
          </div>

          {isOpen && (
            <div>
              {/* Yeni Düğüm Adı */}
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "1rem",
                    color: "#555",
                    fontWeight: "500",
                  }}
                >
                  Yeni Düğüm Adı:
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editingLabel}
                    onChange={(e) => setEditingLabel(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mr-2"
                    style={{
                      fontSize: "1rem",
                      color: "#4B0082",
                      fontFamily: "'Arial', sans-serif",
                      backgroundColor: "#e5e7eb",
                    }}
                  />
                  <button
                    onClick={handleUpdateNodeLabel}
                    title="Güncelle"
                    className="p-2 text-white rounded"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #ccc",
                    }}
                  >
                    <MdOutlineDownloadDone
                      className="mr-2"
                      style={{ color: "#668b8b" }}
                    />
                  </button>
                </div>
              </div>

              {/* Renk Seçimi */}
              <div className="mb-4">
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "1rem",
                    color: "#555",
                    fontWeight: "500",
                  }}
                >
                  Renk:
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    value={editingCategory}
                    onChange={(e) => setEditingCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mr-2"
                    style={{
                      fontSize: "1rem",
                      fontFamily: "'Arial', sans-serif",
                      color: "#333",
                      backgroundColor: "#e5e7eb",
                    }}
                  >
                    <option value="none">Kahve</option>
                    <option value="ton1">Açık Kahve</option>
                    <option value="ton2">Orta Kahve</option>
                    <option value="ton3">Koyu Kahve</option>
                    <option value="ton4">Karamel</option>
                    <option value="ton5">Latte</option>
                    <option value="ton6">Espresso</option>
                    <option value="ton7">Kestane</option>
                    <option value="ton8">Tarçın</option>
                    <option value="ton9">Kum Kahvesi</option>
                    <option value="ton10">Toprak</option>
                  </select>
                  <div
                    className="w-8 h-8 rounded"
                    style={{
                      backgroundColor:
                        editingCategory === "none"
                          ? "#A52A2A"
                          : editingCategory === "ton1"
                          ? "#d2b48c"
                          : editingCategory === "ton2"
                          ? "#c8ad7f"
                          : editingCategory === "ton3"
                          ? "#a67b5b"
                          : editingCategory === "ton4"
                          ? "#daa520"
                          : editingCategory === "ton5"
                          ? "#f5deb3"
                          : editingCategory === "ton6"
                          ? "#6f4e37"
                          : editingCategory === "ton7"
                          ? "#986960"
                          : editingCategory === "ton8"
                          ? "#d2691e"
                          : editingCategory === "ton9"
                          ? "#e3a869"
                          : editingCategory === "ton10"
                          ? "#8b4513"
                          : "#ffffff",
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    onClick={handleUpdateNodeCategory}
                    title="Güncelle"
                    className="p-2 text-white rounded"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #ccc",
                    }}
                  >
                    <MdOutlineDownloadDone
                      className="mr-2"
                      style={{ color: "#668b8b" }}
                    />
                  </button>
                </div>
              </div>

              {/* Notlar */}
              <div>
                <label
                  className="block mb-2"
                  style={{
                    fontSize: "1rem",
                    color: "#555",
                    fontWeight: "500",
                  }}
                >
                  Notlar:
                </label>
                <div className="flex items-start mb-4">
                  <textarea
                    value={nodeContent}
                    onChange={(e) => setNodeContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mr-2"
                    style={{
                      flex: "1",
                      minHeight: "100px",
                      fontSize: "1rem",
                      fontFamily: "'Arial', sans-serif",
                      color: "#333",
                      backgroundColor: "#e5e7eb",
                    }}
                  ></textarea>
                  <button
                    onClick={handleUpdateNodeContent}
                    title="Güncelle"
                    className="p-2 text-white rounded"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #ccc",
                    }}
                  >
                    <MdOutlineDownloadDone
                      className="mr-2"
                      style={{ color: "#668b8b" }}
                    />
                  </button>
                </div>
                <div
                  className="mt-4"
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
                        <FiChevronUp
                          style={{ fontSize: "20px", color: "#668b8b" }}
                        />
                      ) : (
                        <FiChevronDown
                          style={{ fontSize: "20px", color: "#668b8b" }}
                        />
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
                        padding: "10px", // Panelin iç kenar boşluğu
                      }}
                    >
                      {images2.map((img) => (
                        <img
                          key={img.id}
                          src={img.src}
                          alt={img.alt}
                          draggable
                          onDragStart={(e) => handleDragStart(e, img)}
                          style={{
                            width: "60px",
                            marginBottom: "5px",

                            cursor: "grab",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
          
    </div>
  );
};
export default () => (
  <ReactFlowProvider>
    <MindMapPage />
  </ReactFlowProvider>
);
