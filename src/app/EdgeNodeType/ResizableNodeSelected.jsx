// import { memo } from 'react';
// import { Handle, Position, NodeResizer } from '@xyflow/react';
 
// const ResizableNodeSelected = ({ data, selected }) => {
//   return (
//     <>
//       <NodeResizer
//         color="#8B4513"
//         isVisible={selected}
//         minWidth={100}
//         minHeight={30}
//       />
//        <Handle type="target" position={Position.Top} style={{  background: '#8B4513', // Color
//     width: '8px',      // Width (makes it thicker)
//     height: '8px',     // Height (makes it a larger circle)
//     border: '2px solid black', }}/>
//       <div style={{ padding: 10 }}>{data.label}</div>
//       <Handle type="source" position={Position.Bottom} style={{  background: '#8B4513', // Color
//     width: '8px',      // Width (makes it thicker)
//     height: '8px',     // Height (makes it a larger circle)
//     border: '2px solid black', }}/>
//       {/* <Handle type="source" position={Position.Right} id="right" style={{  background: 'blue', // Color
//     width: '8px',      // Width (makes it thicker)
//     height: '8px',     // Height (makes it a larger circle)
//     border: '2px solid black', }} /> */}
//     </>
//   );
// };
 
// export default memo(ResizableNodeSelected);



import { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

const ResizableNodeSelected = ({ data, selected }) => {
  return (
    <>
      <NodeResizer
        color="#8B4513" // Saddle Brown
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      {/* Target Handle (Top) */}
      <Handle
        type="target" // Target type so that other nodes can connect to it
        position={Position.Top} // Placed at the top
        style={{
          background: '#8B4513', // Color
          width: '12px', // Width (larger)
          height: '12px', // Height (larger)
          border: '3px solid #FFF8DC', // Light cream border
          borderRadius: '50%', // Circular shape
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)', // Soft shadow
        }}
      />

      {/* Label Area */}
      <div
        style={{
          padding: '12px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#3E2723', // Dark brown text color
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        {data.label}
      </div>

      {/* Source Handle (Bottom) */}
      <Handle
        type="source" // Source type so this will emit connections
        position={Position.Bottom} // Placed at the bottom
        style={{
          background: '#8B4513', // Color
          width: '12px', // Width (larger)
          height: '12px', // Height (larger)
          border: '3px solid #FFF8DC', // Light cream border
          borderRadius: '50%', // Circular shape
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)', // Soft shadow
        }}
      />
    </>
  );
};

export default memo(ResizableNodeSelected);
