import { Handle, useReactFlow } from '@xyflow/react';

const CustomNode = ({ id, data }) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = () => {
    // 1. ลบ Node ออกจาก Flow ทันที
    deleteElements({ nodes: [{ id }] });
    
    // 2. อัปเดต localStorage ทั้งสองส่วน
    // 2.1 ลบออกจาก flow
    const flow = JSON.parse(localStorage.getItem('flow') || { nodes: [], edges: [] });
    const updatedFlow = {
      nodes: flow.nodes.filter(node => node.id !== id),
      edges: flow.edges.filter(edge => 
        edge.source !== id && edge.target !== id
      )
    };
    localStorage.setItem('flow', JSON.stringify(updatedFlow));
    
    // 2.2 ลบออกจาก addedCourses
    const addedCourses = JSON.parse(localStorage.getItem('addedCourses') || '[]');
    const updatedCourses = addedCourses.filter(course => 
      course.course_code !== id
    );
    localStorage.setItem('addedCourses', JSON.stringify(updatedCourses));
    
    // 3. แจ้งเตือนผู้ใช้ (optional)
    console.log(`Deleted node ${id} and updated storage`);
  };

  return (
    <div className="w-[100px] h-[50px] bg-blue-600 rounded-md flex flex-col items-center justify-center text-white text-xs p-1 border-2 border-blue-300 hover:bg-blue-700 transition-all relative">
      <button 
        onClick={handleDelete}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-lg hover:bg-red-600 transition-all z-10"
        aria-label="Delete node"
      >
        ×
      </button>
      <Handle type="target" position="top" className="!bg-gray-400 !w-2 !h-2" />
      <div className="font-bold truncate w-full text-center">{data.courseCode}</div>
      <div className="text-[0.6rem] truncate w-full text-center">{data.label}</div>
      <Handle type="source" position="bottom" className="!bg-gray-400 !w-2 !h-2" />
    </div>
  );
};

export default CustomNode;