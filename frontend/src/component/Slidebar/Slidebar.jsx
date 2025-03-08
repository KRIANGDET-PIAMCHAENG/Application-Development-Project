import { NavLink } from "react-router-dom";

export const Slidebar = ({ isSlidebarOpen }) => {
    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen
        pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800
        dark:border-gray-700 transition-transform ${isSlidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

            <NavLink 
                to="/home"
                className={({ isActive }) => 
                    `block px-4 py-3 rounded-lg ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`
                }
            >
                🏠 Home
            </NavLink>

            <NavLink 
                to="/profile"
                className={({ isActive }) => 
                    `block px-4 py-3 rounded-lg ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`
                }
            >
                👤 Profile
            </NavLink>

            <NavLink 
                to="/schedule"
                className={({ isActive }) => 
                    `block px-4 py-3 rounded-lg ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`
                }
            >
                🗓️ Schedule
            </NavLink>

        </aside>
    );
};
