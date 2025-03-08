import { NavLink } from "react-router-dom";

export const Slidebar = ({ isSlidebarOpen }) => {
    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen
        pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800
        dark:border-gray-700 transition-transform flex flex-col ${isSlidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

            <div className="flex flex-col flex-grow">
                <NavLink 
                    to="/home"
                    className={({ isActive }) => 
                        `block px-4 py-3 rounded-lg ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"} text-gray-900 dark:text-white`
                    }
                >
                    🏠 Home
                </NavLink>

                <NavLink 
                    to="/profile"
                    className={({ isActive }) => 
                        `block px-4 py-3 rounded-lg ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"} text-gray-900 dark:text-white`
                    }
                >
                    👤 Profile
                </NavLink>

                <NavLink 
                    to="/schedule"
                    className={({ isActive }) => 
                        `block px-4 py-3 rounded-lg ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"} text-gray-900 dark:text-white`
                    }
                >
                    🗓️ Schedule
                </NavLink>
            </div>

            <NavLink 
                to="/login"
                className={({ isActive }) => 
                    `block px-4 py-3 rounded-lg mt-auto ${isActive ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"} text-gray-900 dark:text-white`
                }
            >
                ↩️ Log-Out
            </NavLink>

        </aside>
    );
};
