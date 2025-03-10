import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Dashboard from "../component/Dashboard";

export default function SearchPage() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, [category]);

  const fetchCourses = async () => {
    try {
      let url = "http://localhost:5001/courses";
      if (category) {
        url += `?category=${encodeURIComponent(category)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.course_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-white min-h-screen dark:bg-gray-900">
      <Dashboard />
      <div className="flex-1 p-7 translate-y-20">
        <div className="dark:bg-gray-800 p-7 rounded-lg shadow-md bg-white max-w-7xl mx-auto">
          
          {/* ค้นหาและเลือกหมวดหมู่ */}
          <div className="flex justify-start space-x-4 mb-4">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="ค้นหารหัสวิชา"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 rounded bg-gray-200 text-black focus:outline-none"
              />
              <FaSearch className="absolute left-3 top-3 text-black" />
            </div>
            <select
              className="p-2 rounded bg-gray-200 text-gray-500 w-1/4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">เลือกหมวดวิชา</option>
              <option value="หมวดวิชาเฉพาะ">หมวดวิชาเฉพาะ</option>
              <option value="หมวดวิชานอกหลักสูตร">หมวดวิชานอกหลักสูตร</option>
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
                filteredSubjects.map((subject) => (
                  <tr key={subject.course_code} className="dark:bg-gray-700 bg-gray-200 text-gray-700 dark:text-white">
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
      {selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold">{selectedCourse.course_name}</h2>
            <p className="text-gray-700 mt-2">{selectedCourse.description}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedCourse(null)}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
