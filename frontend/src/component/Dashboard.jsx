import { useState, useEffect } from "react";
import { Header } from "./Header/Header";
import { Slidebar } from "./Slidebar/Slidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [isSlidebarOpen, setIsSlidebarOpen] = useState(() => {
    return localStorage.getItem("isSlidebarOpen") === "true";
  });

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
      <Slidebar isSlidebarOpen={isSlidebarOpen} toggleSlidebar={toggleSlidebar} />

      <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Outlet context={{ darkMode, isSlidebarOpen, toggleSlidebar }} />
      </div>
    </div>
  );
}
