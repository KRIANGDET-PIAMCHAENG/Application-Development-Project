import { NavLink } from "react-router-dom";

export const Slidebar = ({ isSlidebarOpen }) => {
    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen
        pt-20 bg-green-700 border-gray-200 sm:translate-x-0 dark:bg-gray-800
        dark:border-gray-700 transition-transform flex flex-col ${isSlidebarOpen ? "translate-x-0" : "-translate-x-full"} `}>

            <div className="flex flex-col flex-grow">
                <NavLink 
                    to="/home"
                    className={({ isActive }) => 
                        `block px-4 py-3 rounded-lg ${isActive ? "bg-green-900 text-white dark:bg-gray-700" : "hover:text-white font-bold dark:hover:bg-gray-900"} text-gray-300 dark:text-white font-bold`
                    }
                >
                    🗓️ Schedule
                </NavLink>

                <NavLink 
                    to="/profile"
                    className={({ isActive }) => 
                        `block px-4 py-3 rounded-lg ${isActive ? "bg-green-900 text-white dark:bg-gray-700" : "hover:text-white font-bold dark:hover:bg-gray-900"} text-gray-300 dark:text-white font-bold`
                    }
                >
                    🏠 Subject
                </NavLink>

                <NavLink 
                    to="/schedule"
                    className={({ isActive }) => 
                        `block px-4 py-3 rounded-lg mt-auto ${isActive ? "bg-green-900 dark:bg-gray-700" : "hover:bg-green-900 dark:hover:bg-gray-900"} text-gray-300 dark:text-white font-bold`
                    }
                >
                    👤 Profile
                </NavLink>
            </div>

            <NavLink 
                to="/login"
                className={({ isActive }) => 
                    `block px-4 py-3 rounded-lg mt-auto ${isActive ? "bg-green-900 dark:bg-gray-700" : "hover:bg-green-900 dark:hover:bg-gray-900"} text-gray-300 dark:text-white font-bold`
                }
            >
                ↩️ Log-Out
            </NavLink>

        </aside>
    );
};
