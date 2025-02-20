import './style/login.css';

export default function Login() {
    return (
        <div className="background">
            <div className="title">KU-SCHEDULE</div>
            <div className='form'>
                <h2>Login</h2>
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <button>Submit</button>
            </div>
            <div className="footer">© 2024 KU-SCHEDULE</div>
        </div>
    );
}
