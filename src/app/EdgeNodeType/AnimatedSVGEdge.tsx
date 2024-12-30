
import React from "react";
import { BaseEdge, EdgeProps } from "@xyflow/react";

export function AnimatedSVGEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  // Bézier eğrisi için kontrol noktaları
  const controlPointX1 = sourceX;
  const controlPointY1 = sourceY + 50;
  const controlPointX2 = targetX;
  const controlPointY2 = targetY - 50;

  const edgePath = `M${sourceX},${sourceY} C${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${targetX},${targetY}`;

  return (
    <>
      {/* Kenar için SVG Path */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke="url(#gradientEdge)" // Gradient kahverengi tonları
        strokeWidth={4} // Kenar kalınlığı
        markerEnd="url(#arrowhead)" // Ok işareti
      />

      {/* Animasyonlu Şekil */}
      <circle r="6" fill="url(#gradientCircle)">
        {" "}
        {/* Gradient dolgu */}
        <animateMotion
          dur="3s" // Animasyon süresi
          repeatCount="indefinite" // Sürekli tekrar
          keyPoints="0;1"
          keyTimes="0;1"
        >
          <mpath href={`#${id}`} /> {/* Hareket yolu kenara bağlandı */}
        </animateMotion>
      </circle>

      {/* Gradient ve Ok Tanımları */}
      <svg>
        <defs>
          {/* Gradient for Edge */}
          <linearGradient id="gradientEdge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6F4F1F" /> {/* Kahverengi */}
            <stop offset="100%" stopColor="#8B4513" /> {/* Koyu kahverengi */}
          </linearGradient>

          {/* Gradient for Animated Circle */}
          <radialGradient id="gradientCircle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D2B48C" /> {/* Açık kahverengi */}
            <stop offset="100%" stopColor="#8B4513" /> {/* Koyu kahverengi */}
          </radialGradient>

          {/* Ok işareti tanımı */}
          <marker
            id="arrowhead"
            markerWidth="8" // Ok daha küçük yapıldı
            markerHeight="6"
            refX="6" // Ok işareti daha küçük olduğu için refX değerini ayarladık
            refY="3" // Aynı şekilde refY değerini de küçülttük
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#6F4F1F" />{" "}
            {/* Kahverengi ok */}
          </marker>
        </defs>
      </svg>
    </>
  );
}
