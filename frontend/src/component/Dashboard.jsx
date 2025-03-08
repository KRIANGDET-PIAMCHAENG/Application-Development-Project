import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // ถ้าคุณใช้ไอคอนเหล่านี้
import { Header } from "./Header/Header";
import { Slidebar } from "./Slidebar/Slidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(() => {
    return localStorage.getItem("isSlidebarOpen") === "true"; // ✅ โหลดค่า Sidebar Mode
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // ✅ โหลดค่า darkMode
  });

  const toggleSlidebar = () => setIsSlidebarOpen((prev) => !prev);

  return (
    <div className={`${darkMode ? "dark" : ""} font-quickSand`}>
      <Header 
        toggleSlidebar={toggleSlidebar} 
      />
      <Slidebar isSlidebarOpen={isSlidebarOpen} />

      {/* ✅ ส่งค่าให้ทุกหน้าใช้ */}
      <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Outlet context={{ darkMode, isSlidebarOpen, toggleSlidebar }} />
      </div>

      <ButtonDarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

function ButtonDarkMode({ darkMode, setDarkMode }) {
  // บันทึกการตั้งค่าของ darkMode ลง localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // เปลี่ยนโหมด dark mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <button
      className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:scale-110 transition"
      onClick={toggleDarkMode}
    >
      {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
    </button>
  );
}
