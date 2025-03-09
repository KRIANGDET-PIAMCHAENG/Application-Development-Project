import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSun, FaMoon } from "react-icons/fa";
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // ใช้ email แทน username
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // โหลดค่า Dark Mode จาก localStorage
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    // บันทึกค่า Dark Mode ลง localStorage เมื่อมีการเปลี่ยนแปลง
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    // ฟังก์ชันล็อกอิน
    const handleLogin = async () => {
        setError(""); // เคลียร์ error ก่อนส่งข้อมูล
    
        if (!email) return setError("กรุณากรอกอีเมล");
        if (!email.endsWith("@ku.th")) return setError("กรุณากรอกอีเมลที่ลงท้ายด้วย @ku.th");
        if (!password) return setError("กรุณากรอกรหัสผ่าน");
    
        try {
            const response = await axios.post("http://localhost:5001/login", { email, password });
            console.log(response); // ตรวจสอบว่าได้ response จาก API หรือไม่
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token); // บันทึก token ใน localStorage
                localStorage.setItem("darkMode", darkMode);
                navigate("/home"); // ไปที่หน้าหลักหลังจากเข้าสู่ระบบสำเร็จ
            }
        } catch (err) {
            console.log(err); // ดูข้อผิดพลาดที่เกิดขึ้นในคอนโซล
            setError(err?.response?.data?.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
    };

    // ฟังก์ชันสำหรับเข้าถึงข้อมูลที่ถูกป้องกัน
    const getProtectedData = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            console.log("No token found");
            return;
        }
    
        try {
            const response = await axios.get("http://localhost:5001/protected", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data); // แสดงข้อมูลที่ได้รับจากเซิร์ฟเวอร์
        } catch (err) {
            console.log(err.response.data); // จัดการกับข้อผิดพลาดที่เกิดขึ้น
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-300">
            {/*  Header */}
            <header className="w-full py-4 px-6 bg-green-700 dark:bg-gray-800 text-white flex justify-between items-center">
                <h1 className="text-2xl font-bold w-full text-center dark:text-green-700">KU-SCHEDULE</h1>
                <button
                    onClick={toggleDarkMode}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:scale-110 transition"
                >
                    {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
                </button>
            </header>

            {/*  Login Box */}
            <div className="flex flex-col items-center justify-center w-full px-6 flex-1">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-green-700 dark:text-green-700">LOG-IN</h2>

                    {/* Email Input */}
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md mt-4 shadow-md">
                        <FaUser className="text-gray-500 dark:text-gray-300 mr-2" />
                        <input
                            type="text"
                            placeholder="example@ku.th"
                            value={email} // ใช้ email แทน username
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Password Input */}
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

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full mt-6 py-3 bg-green-700 hover:bg-green-800 dark:bg-green-500 dark:hover:bg-green-700 text-white font-bold rounded-md transition duration-300"
                    >
                        Login
                    </button>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                </div>
            </div>

            {/*  Footer */}
            <footer className="w-full py-4 text-center bg-green-700 dark:bg-gray-800 text-white">
                © 2024 KU-SCHEDULE
            </footer>
        </div>
    );
}
