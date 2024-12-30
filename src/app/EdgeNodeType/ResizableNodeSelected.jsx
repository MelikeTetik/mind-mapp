
//@xyflow/react kütüphanesini kullanarak bir yeniden boyutlandırılabilir düğüm (node) tasarımı sunar. Bileşen, düğümün etkileşime girebilmesi ve bağlanabilmesi için gerekli olan görsel bileşenleri içerir.
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
                {data.imageSrc && <img src={data.imageSrc} alt={data.label} style={{ maxWidth: '120px' }} />}
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3E2723' }}>
        {data.label}
      </div>
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
