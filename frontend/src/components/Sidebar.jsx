import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt } from "react-icons/fa";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = useMemo(() => [
        { path: "/", name: "Schedule", icon: <FaTh /> }, 
        { path: "/Information", name: "Information", icon: <FaUserAlt /> },
        { path: "/Schedule", name: "Schedule", icon: <FaRegChartBar /> },
        { path: "/Subject", name: "Subject", icon: <FaCommentAlt /> }
    ], []);

    return (
        <div className={`bg-gray-900 h-screen p-5 transition-all duration-300 ${isOpen ? "w-52" : "w-16"}`}>
            <div className="flex items-center">
                <h1 className={`text-white text-xl font-bold transition-all ${isOpen ? "block" : "hidden"}`}>Logo</h1>
                <button onClick={toggle} className="ml-auto text-white text-2xl">
                    <FaBars />
                </button>
            </div>
            <nav className="mt-10">
                {menuItem.map((item, index) => (
                    <NavLink 
                        to={item.path} 
                        key={index} 
                        className={({ isActive }) => 
                            `flex items-center p-3 text-white hover:bg-gray-700 rounded transition-all ${
                                isActive ? "bg-gray-800" : ""
                            }`
                        }
                    >
                        <div className="text-xl">{item.icon}</div>
                        <span className={`ml-3 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
                            {item.name}
                        </span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
