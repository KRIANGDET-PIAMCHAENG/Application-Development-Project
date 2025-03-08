import { NavLink } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { TiHomeOutline } from "react-icons/ti";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiLoginBoxLine } from "react-icons/ri";
import clsx from "clsx";

export const Slidebar = ({ isSlidebarOpen }) => {
    const linkStyle = "relative flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white font-bold transition-all duration-300 ease-in-out";
    const activeLinkStyle = "text-white bg-green-900 dark:bg-gray-700";

    return (
        <aside
            className={clsx(
                "fixed top-0 left-0 z-40 h-screen pt-20 bg-green-700 border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-500 ease-in-out flex flex-col justify-between",
                {
                    "w-64 min-w-[256px]": isSlidebarOpen, //  ป้องกัน Sidebar เด้ง
                    "w-16 min-w-[64px]": !isSlidebarOpen,
                }
            )}
        >
            {/*  ส่วนเมนูด้านบน */}
            <div className="flex flex-col flex-grow">
                <NavLink 
                    to="/home" 
                    className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)} 
                    aria-label="Go to Schedule"
                >
                    <AiOutlineSchedule className="text-2xl" />
                    <span 
                        className={clsx(
                            "absolute left-12 opacity-0 translate-x-2 transition-all duration-300",
                            isSlidebarOpen && "opacity-100 translate-x-0"
                        )}
                    >
                        Schedule
                    </span>
                </NavLink>

                <NavLink 
                    to="/profile" 
                    className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)} 
                    aria-label="Go to Subject"
                >
                    <TiHomeOutline className="text-2xl" />
                    <span 
                        className={clsx(
                            "absolute left-12 opacity-0 translate-x-2 transition-all duration-300",
                            isSlidebarOpen && "opacity-100 translate-x-0"
                        )}
                    >
                        Subject
                    </span>
                </NavLink>
            </div>

            {/*  ส่วน Profile และ Logout ด้านล่าง */}
            <div className="flex flex-col border-t border-gray-600 mt-auto">
                <NavLink 
                    to="/schedule" 
                    className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)} 
                    aria-label="Go to Profile"
                >
                    <ImProfile className="text-2xl" />
                    <span 
                        className={clsx(
                            "absolute left-12 opacity-0 translate-x-2 transition-all duration-300",
                            isSlidebarOpen && "opacity-100 translate-x-0"
                        )}
                    >
                        Profile
                    </span>
                </NavLink>

                <NavLink 
                    to="/login" 
                    className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)} 
                    aria-label="Go to Logout"
                >
                    <RiLoginBoxLine className="text-2xl" />
                    <span 
                        className={clsx(
                            "absolute left-12 opacity-0 translate-x-2 transition-all duration-300",
                            isSlidebarOpen && "opacity-100 translate-x-0"
                        )}
                    >
                        Logout
                    </span>
                </NavLink>
            </div>
        </aside>
    );
};
