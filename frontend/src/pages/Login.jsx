import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    
    const handleFocus = (e) => {
        if (e.target.placeholder === 'Username') {
            e.target.placeholder = 'example@ku.th';
        } else if (e.target.placeholder === 'Password') {
            e.target.placeholder = '******';
        }
    };
    
    const handleBlur = (e) => {
        if (e.target.name === 'username') {
            e.target.placeholder = 'Username';
        } else if (e.target.name === 'password') {
            e.target.placeholder = 'Password'; 
        }
    };

    const handleLogin = () => {
        if (!username.endsWith('@ku.th')) {
            setError("กรุณากรอกอีเมลที่ลงท้ายด้วย @ku.th");
            return;
        }

        if (username === 'admin@ku.th' && password === '1234') {
            setError(''); 
            navigate("/home"); 
        } else {
            setError("กรุณากรอกรหัสผ่านให้ถูกต้อง"); 
        }
    };

    return (
        <div className="background">
            <div className="title">KU-SCHEDULE</div>
            <div className='form'>
                <h2>Login</h2>
                <input 
                    type="text" 
                    placeholder='Username' 
                    value={username}
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={handleFocus}  
                    onBlur={handleBlur}    
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleFocus}  
                    onBlur={handleBlur}    
                />
                <button onClick={handleLogin}>Submit</button>
                {error && <p className="error">{error}</p>} 
            </div>
            <div className="footer">© 2024 KU-SCHEDULE</div>
        </div>
    );
}
