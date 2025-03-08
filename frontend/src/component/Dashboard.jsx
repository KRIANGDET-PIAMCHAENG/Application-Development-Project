import { useState } from "react";
import { Header } from "./Header/Header";
import { Slidebar } from "./Slidebar/Slidebar";
import { Outlet } from "react-router-dom";


export default function Dashboard() {
  const [darkMode, setdarkMode] = useState(false);
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    setdarkMode(!darkMode);
  }

  const toggleSlidebar = () => {
    setIsSlidebarOpen(!isSlidebarOpen);
  }

  return (
    <div className={`${darkMode && "dark"} font-quickSand`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSlidebar={toggleSlidebar} />
      <Slidebar isSlidebarOpen={isSlidebarOpen} />
    </div>
  )
}