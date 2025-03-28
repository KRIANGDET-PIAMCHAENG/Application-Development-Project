import { useCallback, useEffect, useState } from 'react';
import CustomNode from './CustomNode';
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
  const [loading, setLoading] = useState(false); // ไม่ต้องโหลดจาก API อีก

  // โหลดข้อมูล Flow จาก localStorage เมื่อ Component โหลด
  // เพิ่มฟังก์ชันจัดตำแหน่งใหม่เมื่อโหลดข้อมูล
  useEffect(() => {

    const flow = JSON.parse(localStorage.getItem("flow")) || { nodes: [], edges: [] };
    const updatedNodes = flow.nodes.map((node, index) => ({
      ...node,

      position: node.position || getNodePosition(index),
      positionAbsolute: node.position,

    }));

    setNodes(updatedNodes);
    setEdges(flow.edges);
  }, []);

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge({ ...connection, type: 'custom-edge' }, eds));
    },
    [setEdges]
  );

  const onNodeDragStop = useCallback((event, node) => {
    setNodes((nds) => {
      const updatedNodes = nds.map((n) =>
        n.id === node.id ? { ...n, position: node.position } : n
      );
  
      // บันทึกตำแหน่งใหม่ลง localStorage
      localStorage.setItem('flow', JSON.stringify({ nodes: updatedNodes, edges }));
      return updatedNodes;
    });
  }, [edges, setNodes]);
  
  

  const handleEdgesChange = useCallback(
    (changes) => {
      const previousEdges = [...edges];

      // เรียกใช้ onEdgesChange เดิม
      onEdgesChange(changes);

      // ตรวจสอบว่า edge ถูกลบหรือไม่
      changes.forEach((change) => {
        if (change.type === 'remove') {
          const deletedEdge = previousEdges.find((edge) => edge.id === change.id);
          if (deletedEdge) {
            console.log('Edge deleted:', deletedEdge);
            // คุณสามารถทำอะไรก็ได้ที่นี่เมื่อ edge ถูกลบ
          }
        }
      });
    },
    [edges, onEdgesChange]
  );

  const handleSaveFlow = async () => {
    // ตรวจสอบความสอดคล้องระหว่าง Node กับ addedCourses
    const existingCourseCodes = nodes.map(node => node.id);
    const addedCourses = JSON.parse(localStorage.getItem('addedCourses') || '[]');

    // กรองเฉพาะวิชาที่มี Node อยู่
    const filteredAddedCourses = addedCourses.filter(course =>
      existingCourseCodes.includes(course.course_code)
    );

    // อัพเดท localStorage
    localStorage.setItem('addedCourses', JSON.stringify(filteredAddedCourses));
    localStorage.setItem('flow', JSON.stringify({ nodes, edges }))

    // บันทึกข้อมูล Flow ไปยังเซิร์ฟเวอร์
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5001/update_flow', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flow: { nodes, edges } }),
      });
      alert(response.ok ? 'บันทึกสำเร็จ 🎉' : 'เกิดข้อผิดพลาดในการบันทึก');
    } catch (error) {
      console.error('Error saving flow:', error);
      alert('การเชื่อมต่อมีปัญหา');
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900  mt-0">
      <Dashboard />
      <div className="flex flex-col flex-1 mt-10 ml-8 w-full">
        <button
          onClick={handleSaveFlow}
          className="absolute bottom-10 mr-10 right-0 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-all"
        >
          💾 บันทึก Flow
        </button>
        {loading ? (
          <p className="text-center text-gray-500">Loading flow data...</p>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={{ customNode: CustomNode }}
            
            onNodesChange={onNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={onConnect}
            edgeTypes={edgeTypes}
            panOnDrag={false}
            panOnScroll={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            onNodeDragStop={onNodeDragStop}
            translateExtent={[
              [0, -20],
              [1000, 800],
            ]}
          >
            <CustomBackground />
          </ReactFlow>
        )}
      </div>
    </div>
  );
}