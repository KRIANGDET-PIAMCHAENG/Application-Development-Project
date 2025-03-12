import React, { useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [];

let id = 3;
const getId = () => `${id++}`;

function SchedulingPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // เมื่อมีการเชื่อมต่อระหว่าง node
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // ป้องกันค่าเริ่มต้นของ event เมื่อมีการลาก
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // เมื่อมีการปล่อย node ลงในพื้นที่ React Flow
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      // หมุน node 90 องศา (สลับตำแหน่ง x กับ y)
      const rotatedPosition = {
        x: position.y,
        y: position.x,
      };

      const newNode = {
        id: getId(),
        type,
        position: rotatedPosition, // ใช้ตำแหน่งที่ถูกหมุนแล้ว
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // เมื่อคลิกที่ edge จะทำให้ edge นั้นเปลี่ยนเป็นเส้นแบบ smoothstep และปรับสไตล์ให้สวยงาม
  const onEdgeClick = useCallback(
    (event, edge) => {
      event.stopPropagation();
      console.log('Edge clicked:', edge);
      setEdges((eds) =>
        eds.map((e) =>
          e.id === edge.id
            ? {
                ...e,
                type: 'smoothstep', // เปลี่ยนเป็นเส้นแบบ smoothstep
                style: {
                  ...e.style,
                  stroke: '#1890ff', // เปลี่ยนสีให้ดูนุ่มนวล
                  strokeWidth: 3, // ปรับความหนา
                },
              }
            : e
        )
      );
    },
    [setEdges]
  );

  // ฟังก์ชันสำหรับอัปเดต edge เมื่อผู้ใช้แก้ไขโดยการลากจุดควบคุม
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      setEdges((eds) =>
        eds.map((e) => (e.id === oldEdge.id ? { ...e, ...newConnection } : e))
      );
    },
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgeClick={onEdgeClick} // กำหนดการคลิกที่เส้น
        onEdgeUpdate={onEdgeUpdate}
        fitView
      >
        <Controls />
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ReactFlowProvider>
      <SchedulingPage />
    </ReactFlowProvider>
  );
}
