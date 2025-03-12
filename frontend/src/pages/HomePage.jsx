import React, { useCallback, useState } from "react";
import Dashboard from "../component/Dashboard";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  StepEdge, // ✅ Import StepEdge
} from "reactflow";
import "reactflow/dist/style.css";

let id = 1;
const getId = () => `course_${id++}`;

const initialCourses = [
  { name: "Math 101", year: "1", semester: "1" },
  { name: "Physics 101", year: "1", semester: "2" },
  { name: "CS 101", year: "2", semester: "1" },
  { name: "Algorithms", year: "2", semester: "2" },
  { name: "Database Systems", year: "3", semester: "1" },
  { name: "Software Engineering", year: "3", semester: "2" },
  { name: "AI & ML", year: "4", semester: "1" },
  { name: "Cyber Security", year: "4", semester: "2" },
  { name: "", year: "4", semester: "2" },
];

const getNodePosition = (year, semester, index) => {
  const baseX = (year - 1) * 400;
  const semOffset = semester === "2" ? 200 : 0;
  const x = baseX + semOffset;
  const y = index * 150 + 50;
  return { x, y };
};

function HomePage() {
  const courseNodes = initialCourses.map((course, index) => {
    const position = getNodePosition(parseInt(course.year), course.semester, index);
    return {
      id: getId(),
      type: "default",
      position,
      data: { label: course.name, year: course.year, semester: course.semester },
      style: { 
        width: 200, 
        height: 50, 
        fontSize: 14, 
        whiteSpace: 'nowrap', // ทำให้ข้อความไม่ยาวเกิน
        overflow: 'hidden',   // ตัดข้อความที่เกินออก
        textOverflow: 'ellipsis', // แสดงเป็น '...'
      },
      title: course.name,  // เพิ่มชื่อเต็มใน title ที่จะโชว์เมื่อเอาเมาส์ไปชี้
    };
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(courseNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // ✅ ใช้ StepEdge สำหรับเส้นที่หัก 90 องศา
  const edgeTypes = {
    step: StepEdge,
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, type: "step" }, eds)), // ✅ บังคับให้ใช้ StepEdge
    [setEdges]
  );

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Dashboard />
      <div className="flex flex-col flex-1 mt-16 ml-8 w-full">

        <div className="relative flex-1 overflow-x-auto">
          <div className="absolute top-0 left-0 right-0 bg-gray-300 py-2 flex text-center font-bold">
            {[1, 2, 3, 4].map((year) => (
              <div key={year} className="w-[400px]">
                Year {year}
                <div className="flex justify-around mt-1">
                  <span>Sem 1</span>
                  <span>Sem 2</span>
                </div>
              </div>
            ))}
          </div>
          <div className="min-w-full h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              edgeTypes={edgeTypes} // ✅ เพิ่ม edgeTypes
            >
              <Controls />
              <Background />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WrappedHomePage() {
  return (
    <ReactFlowProvider>
      <HomePage />
    </ReactFlowProvider>
  );
}
