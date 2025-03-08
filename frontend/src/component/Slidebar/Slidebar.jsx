import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { TiHomeOutline } from "react-icons/ti";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiLoginBoxLine } from "react-icons/ri";
import clsx from "clsx";

export const Slidebar = ({ isSlidebarOpen }) => {
    const linkStyle = "block px-4 py-3 rounded-lg text-gray-300 hover:text-white font-bold";
    const activeLinkStyle = "text-white bg-green-900 dark:bg-gray-700";

    return (
        <aside
            className={clsx(
                "translate-x-0 fixed top-0 left-0 z-40 h-screen pt-20 bg-green-700 border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out",
                {
                    "w-64": isSlidebarOpen,
                    "w-16": !isSlidebarOpen,
                }
            )}
        >
            <div className="flex flex-col flex-grow">
                <NavLink 
                    to="/home" 
                    className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)} 
                    aria-label="Go to Schedule"
                >
                    <div className="flex items-center">
                        <AiOutlineSchedule className="mr-2 text-2xl" />
                        {isSlidebarOpen && <span>Schedule</span>}
                    </div>
                </NavLink>

                <NavLink 
                    to="/profile" 
                    className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)} 
                    aria-label="Go to Subject"
                >
                    <div className="flex items-center">
                        <TiHomeOutline className="mr-2 text-2xl" />
                        {isSlidebarOpen && <span>Subject</span>}
                    </div>
                </NavLink>
            </div>

            <div className="flex flex-col mt-auto border-t border-gray-600">
                <NavLink 
                    to="/schedule" 
                    className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)} 
                    aria-label="Go to Profile"
                >
                    <div className="flex items-center">
                        <ImProfile className="mr-2 text-2xl" />
                        {isSlidebarOpen && <span>Profile</span>}
                    </div>
                </NavLink>

                <NavLink 
                    to="/login" 
                    className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)} 
                    aria-label="Go to Logout"
                >
                    <div className="flex items-center">
                        <RiLoginBoxLine className="mr-2 text-2xl" />
                        {isSlidebarOpen && <span>Logout</span>}
                    </div>
                </NavLink>
            </div>
        </aside>
    );
};
