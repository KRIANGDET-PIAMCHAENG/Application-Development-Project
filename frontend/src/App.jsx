import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
<<<<<<< HEAD
import Login from './page/Login';
=======
import Login from './pages/Login';
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import SchedulePage from "./pages/SchedulePage";
>>>>>>> origin/แก้ละ

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
