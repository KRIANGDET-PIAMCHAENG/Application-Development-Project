import { useState } from "react";
import { LuNotebookText } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import Dashboard from "../component/Dashboard";

const subjects = [
  { code: "001", name: "Programming Skill", credits: 1, fee: "!!!" },
  { code: "001", name: "Abstact Data Types", credits: 3, fee: "อาจารย์น่ารัก" },
  { code: "003", name: "Algorithms", credits: 3, fee: "อาจารย์กันเอง" },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-white min-h-screen dark:bg-gray-900 ">
      <Dashboard />
      <div className="flex-1 p-7">
        <h1 className="text-green-500 text-2xl flex justify-center font-bold mb-6">
          KU-SCHEDULE
        </h1>
        <div className="dark:bg-gray-800 p-7 rounded-lg shadow-md bg-white max-w-7xl mx-auto">
          {/* ค้นหา + Select */}
          <div className="flex justify-end space-x-4 mb-4">
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
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">ชั้นปี</option>
              <option value="1">ปี 1</option>
              <option value="2">ปี 2</option>
              <option value="3">ปี 3</option>
              <option value="4">ปี 4</option>
            </select>
            <select
              className="p-2 rounded bg-gray-200 text-gray-500 w-1/4"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">ภาคเรียน</option>
              <option value="1">เทอม 1</option>
              <option value="2">เทอม 2</option>
            </select>
          </div>

          {/* ตาราง */}
          <table className="w-full dark:text-white border-separate border-spacing-y-2 text-gray-700 font-medium transition-colors duration-75">
            <thead>
              <tr className="border-b border-gray-700 text-gray-700 dark:text-white">
                <th className="p-3 text-center">รหัสวิชา</th>
                <th className="p-3 text-center">ชื่อวิชา</th>
                <th className="p-3 text-center">หน่วยกิต</th>
                <th className="p-3 text-center">ค่าอธิบาย</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <tr key={subject.code} className="dark:bg-gray-700 bg-gray-200 text-gray-700 dark:text-white">
                    <td className="p-3 text-center">{subject.code}</td>
                    <td className="p-3 text-center">{subject.name}</td>
                    <td className="p-3 text-center">{subject.credits}</td>
                    <td className="p-3 text-center">{subject.fee}</td>
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
    </div>
  );
}
