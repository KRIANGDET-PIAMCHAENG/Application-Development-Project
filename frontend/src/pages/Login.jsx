import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSun, FaMoon } from "react-icons/fa";
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getProtectedData(); // ✅ เรียกข้อมูลทันทีหลังจาก login
        }
    }, []);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    const handleLogin = async () => {
        setError("");

        if (!email) return setError("กรุณากรอกอีเมล");
        if (!email.endsWith("@ku.th")) return setError("กรุณากรอกอีเมลที่ลงท้ายด้วย @ku.th");
        if (!password) return setError("กรุณากรอกรหัสผ่าน");

        try {
            const response = await axios.post("http://localhost:5001/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("darkMode", darkMode);
            navigate("/home");
            getProtectedData();  // ✅ ดึงข้อมูลที่ protected หลัง Login
        } catch (err) {
            setError(err.response?.data?.error || "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
            console.error(err);
        }
    };

    const getProtectedData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("ไม่พบ Token โปรดเข้าสู่ระบบ");
            return;
        }

        try {
            const response = await axios.get("http://localhost:5001/protected", {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(response.data.message);  // ✅ ข้อมูลตอบกลับจาก Backend
        } catch (err) {
            setError(err.response?.data?.error || "การเข้าถึงข้อมูลล้มเหลว");
            console.error(err);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-300">
            <header className="w-full py-4 px-6 bg-green-700 dark:bg-gray-800 text-white flex justify-between items-center">
                <h1 className="text-2xl font-bold w-full text-center dark:text-green-700">KU-SCHEDULE</h1>
                <button
                    onClick={toggleDarkMode}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:scale-110 transition"
                >
                    {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
                </button>
            </header>

            <div className="flex flex-col items-center justify-center w-full px-6 flex-1">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-green-700 dark:text-green-700">LOG-IN</h2>

                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md mt-4 shadow-md">
                        <FaUser className="text-gray-500 dark:text-gray-300 mr-2" />
                        <input
                            type="text"
                            placeholder="example@ku.th"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-white"
                        />
                    </div>

                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md mt-4 shadow-md">
                        <FaLock className="text-gray-500 dark:text-gray-300 mr-2" />
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-white"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full mt-6 py-3 bg-green-700 hover:bg-green-800 dark:bg-green-500 dark:hover:bg-green-700 text-white font-bold rounded-md transition duration-300"
                    >
                        Login
                    </button>

                    {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                </div>
            </div>

            <footer className="w-full py-4 text-center bg-green-700 dark:bg-gray-800 text-white">
                © 2024 KU-SCHEDULE
            </footer>
        </div>
    );
}
