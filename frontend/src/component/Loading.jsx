import React from "react";
import profilePic from "../assets/nut_test.jpg";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 to-purple-400 dark:from-gray-800 dark:to-gray-900 transition-all">
      <div className="relative">
        <img src={profilePic} alt="Loading..." className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg animate-bounce" />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full animate-pulse"></div>
      </div>
      <p className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200 animate-fade">
        กำลังโหลดข้อมูล...
      </p>
    </div>
  );
}
