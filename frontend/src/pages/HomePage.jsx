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
  x: (index % 4) * 250,
  y: Math.floor(index / 4) * 150,
});

const edgeTypes = {
  'custom-edge': CustomEdge,
};

export default function HomePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(false);

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
      localStorage.setItem('flow', JSON.stringify({ nodes: updatedNodes, edges }));
      return updatedNodes;
    });
  }, [edges, setNodes]);

  const handleEdgesChange = useCallback(
    (changes) => {
      const previousEdges = [...edges];
      onEdgesChange(changes);
      changes.forEach((change) => {
        if (change.type === 'remove') {
          const deletedEdge = previousEdges.find((edge) => edge.id === change.id);
          if (deletedEdge) {
            console.log('Edge deleted:', deletedEdge);
          }
        }
      });
    },
    [edges, onEdgesChange]
  );

  const handleSaveFlow = async () => {
    const existingCourseCodes = nodes.map(node => node.id);
    const addedCourses = JSON.parse(localStorage.getItem('addedCourses') || '[]');
    const filteredAddedCourses = addedCourses.filter(course =>
      existingCourseCodes.includes(course.course_code)
    );
    localStorage.setItem('addedCourses', JSON.stringify(filteredAddedCourses));
    localStorage.setItem('flow', JSON.stringify({ nodes, edges }));

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
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 mt-0 min-h-screen">
      <Dashboard className="w-full md:w-1/4" />
      <div className="flex flex-col flex-1 mt-10 ml-4 md:ml-8 w-full relative">
        <button
          onClick={handleSaveFlow}
          className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-all"
        >
          💾 บันทึก Flow
        </button>
        {loading ? (
          <p className="text-center text-gray-500">Loading flow data...</p>
        ) : (
          <div className="w-full h-[70vh] md:h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={{ customNode: CustomNode }}
              fitView
              fitViewOptions={{ padding: 0 }}
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
              translateExtent={[[0, -20], [1000, 800]]}
            >
              <CustomBackground />
            </ReactFlow>
          </div>
        )}
      </div>
    </div>
  );
}
