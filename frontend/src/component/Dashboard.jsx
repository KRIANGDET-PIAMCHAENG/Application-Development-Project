import { useState, useEffect } from "react";
import { Header } from "./Header/Header";
import { Slidebar } from "./Slidebar/Slidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  //  โหลดค่า Dark Mode และ Sidebar Mode จาก `localStorage`
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; //  อ่านค่าจาก localStorage
  });

  const [isSlidebarOpen, setIsSlidebarOpen] = useState(() => {
    return localStorage.getItem("isSlidebarOpen") === "true"; //  โหลดค่า Sidebar Mode
  });

  //  บันทึกค่าลง LocalStorage เมื่อเปลี่ยนโหมด
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("isSlidebarOpen", isSlidebarOpen);
  }, [isSlidebarOpen]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleSlidebar = () => setIsSlidebarOpen((prev) => !prev);

  return (
    <div className={`${darkMode ? "dark" : ""} font-quickSand`}>
      <Header 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode} 
        toggleSlidebar={toggleSlidebar} 
      />
      <Slidebar isSlidebarOpen={isSlidebarOpen} />

      {/*  ส่งค่าให้ทุกหน้าใช้ */}
      <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Outlet context={{ darkMode, isSlidebarOpen, toggleSlidebar }} />
      </div>
    </div>
  );
}
