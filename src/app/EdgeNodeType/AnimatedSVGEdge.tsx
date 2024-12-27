// import React from 'react';
// import { BaseEdge, Position, type EdgeProps } from '@xyflow/react';

// export function AnimatedSVGEdgee({
//   id,
//   sourceX,
//   sourceY,
//   targetX,
//   targetY,
//   sourcePosition,
//   targetPosition,
// }: EdgeProps) {
//   // Ensure edges connect from Top (source) to Bottom (target)
//   const verticalSpacing = Math.abs(targetY - sourceY) / 2; // Halfway point for control

//   let controlPointX1 = sourceX;
//   let controlPointY1 = sourceY + (sourcePosition === Position.Bottom ? verticalSpacing : -verticalSpacing);

//   let controlPointX2 = targetX;
//   let controlPointY2 = targetY + (targetPosition === Position.Top ? -verticalSpacing : verticalSpacing);

//   // Edge Path using cubic Bézier curve
//   const edgePath = `M${sourceX},${sourceY} C${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${targetX},${targetY}`;

//   return (
//     <>
//       {/* Edge Path */}
//       <BaseEdge id={id} path={edgePath} />

//       {/* Moving Circle Animation */}
//       <circle r="7" fill="#8FBC8F">
//         <animateMotion dur="2s" repeatCount="indefinite">
//           <mpath href={`#${id}`} />
//         </animateMotion>
//       </circle>
//     </>
//   );
// }

// import React from 'react';
// import { BaseEdge, EdgeProps } from '@xyflow/react';

// export function AnimatedSVGEdge({
//   id,
//   sourceX,
//   sourceY,
//   targetX,
//   targetY,
//   sourcePosition,
//   targetPosition,
// }: EdgeProps) {
//   // Bézier curve control points
//   const controlPointX1 = sourceX;
//   const controlPointY1 = sourceY + 50; // Adjusted for a smoother curve
//   const controlPointX2 = targetX;
//   const controlPointY2 = targetY - 50;

//   const edgePath = `M${sourceX},${sourceY} C${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${targetX},${targetY}`;

//   return (
//     <>
//       {/* SVG Path for Edge with Thickness */}
//       <path
//         id={id}
//         d={edgePath}
//         fill="none"

//         stroke="#B8860B" // Color
//         strokeWidth={4}  // Thickness
//         markerEnd="url(#arrowhead)" // Optional arrowhead//#708090
//        />

//       {/* Animated Circle */}
//       <circle r="4" fill="#F0F8FF">
//         <animateMotion
//           dur="2s"
//           repeatCount="indefinite"
//           keyPoints="0;1"
//           keyTimes="0;1"
//         >
//           <mpath href={`#${id}`} />
//         </animateMotion>
//       </circle>
//     </>
//   );
// }

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
