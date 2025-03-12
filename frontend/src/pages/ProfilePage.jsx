import React, { useState, useEffect, useContext } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import Dashboard from "../component/Dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { CiViewList } from "react-icons/ci";
import { CourseContext } from "../context/CourseContext"; // นำเข้า CourseContext

export default function SearchPage() {
  const { addedCourses, setAddedCourses } = useContext(CourseContext); // ใช้ Context
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [group, setGroup] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

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
            className={`px-3 py-1 rounded ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"
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
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"
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
            className={`px-3 py-1 rounded ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"
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
          className={`px-3 py-1 rounded ${
            currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const handlePlusClick = (subject) => {
    if (!addedCourses.some(course => course.course_code === subject.course_code)) {
      setAddedCourses([...addedCourses, { ...subject, status: 'Added' }]);
    } else {
      alert(`วิชา ${subject.course_name} ได้ถูกเพิ่มไปแล้ว`);
    }
  };

  const handleRemoveClick = (courseCode) => {
    setAddedCourses(addedCourses.filter(course => course.course_code !== courseCode));
  };

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
                {currentSubjects.length > 0
                  ? currentSubjects.map((subject, index) => (
                      <tr
                        key={`${subject.course_code}-${index}`}
                        className="dark:bg-gray-700 bg-gray-200 text-gray-700 dark:text-white"
                      >
                        <td className="p-3 text-center">{subject.course_code}</td>
                        <td className="p-3 text-center">{subject.course_name}</td>
                        <td className="p-3 text-center">{subject.credit}</td>
                        <td className="p-3 text-center flex justify-center items-center space-x-2">
                          <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={() => setSelectedCourse(subject)}
                          >
                            ดูรายละเอียด
                          </button>
                          <button
                            className={`bg-green-500 text-white p-2 rounded hover:bg-green-600 transition ${
                              addedCourses.some(course => course.course_code === subject.course_code)
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() => handlePlusClick(subject)}
                            disabled={addedCourses.some(course => course.course_code === subject.course_code)}
                          >
                            <FaPlus />
                          </button>
                        </td>
                      </tr>
                    ))
                  : Array.from({ length: 10 }).map((_, index) => (
                      <tr
                        key={index}
                        className="dark:bg-gray-700 bg-gray-200 text-gray-700 dark:text-white"
                      >
                        <td className="p-3 text-center">-</td>
                        <td className="p-3 text-center">-</td>
                        <td className="p-3 text-center">-</td>
                        <td className="p-3 text-center">-</td>
                      </tr>
                    ))}
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
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-3/4 sm:w-2/3 md:w-1/2 max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">วิชาที่เพิ่มแล้ว</h2>
              <ul className="space-y-4">
                {addedCourses.map((course) => (
                  <li
                    key={course.course_code}
                    className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md transition-transform hover:scale-105"
                  >
                    <span className="text-gray-800 dark:text-white">{course.course_name}</span>
                    <button
                      onClick={() => handleRemoveClick(course.course_code)}
                      className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      ลบ
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setOverlayVisible(false)}
                >
                  ปิด
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => { /* แฟลกฟังก์ชั่นการบันทึก */ }}
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