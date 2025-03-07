import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './page/Login';
import Mainapp from "./page/Mainapp";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/login" />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/Mainapp" element={<Mainapp />} />
    //   </Routes>
    // </BrowserRouter>
    <Mainapp/>
  );
}

export default App;
