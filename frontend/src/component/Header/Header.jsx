import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";

export const Header = ({ darkMode, toggleDarkMode, toggleSlidebar }) => {
    return (
        <nav className="fixed top-0 z-50 w-full bg-green-700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-md">
            <div className="px-4 py-3 lg:px-6 lg:pl-4">
                <div className="flex items-center justify-between">

                    {/* Sidebar Toggle + Logo */}
                    <div className="flex items-center">
                        {/* Sidebar Toggle Button */}
                        <button
                            className="p-2 rounded-lg hover:bg-green-900 dark:hover:bg-gray-700 transition"
                            onClick={toggleSlidebar}
                        >
                            <HiOutlineMenuAlt2 className="text-white text-2xl" />
                        </button>

                        {/* Logo */}
                        <a href="#" className="flex ms-3">
                            <MdSpaceDashboard className="h-8 text-2xl text-white" />
                            <span className="self-center text-xl font-bold text-white dark:text-green-700 ms-2 absolute left-1/2 transform -translate-x-1/2 flex items-center">
                                KU-SCHEDULE
                            </span>
                        </a>
                    </div>

                    {/* Dark Mode Toggle Button */}
                    <button
                        className="w-12 h-12 flex items-center justify-center rounded-full 
                        bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:scale-110 transition"
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
                    </button>

                </div>
            </div>
        </nav>
    );
};