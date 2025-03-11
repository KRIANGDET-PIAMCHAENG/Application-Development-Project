import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Dashboard from "../component/Dashboard";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchPage() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [group, setGroup] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [category, group, searchTerm]);

  const fetchCourses = async () => {
    try {
      let url = "http://localhost:5001/courses";
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (searchTerm) params.append("course_code", searchTerm);
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
    const matchesSearch =
      subject.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.course_code?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubjects = filteredSubjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);

  // ฟังก์ชันสร้าง Pagination
  const renderPagination = () => {
    const maxButtons = 5;
    let pages = [];

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"}`}
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
          className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"}`}
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
            className={`px-3 py-1 rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"}`}
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
          className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex bg-white min-h-screen dark:bg-gray-900">
      <Dashboard />
      <div className="flex-1 p-7">
        <div className="flex flex-col justify-between dark:bg-gray-800 p-7 rounded-lg shadow-md bg-white max-w-7xl mx-auto translate-y-20">
          <div className="flex justify-between items-center mb-4">
            {/* ช่องค้นหา (ซ้าย) */}
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

            {/* Dropdown (ขวา) */}
            <div className="flex space-x-4">
              <select className="p-2 rounded bg-gray-200 text-gray-500"
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

              <select className="p-2 rounded bg-gray-200 text-gray-500"
                value={group}
                onChange={(e) => {
                  setGroup(e.target.value);  // แก้ไขเป็น setGroup แทน setCategory
                  setCurrentPage(1);
                }}
              >
                <option value="">เลือกกลุ่มวิชา</option>
                <option value="สายคอมพิวเตอร์ฮาร์ดแวร์ (Computer Hardware)">ฮาร์ดแวร์</option>
                <option value="สายการพัฒนาซอฟต์แวร์ (Software Development)">ซอฟต์แวร์</option>
                <option value="สายเครือข่ายคอมพิวเตอร์ (Computer Networks)">เครือข่าย</option>
                <option value="สายวิทยาศาสตร์ข้อมูลและสารสนเทศศาสตร์ (Data Science and Informatics)">สายวิทยาศาสตร์ข้อมูลและสารสนเทศศาสตร์</option>
                <option value="สายสื่อประสม (Multimedia)">สายสื่อประสม</option>
              </select>
            </div>
          </div>

          {/* ตารางแสดงรายวิชา */}
          <div className="overflow-y-auto min-h-[600px] max-h-[600px] flex-grow ">
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
                {currentSubjects.length > 0
                  ? currentSubjects.map((subject, index) => (
                    <tr key={`${subject.course_code}-${index}`} className="dark:bg-gray-700 bg-gray-200 text-gray-700 dark:text-white">
                      <td className="p-3 text-center">{subject.course_code}</td>
                      <td className="p-3 text-center">{subject.course_name}</td>
                      <td className="p-3 text-center">{subject.credit}</td>
                      <td className="p-3 text-center">
                        <button className="bg-blue-500 text-white p-2 rounded"
                          onClick={() => setSelectedCourse(subject)}
                        >
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))
                  : Array.from({ length: 10 }).map((_, index) => (
                    <tr key={index} className="dark:bg-gray-700 bg-gray-200 text-gray-700 dark:text-white">
                      <td className="p-3 text-center">-</td>
                      <td className="p-3 text-center">-</td>
                      <td className="p-3 text-center">-</td>
                      <td className="p-3 text-center">-</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-4 p-2 dark:bg-gray-700 bg-gray-200 rounded-lg">
            <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} className="px-3 py-1 bg-gray-300 rounded">{"< Back"}</button>
            {renderPagination()}
            <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} className="px-3 py-1 bg-gray-300 rounded">{"Next >"}</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCourse !== null && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-1/3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="dark:text-white text-xl font-bold">
                {selectedCourse.course_name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {selectedCourse.description || "ไม่มีคำอธิบาย"}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-700 text-white px-4 py-2 rounded"
                  onClick={() => setSelectedCourse(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
