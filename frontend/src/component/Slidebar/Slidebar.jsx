import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { TiHomeOutline } from "react-icons/ti";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiLoginBoxLine } from "react-icons/ri";

export const Slidebar = ({ isSlidebarOpen }) => {
    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen
        pt-20 bg-green-700 border-gray-200 sm:translate-x-0 dark:bg-gray-800
        dark:border-gray-700 transition-transform flex flex-col ${isSlidebarOpen ? "translate-x-0" : "-translate-x-full"} `}>

            <div className="flex flex-col flex-grow">
                <NavLink 
                    to="/home"
                    className={({ isActive }) => 
                        `block px-4 py-3 rounded-lg ${isActive ? "text-white bg-green-900 dark:bg-gray-700" : "text-gray-300 hover:text-white"} font-bold`
                    }
                >
                    <div className="flex items-center">
                        <AiOutlineSchedule className="mr-2 text-2xl" /> Schedule
                    </div>
                </NavLink>

                <NavLink 
                    to="/profile"
                    className={({ isActive }) => 
                        `block px-4 py-3 rounded-lg ${isActive ? "text-white bg-green-900 dark:bg-gray-700" : "text-gray-300 hover:text-white"} font-bold`
                    }
                >
                     <div className="flex items-center">
                        <TiHomeOutline className="mr-2 text-2xl" /> Subject
                    </div>
                </NavLink>

                <NavLink 
                    to="/schedule"
                    className={({ isActive }) => 
                        `block px-4 py-3 rounded-lg mt-auto ${isActive ? "text-white bg-green-900 dark:bg-gray-700" : "text-gray-300 hover:text-white"} font-bold`
                    }
                >
                    <div className="flex items-center">
                        <ImProfile className="mr-2 text-2xl" /> Profile
                    </div>

                </NavLink>
            </div>

            <NavLink 
                to="/login"
                className={({ isActive }) => 
                    `block px-4 py-3 rounded-lg mt-auto ${isActive ? "text-white bg-green-900 dark:bg-gray-700" : "text-gray-300 hover:text-white"} font-bold`
                }
            >   
                <div className="flex items-center">
                        <RiLoginBoxLine className="mr-2 text-2xl" /> Logout
                </div>
            </NavLink>

        </aside>
    );
};
