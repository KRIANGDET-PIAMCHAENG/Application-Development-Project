import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Information from "./Information";
import Schedule from "./Schedule";
import Subject from "./Subject";

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-5">
                    <Routes>
                        <Route path="/" element={<Schedule />} />
                        <Route path="/Information " element={<Information />} />
                        <Route path="/Schedule" element={<Schedule />} />
                        <Route path="/Subject" element={<Subject />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}
