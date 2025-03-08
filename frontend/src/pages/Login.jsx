import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSun, FaMoon } from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleLogin = () => {
        if (!username) return setError("กรุณากรอกอีเมล");
        if (!username.endsWith("@ku.th")) return setError("กรุณากรอกอีเมลที่ลงท้ายด้วย @ku.th");
        if (!password) return setError("กรุณากรอกรหัสผ่าน");
        if (username === "admin@ku.th" && password === "1234") {
            setError("");
            navigate("/home");
        } else {
            setError("กรุณากรอกรหัสผ่านให้ถูกต้อง");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-300">
            {/* Header */}
            <header className="w-full py-4 px-6 bg-green-600 dark:bg-gray-800 text-white flex justify-between items-center">
                <h1 className="text-2xl font-bold">KU-SCHEDULE</h1>
                <button onClick={toggleDarkMode} className="text-white text-2xl p-2 rounded-md bg-green-700 dark:bg-gray-700">
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </header>

            {/* Login Box */}
            <div className="flex flex-col items-center justify-center w-full px-6">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-green-600 dark:text-green-400">LOG-IN</h2>

                    {/* Email Input */}
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md mt-4 shadow-md">
                        <FaUser className="text-gray-500 dark:text-gray-300 mr-2" />
                        <input
                            type="text"
                            placeholder="example@ku.th"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-white"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full mt-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold rounded-md transition duration-300"
                    >
                        Summit
                    </button>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full py-4 text-center bg-green-600 dark:bg-gray-800 text-white mt-auto">
                © 2024 KU-SCHEDULE
            </footer>
        </div>
    );
}
