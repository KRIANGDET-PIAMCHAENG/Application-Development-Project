import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Dashboard from "../component/Dashboard";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchPage() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [group, setGroup] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [category, group, searchTerm]); // ✅ ค้นหาข้อมูลแบบเรียลไทม์

  const fetchCourses = async () => {
    try {
      let url = "http://localhost:5001/courses";
      const params = new URLSearchParams();

      if (category) params.append("category", category);
      if (searchTerm) params.append("course_code", searchTerm);
      if (group) params.append("group", group);

      if (params.toString()) url += `?${params.toString()}`;

      console.log("🔍 Fetching:", url);  // ✅ Debug URL
      const response = await fetch(url);
      const data = await response.json();

      console.log("📦 API Response:", data); // ✅ Debug API response
      setSubjects(data);
    } catch (error) {
      console.error("❌ Error fetching courses:", error);
    }
  };

  // ✅ กรองข้อมูลก่อนแสดงผล
  const filteredSubjects = subjects.filter((subject) => {
    const matchesGroup = !group || subject.group === group;
    const matchesSearch =
      subject.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.course_code?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesGroup && matchesSearch;
  });

  return (
    <div className="flex bg-white min-h-screen dark:bg-gray-900">
      <Dashboard />
      <div className="flex-1 p-7">
        <h1 className="text-green-500 text-2xl flex justify-center font-bold mb-6">
          KU-SCHEDULE
        </h1>
        <div className="dark:bg-gray-800 p-7 rounded-lg shadow-md bg-white max-w-7xl mx-auto">

          {/* ค้นหาและเลือกหมวดหมู่ */}
          <div className="flex justify-start space-x-4 mb-4">
            {/* ช่องค้นหา */}
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="ค้นหารหัสวิชา"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 rounded bg-gray-200 text-black focus:outline-none"
              />
              <FaSearch className="absolute left-3 top-3 text-black" />
            </div>

            {/* Dropdown เลือกหมวดหมู่ */}
            <select
              className="p-2 rounded bg-gray-200 text-gray-500 w-1/4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">เลือกหมวดวิชา</option>
              <option value="หมวดวิชาเฉพาะ">หมวดวิชาเฉพาะ</option>
              <option value="หมวดวิชานอกหลักสูตร">หมวดวิชานอกหลักสูตร</option>
              <option value="หมวดวิชาศึกษาทั่วไป">หมวดวิชาศึกษาทั่วไป</option>
            </select>

            {/* Dropdown เลือกกลุ่มวิชา */}
            <select
              className="p-2 rounded bg-gray-200 text-gray-500 w-1/4"
              value={group}
              onChange={(e) => {
                setGroup(e.target.value);
                console.log("✅ Group Selected:", e.target.value); // ✅ Debug
              }}
            >
              <option value="">เลือกกลุ่มวิชา</option>
              <option value="วิชาแกน (Fundamental Courses)">วิชาแกน</option>
              <option value="กลุ่มวิชาฮาร์ดแวร์และสถาปัตยกรรมคอมพิวเตอร์ (Computer Hardware and Architecture)">
                ฮาร์ดแวร์และสถาปัตยกรรมคอมพิวเตอร์
              </option>
              <option value="กลุ่มวิชาเทคโนโลยีและวิธีการทางซอฟต์แวร์ (Software Technology and Methods)">
                เทคโนโลยีและวิธีการทางซอฟต์แวร์
              </option>
              <option value="สายเครือข่ายคอมพิวเตอร์ (Computer Networks)">เครือข่ายคอมพิวเตอร์</option>
              <option value="สายวิทยาศาสตร์ข้อมูลและสารสนเทศศาสตร์ (Data Science and Informatics)">สายวิทยาศาสตร์ข้อมูลและสารสนเทศศาสตร์</option>
            </select>
          </div>

          {/* ตารางแสดงรายวิชา */}
          <table className="w-full dark:text-white border-separate border-spacing-y-2 text-gray-700 font-medium transition-colors duration-75">
            <thead>
              <tr className="border-b border-gray-700 text-gray-700 dark:text-white">
                <th className="p-3 text-center">รหัสวิชา</th>
                <th className="p-3 text-center">ชื่อวิชา</th>
                <th className="p-3 text-center">หน่วยกิต</th>
                <th className="p-3 text-center">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject, index) => (
                  <tr key={`${subject.course_code}-${index}`} className="dark:bg-gray-700 bg-gray-200 text-gray-700 dark:text-white">
                    <td className="p-3 text-center">{subject.course_code}</td>
                    <td className="p-3 text-center">{subject.course_name}</td>
                    <td className="p-3 text-center">{subject.credit}</td>
                    <td className="p-3 text-center">
                      <button
                        className="bg-blue-500 text-white p-2 rounded"
                        onClick={() => setSelectedCourse(subject)}
                      >
                        ดูรายละเอียด
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3 text-center" colSpan="4">ไม่พบข้อมูล</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pop-up Modal สำหรับแสดงรายละเอียดวิชา */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-1/3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="dark:text-white text-xl font-bold">{selectedCourse.course_name}</h2>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{selectedCourse.description}</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setSelectedCourse(null)}
                >
                  ปิด
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
