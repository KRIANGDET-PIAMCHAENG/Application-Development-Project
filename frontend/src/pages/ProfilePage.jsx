import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import Dashboard from "../component/Dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { CiViewList } from "react-icons/ci";

export default function SearchPage() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [group, setGroup] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [addedCourses, setAddedCourses] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCourses();
    }, 500); // รอ 500ms หลังจากหยุดพิมพ์

    return () => clearTimeout(delayDebounce);
  }, [category, group]);


  // ในส่วน useEffect ที่โหลดข้อมูล
  useEffect(() => {
    const savedCourses = localStorage.getItem("addedCourses");
    const flowData = JSON.parse(localStorage.getItem("flow") || '{}');

    if (savedCourses && flowData.nodes) {
      // ตรวจสอบความสอดคล้องระหว่าง addedCourses กับ Node
      const existingCourseCodes = flowData.nodes.map(node => node.id);
      const filteredCourses = JSON.parse(savedCourses).filter(course =>
        existingCourseCodes.includes(course.course_code)
      );

      setAddedCourses(filteredCourses);
      localStorage.setItem('addedCourses', JSON.stringify(filteredCourses));
    }
  }, []);

  const fetchCourses = async () => {
    try {
      let url = "http://localhost:5001/courses";
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (group) params.append("group", group);
      if (params.toString()) url += `?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const filteredSubjects = subjects.filter((subject) => {
    const matchesGroup = !group || subject.group === group;
    const matchesCategory = !category || subject.category === category;
    const matchesSearch =
      subject.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.course_code?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGroup && matchesCategory && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubjects = filteredSubjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);

  const renderPagination = () => {
    const maxButtons = 5;
    let pages = [];

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"
              }`}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"
            }`}
        >
          1
        </button>
      );

      if (currentPage > maxButtons) {
        pages.push(<span key="dots1" className="px-2">...</span>);
      }

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"
              }`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - maxButtons + 1) {
        pages.push(<span key="dots2" className="px-2">...</span>);
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"
            }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const getNodePosition = (index) => ({
    x: (index % 8) * 125 + 30,
    y: Math.floor(index / 8) * 100 + 50,
  });

  const handlePlusClick = async (subject) => {
    if (addedCourses.some(c => c.course_code === subject.course_code)) return;

    // อัพเดท Added Courses
    const newAdded = [...addedCourses, subject];
    setAddedCourses(newAdded);

    // อัพเดท Flow
    const flow = JSON.parse(localStorage.getItem('flow')) || { nodes: [], edges: [] };
    if (!flow.nodes.find(n => n.id === subject.course_code)) {
      flow.nodes.push({
        id: subject.course_code,
        type: 'customNode',
        data: {
          label: subject.course_name,
          courseCode: subject.course_code,
          credit: subject.credit
        },
        position: getNodePosition(flow.nodes.length),
        style: { width: '100px', height: '50px' },
      });
      localStorage.setItem('flow', JSON.stringify(flow));
      localStorage.setItem("addedCourses", JSON.stringify(addedCourses));
    }
  };

  // ในฟังก์ชัน handleRemoveClick
  const handleRemoveClick = (courseCode) => {
    // 1. ลบออกจาก state
    const updatedCourses = addedCourses.filter(course => course.course_code !== courseCode);
    setAddedCourses(updatedCourses);

    // 2. ลบออกจาก localStorage
    localStorage.setItem('addedCourses', JSON.stringify(updatedCourses));

    // 3. ลบออกจาก flow (ถ้ามี)
    const flow = JSON.parse(localStorage.getItem('flow') || { nodes: [], edges: [] });
    if (flow.nodes.some(node => node.id === courseCode)) {
      const updatedFlow = {
        nodes: flow.nodes.filter(node => node.id !== courseCode),
        edges: flow.edges.filter(edge =>
          edge.source !== courseCode && edge.target !== courseCode
        )
      };
      localStorage.setItem('flow', JSON.stringify(updatedFlow));
    }
  };

  const handleSave = () => {
    localStorage.setItem("addedCourses", JSON.stringify(addedCourses));
    alert("บันทึกข้อมูลสำเร็จ");
    console.log(addedCourses)
  };

  const handleClose = () => {
    localStorage.setItem("addedCourses", JSON.stringify(addedCourses));
    setOverlayVisible(false);
  }

  return (
    <div className="flex bg-white min-h-screen dark:bg-gray-900">
      <Dashboard />
      <h1 className="absolute top-[20%] right-14 transform -translate-y-1/2 mr-4 text-lg font-bold text-gray-700 dark:text-white">
        <CiViewList
          className="cursor-pointer text-6xl"
          onClick={() => setOverlayVisible(!overlayVisible)}
        />
      </h1>

      <div className="flex-1 p-7">
        <div className="flex flex-col justify-between dark:bg-gray-800 p-7 rounded-lg shadow-md bg-white max-w-7xl mx-auto translate-y-20">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-2/4">
              <input
                type="text"
                placeholder="ค้นหารหัสวิชา"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 rounded bg-gray-200 text-black focus:outline-none"
              />
              <FaSearch className="absolute left-3 top-3 text-black" />
            </div>
            <div className="flex space-x-4">
              <select
                className="p-2 rounded bg-gray-200 text-gray-500"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">เลือกหมวดวิชา</option>
                <option value="หมวดวิชาเฉพาะ">หมวดวิชาเฉพาะ</option>
                <option value="หมวดวิชานอกหลักสูตร">หมวดวิชานอกหลักสูตร</option>
                <option value="หมวดวิชาศึกษาทั่วไป">หมวดวิชาศึกษาทั่วไป</option>
              </select>

              <select
                className="p-2 rounded bg-gray-200 text-gray-500"
                value={group}
                onChange={(e) => {
                  setGroup(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">เลือกกลุ่มวิชา</option>
                <option value="สายคอมพิวเตอร์ฮาร์ดแวร์ (Computer Hardware)">ฮาร์ดแวร์</option>
                <option value="สายการพัฒนาซอฟต์แวร์ (Software Development)">ซอฟต์แวร์</option>
                <option value="สายเครือข่ายคอมพิวเตอร์ (Computer Networks)">เครือข่าย</option>
                <option value="สายวิทยาศาสตร์ข้อมูลและสารสนเทศศาสตร์ (Data Science and Informatics)">
                  สายวิทยาศาสตร์ข้อมูลและสารสนเทศศาสตร์
                </option>
                <option value="สายสื่อประสม (Multimedia)">สายสื่อประสม</option>
              </select>
            </div>
          </div>

          <div className="overflow-y-auto min-h-[600px] max-h-[600px] flex-grow">
            <table className="w-full dark:text-white border-separate border-spacing-y-2 text-gray-700 font-medium transition-colors duration-75">
              <thead className="border-b border-gray-700 text-gray-700 dark:text-white">
                <tr>
                  <th className="p-3 text-center">รหัสวิชา</th>
                  <th className="p-3 text-center">ชื่อวิชา</th>
                  <th className="p-3 text-center">หน่วยกิต</th>
                  <th className="p-3 text-center">รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                {currentSubjects.length > 0 ? (
                  currentSubjects.map((subject, index) => (
                    <tr key={`${subject.course_code}-${index}`} className="dark:bg-gray-700 bg-gray-200 text-gray-700 dark:text-white">
                      <td className="p-3 text-center">{subject.course_code}</td>
                      <td className="p-3 text-center">{subject.course_name}</td>
                      <td className="p-3 text-center">{subject.credit}</td>
                      <td className="p-3 text-center flex justify-center items-center space-x-2">
                        <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setSelectedCourse(subject)}>
                          ดูรายละเอียด
                        </button>
                        <button
                          className={`bg-green-500 text-white p-2 rounded hover:bg-green-600 transition ${addedCourses.some(course => course.course_code === subject.course_code) ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          onClick={() => handlePlusClick(subject)}
                          disabled={addedCourses.some(course => course.course_code === subject.course_code)}
                        >
                          <FaPlus />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-3 text-center text-gray-500 dark:text-gray-400">
                      ไม่พบข้อมูลที่ตรงกับคำค้นหา
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          <div className="flex justify-center space-x-2 mt-4 p-2 dark:bg-gray-700 bg-gray-200 rounded-lg">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              {"< Back"}
            </button>
            {renderPagination()}
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              {"Next >"}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay สำหรับแสดงรายละเอียดวิชา */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-3/4 sm:w-2/3 md:w-1/2 max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                {selectedCourse.course_name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {selectedCourse.description}
              </p>
              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setSelectedCourse(null)}
                >
                  ปิด
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay สำหรับแสดงรายการวิชาที่เพิ่มแล้ว */}
      {/* Overlay สำหรับแสดงรายการวิชาที่เพิ่มแล้ว */}
<AnimatePresence>
  {overlayVisible && (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setOverlayVisible(false)}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-3/4 sm:w-2/3 md:w-1/2 max-w-lg max-h-[80vh]" // เพิ่ม max-h-[80vh] เพื่อจำกัดความสูง
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">วิชาที่เพิ่มแล้ว</h2>
        
        {/* เปลี่ยน div เป็น div ที่มี overflow-auto */}
        <div className="overflow-y-auto max-h-[60vh]"> {/* กำหนดความสูงสูงสุดและให้ scroll ได้ */}
          <ul className="space-y-4 pr-2"> {/* เพิ่ม padding ขวาเพื่อไม่ให้เนื้อหาโดน scrollbar บัง */}
            {addedCourses.length > 0 ? (
              addedCourses.map((course) => (
                <li
                  key={course.course_code}
                  className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md transition-transform hover:scale-105"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 dark:text-white truncate">{course.course_name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{course.course_code} ({course.credit} หน่วยกิต)</p>
                  </div>
                  <button
                    onClick={() => handleRemoveClick(course.course_code)}
                    className="ml-4 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    ลบ
                  </button>
                </li>
              ))
            ) : (
              <li className="text-center py-4 text-gray-500 dark:text-gray-400">
                ยังไม่มีวิชาที่เลือก
              </li>
            )}
          </ul>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            onClick={handleClose}
          >
            ปิด
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleSave}
          >
            บันทึก
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}