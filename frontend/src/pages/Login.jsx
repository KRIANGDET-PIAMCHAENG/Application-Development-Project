import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSun, FaMoon } from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // ✅ โหลดค่า Dark Mode จาก localStorage
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true"; // ✅ อ่านค่าที่เคยบันทึกไว้
    });

    // ✅ เมื่อ darkMode เปลี่ยน ให้บันทึกลง localStorage
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    const handleLogin = () => {
        if (!username) return setError("กรุณากรอกอีเมล");
        if (!username.endsWith("@ku.th")) return setError("กรุณากรอกอีเมลที่ลงท้ายด้วย @ku.th");
        if (!password) return setError("กรุณากรอกรหัสผ่าน");

        if (username === "admin@ku.th" && password === "1234") {
            setError("");

            // ✅ บันทึก darkMode ลง localStorage ก่อนเปลี่ยนหน้า
            localStorage.setItem("darkMode", darkMode);

            navigate("/home"); // ✅ ไปที่หน้าหลักหลัง Login
        } else {
            setError("กรุณากรอกรหัสผ่านให้ถูกต้อง");
        }
    };

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"} transition duration-300`}>
            {/* ✅ Header */}
            <header className="w-full py-3 px-6 bg-green-700 dark:bg-gray-800 text-white flex justify-between items-center">
                <h1 className="text-xl font-bold text-center flex-1">KU-SCHEDULE</h1>
                <button 
                    onClick={toggleDarkMode} 
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:scale-110 transition"
                >
                    {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
                </button>
            </header>

            {/* ✅ Login Box */}
            <div className="flex flex-1 justify-center items-center">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
                    <h2 className="text-2xl font-bold text-green-700 dark:text-green-500">LOG-IN</h2>

                    {/* Email Input */}
                    <div className="mt-4 flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md shadow-sm">
                        <FaUser className="text-gray-500 dark:text-gray-300 mr-2" />
                        <input
                            type="text"
                            placeholder="example@ku.th"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mt-4 flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md shadow-sm">
                        <FaLock className="text-gray-500 dark:text-gray-300 mr-2" />
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full mt-6 py-2 bg-green-700 hover:bg-green-800 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold rounded-md transition duration-300"
                    >
                        Login
                    </button>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                </div>
            </div>
        </div>
    );
}
