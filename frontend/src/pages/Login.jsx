import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
import { FaUser, FaLock, FaSun, FaMoon } from 'react-icons/fa';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleLogin = () => {
        if (!username) return setError("กรุณากรอกอีเมล");
        if (!username.endsWith('@ku.th')) return setError("กรุณากรอกอีเมลที่ลงท้ายด้วย @ku.th");
        if (!password) return setError("กรุณากรอกรหัสผ่าน");
        if (username === 'admin@ku.th' && password === '1234') {
            setError('');
            navigate("/home");
        } else {
            setError("กรุณากรอกรหัสผ่านให้ถูกต้อง");
        }
    };

    return (
        <div className={`container ${darkMode ? 'dark' : 'light'}`}>
            <header className="header center">
                <h1 className="title">KU-SCHEDULE</h1>
                <button className="toggle-mode" onClick={toggleDarkMode}>
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </header>
            <div className='login-container'>
                <div className='login-box center'>
                    <h2>LOG-IN</h2>
                    <div className="input-group">
                        <FaUser className="icon" />
                        <input 
                            type="text" 
                            placeholder='example@ku.th' 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <FaLock className="icon" />
                        <input 
                            type="password" 
                            placeholder='********' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="login-btn" onClick={handleLogin}>Summit</button>
                    {error && <p className="error">{error}</p>} 
                </div>
            </div>
            <footer className="footer">© 2024 KU-SCHEDULE</footer>
        </div>
    );
}
