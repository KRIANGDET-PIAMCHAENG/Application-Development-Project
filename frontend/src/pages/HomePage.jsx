import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import CustomEdge from '../component/CustomEdge';
import '@xyflow/react/dist/style.css';
import Dashboard from '../component/Dashboard';
import CustomBackground from './CustomBackground';

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
      style: { 
        width: "70px", // Set a fixed width
        height: "20px", // Set a fixed height
        padding: "auto", // Reduce padding
        fontSize: "auto", // Smaller font size
        fontWeight: "bold", 
        textAlign: "center",
        backgroundColor: "white",
        border: "1px solid black",
        display: "flex", // Use flexbox
        alignItems: "center", // Vertically center content
        justifyContent: "center", // Horizontally center content
      }
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

  const onNodeDragStop = useCallback((event, node) => {
    const { x, y } = node.position;

    // กำหนดขอบเขต (Boundary)
    const minX = 0;
    const maxX = 1000; // กำหนดค่าตามความกว้างของพื้นที่
    const minY = 0;
    const maxY = 800; // กำหนดค่าตามความสูงของพื้นที่

    // ปรับตำแหน่ง Node ให้อยู่ในขอบเขต
    const newX = Math.max(minX, Math.min(maxX, x));
    const newY = Math.max(minY, Math.min(maxY, y));

    if (newX !== x || newY !== y) {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? { ...n, position: { x: newX, y: newY } }
            : n
        )
      );
    }
  }, [setNodes]);

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
          panOnDrag={false} // ปิดการเลื่อนเมื่อลากเมาส์
          panOnScroll={false} // ปิดการเลื่อนเมื่อใช้ Scroll เมาส์
          zoomOnScroll={false} // ปิดการซูมเมื่อใช้ Scroll เมาส์
          zoomOnPinch={false} // ปิดการซูมเมื่อใช้ Pinch (บน Touch Devices)
          zoomOnDoubleClick={false} // ปิดการซูมเมื่อดับเบิลคลิก
          onNodeDragStop={onNodeDragStop} // ตรวจสอบตำแหน่ง Node เมื่อหยุดลาก
          translateExtent={[
            [-20, -20], // ขอบเขตซ้ายบน
            [1000, 800], // ขอบเขตขวาล่าง
          ]} // กำหนดขอบเขตของพื้นที่
        >
          <CustomBackground />
        </ReactFlow>
      </div>
    </div>
  );
}