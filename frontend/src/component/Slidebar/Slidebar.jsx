import { NavLink, useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { LuNotebookText } from "react-icons/lu";
import { AiOutlineSchedule } from "react-icons/ai";
import { RiLoginBoxLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useState } from "react";

export const Slidebar = ({ isSlidebarOpen }) => {
    const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
    const navigate = useNavigate();  // ใช้สำหรับการนำทางไปยังหน้า login

    const linkStyle = "relative flex items-center px-4 py-3 text-gray-300 font-bold transition-all duration-300 ease-in-out hover:text-glow hover:drop-shadow-[0_0_3px_#ffffff]";
    const activeLinkStyle = "text-white bg-green-900 dark:bg-gray-700";

    const handleLogoutClick = (e) => {
        e.preventDefault();
        setIsLogoutPopupOpen(true);
    };

    const handleConfirmLogout = () => {
        // ลบข้อมูลการเข้าสู่ระบบ
        localStorage.removeItem("userToken"); // ลบ token หรือข้อมูลที่เก็บไว้
        sessionStorage.removeItem("userToken"); // ถ้าใช้ sessionStorage ก็ลบที่นี่ได้

        // ปิด Popup
        setIsLogoutPopupOpen(false);

        // รีไดเรกต์ไปยังหน้า login หรือหน้าอื่น
        navigate("/");  // เปลี่ยนเส้นทางไปหน้า login
    };

    const handleCancelLogout = () => {
        setIsLogoutPopupOpen(false);
    };

    const handleBackdropClick = (e) => {
        // ปิด Popup เมื่อคลิกที่พื้นหลัง (นอกกรอบ)
        if (e.target === e.currentTarget) {
            setIsLogoutPopupOpen(false);
        }
    };

    return (
        <>
            <aside className={clsx(
                "fixed top-0 left-0 z-40 h-screen pt-20 bg-green-700 border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-200 ease-in-out flex flex-col justify-between",
                {
                    "w-64 min-w-[256px]": isSlidebarOpen,
                    "w-16 min-w-[64px]": !isSlidebarOpen,
                }
            )}>
                {/* ส่วนเมนูด้านบน */}
                <div className="flex flex-col flex-grow">
                    <NavLink
                        to="/home"
                        className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)}
                        aria-label="Go to Schedule"
                    >
                        <AiOutlineSchedule className="text-2xl ml-1" />
                        <motion.span
                            className={clsx(
                                "absolute left-12 opacity-0 translate-x-2 transition-all duration-300",
                                isSlidebarOpen && "opacity-100 translate-x-0"
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isSlidebarOpen ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            Schedule
                        </motion.span>
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)}
                        aria-label="Go to Subject"
                    >
                        <LuNotebookText className="text-2xl ml-1" />
                        <motion.span
                            className={clsx(
                                "absolute left-12 opacity-0 translate-x-2 transition-all duration-300",
                                isSlidebarOpen && "opacity-100 translate-x-0"
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isSlidebarOpen ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            Subject
                        </motion.span>
                    </NavLink>
                </div>

                {/* ส่วน Profile และ Logout ด้านล่าง */}
                <div className="flex flex-col border-t border-gray-600 mt-auto">
                    <NavLink
                        to="/schedule"
                        className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)}
                        aria-label="Go to Profile"
                    >
                        <ImProfile className="text-2xl ml-1" />
                        <motion.span
                            className={clsx(
                                "absolute left-12 opacity-0 translate-x-2 transition-all duration-300",
                                isSlidebarOpen && "opacity-100 translate-x-0"
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isSlidebarOpen ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            Profile
                        </motion.span>
                    </NavLink>

                    <NavLink
                        to="/"
                        className={({ isActive }) => clsx(linkStyle, isActive && activeLinkStyle)}
                        onClick={handleLogoutClick}
                        aria-label="Go to Logout"
                    >
                        <RiLoginBoxLine className="text-2xl ml-1" />
                        <motion.span
                            className={clsx(
                                "absolute left-12 opacity-0 translate-x-2 transition-all duration-300",
                                isSlidebarOpen && "opacity-100 translate-x-0"
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isSlidebarOpen ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            Logout
                        </motion.span>
                    </NavLink>
                </div>
            </aside>

            {/* Popup Logout */}
            <AnimatePresence>
                {isLogoutPopupOpen && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleBackdropClick}  // คลิกที่พื้นหลังจะปิดโมดัล
                    >
                        <motion.div
                            className="bg-white p-6 rounded-md shadow-lg w-96"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}  // หยุดการ bubble เมื่อคลิกในกรอบ
                        >
                            <h2 className="text-xl text-center mb-4">Are you sure you want to log out?</h2>
                            <div className="flex justify-around">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
                                    onClick={handleCancelLogout}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400"
                                    onClick={handleConfirmLogout}
                                >
                                    Sure
                                </button>

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
