import { useNavigate } from "react-router-dom";
import '../style/Login.css';

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // ใส่เงื่อนไขการล็อกอินที่นี่
        navigate("/home"); 
    };

    return (
        <div className="background">
            <div className="title">KU-SCHEDULE</div>
            <div className='form'>
                <h2>Login</h2>
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <button onClick={handleLogin}>Submit</button>
            </div>
            <div className="footer">© 2024 KU-SCHEDULE</div>
        </div>
    );
}
