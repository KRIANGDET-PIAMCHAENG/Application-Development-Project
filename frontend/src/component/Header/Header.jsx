import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import "./header.css"

export const Header = ({darkMode,toggleDarkMode,toggleSlidebar}) => {
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end ">

                        <button className="p-2 bg-transparent inline-flex items-center 
                        text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100" onClick={toggleSlidebar}>
                            <HiOutlineMenuAlt2 className="text-black text-2xl" />
                        </button>
                        <a href="#" className="flex ms-2 md:me-24">
                            <MdSpaceDashboard className="h-8 me-3 text-xl text-green-600" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap
                            dark:text-white">
                                KU-SCHEDULE
                            </span>
                        </a>
                    </div>

                    <button className="w-10 h-10 flex items-center justify-center rounded-full 
             bg-transparent text-gray-800 dark:bg-slate-50 dark:text-slate-700" onClick={toggleDarkMode}>{darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                    </button>
                </div>
            </div>
        </nav>
    );
};
