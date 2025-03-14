import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import CustomEdge from '../component/CustomEdge';
import '@xyflow/react/dist/style.css';
import Dashboard from '../component/Dashboard'; // อย่าลืม import Dashboard

const getNodePosition = (index) => ({
  x: (index % 4) * 250,  // กระจาย node ไปตามแนวนอน
  y: Math.floor(index / 4) * 150, // กระจาย node ไปตามแนวตั้ง
});

const edgeTypes = {
  'custom-edge': CustomEdge,
};

export default function HomePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // ดึงข้อมูลจาก localStorage และอัปเดต nodes เมื่อโหลดหน้าเว็บหรือเมื่อ localStorage เปลี่ยนแปลง
  useEffect(() => {
    const addedCourses = JSON.parse(localStorage.getItem("addedCourses") || "[]");
    const initialNodes = addedCourses.map((course, index) => ({
      id: `course_${index + 1}`,
      position: getNodePosition(index),
      data: { label: course.course_code },
    }));
    setNodes(initialNodes);
  }, [setNodes]);

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Dashboard />
      <div className="flex flex-col flex-1 mt-16 ml-8 w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
          fitView
        />
      </div>
    </div>
  );
}