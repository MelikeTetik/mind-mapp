// import React, { useState, memo } from "react";
// import { Handle, Position } from "@xyflow/react";
// import EmojiPicker from "emoji-picker-react";

// function CustomNode({ data, id, selected, isConnectable }) {
//   const [selectedEmoji, setSelectedEmoji] = useState(data.emoji); // Initialize with data.emoji

//   // Emoji selection handler
//   const handleEmojiClick = (event, emojiObject) => {
//     setSelectedEmoji(emojiObject.emoji); // Update the selected emoji
//   };

//   // Update the parent node (ReactFlow) with the new emoji
//   const handleEmojiChange = (newEmoji) => {
//     data.emoji = newEmoji; // Update emoji in the node data
//   };
//   const DEFAULT_HANDLE_STYLE = {
//     width: 10,
//     height: 10,
//     bottom: -5,
//   };

//   return (
//     <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
//       <div className="flex">
//         <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
//           <span>{selectedEmoji}</span>
//         </div>
//         <div className="ml-2">
//           <div className="text-lg font-bold">{data.name}</div>
//           <div className="text-gray-500">{data.job}</div>
//         </div>
//       </div>

//       {/* Emoji Picker - Render when node is selected */}
//       {selected && (
//         <div className="mt-2">
//           <EmojiPicker
//             onEmojiClick={(event, emojiObject) => {
//               handleEmojiClick(event, emojiObject);
//               handleEmojiChange(emojiObject.emoji); // Propagate the change to the parent
//             }}
//           />
//         </div>
//       )}
//       <Handle
//         type="source"
//         id="red"
//         position={Position.Bottom}
//         style={{ ...DEFAULT_HANDLE_STYLE, left: "15%", background: "red" }}
//         onConnect={(params) => console.log("handle onConnect", params)}
//         isConnectable={isConnectable}
//       />

//       <Handle
//         type="source"
//         position={Position.Bottom}
//         id="blue"
//         style={{ ...DEFAULT_HANDLE_STYLE, left: "50%", background: "blue" }}
//         isConnectable={isConnectable}
//       />
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         id="orange"
//         style={{ ...DEFAULT_HANDLE_STYLE, left: "85%", background: "orange" }}
//         isConnectable={isConnectable}
//       />
//     </div>
//   );
// }

// export default memo(CustomNode);

// import React from "react";
// import { Handle, Position } from "@xyflow/react";

// const CustomNode = ({ data }) => {
//   return (
//     <div
//       style={{
//         padding: "10px",
//         border: "2px solid #0073ff",
//         borderRadius: "8px",
//         background: "#fff",
//         textAlign: "center",
//         position: "relative",
//       }}
//     >
//       {/* Handle - Top */}
//       <Handle
//         type="source"
//         position={Position.Top}
//         id="top"
//         style={{
//           background: "blue",
//           width: "10px",
//           height: "10px",
//           borderRadius: "50%",
//           top: "-5px",
//         }}
//       />

//       {/* Handle - Left */}
//       <Handle
//         type="source"
//         position={Position.Left}
//         id="left"
//         style={{
//           background: "green",
//           width: "10px",
//           height: "10px",
//           borderRadius: "50%",
//           left: "-5px",
//         }}
//       />

//       {/* Node Label */}
//       <div>{data.label}</div>

//       {/* Handle - Right */}
//       <Handle
//         type="source"
//         position={Position.Right}
//         id="right"
//         style={{
//           background: "orange",
//           width: "10px",
//           height: "10px",
//           borderRadius: "50%",
//           right: "-5px",
//         }}
//       />

//       {/* Handle - Bottom */}
//     </div>
//   );
// };

// export default CustomNode;
