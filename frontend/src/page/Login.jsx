import '../style/login.css';

export default function Login() {
    return (
        <div className="background">
            <div className="title">KU-SCHEDULE</div>
            <div className='form'>
                <h2>Login</h2>
                <input type="text" placeholder='Username' />
                <input type="password" placeholder='Password' />
                <button class="transition duration-150 ease-in-out bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">Button A</button>
            </div>
            <div className="footer">© 2024 KU-SCHEDULE</div>
        </div>
    );
}
