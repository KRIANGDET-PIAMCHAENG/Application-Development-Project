import { useState, useEffect } from "react";
import Dashboard from "../component/Dashboard";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found, please login.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          console.error("Failed to fetch profile:", data.error);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) {
    return <div className="text-center mt-20 text-2xl">Loading...</div>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen dark:bg-gray-900">
      <Dashboard />
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg flex overflow-hidden w-[1100px] h-auto">
          {/* Left Section: Profile Info */}
          <div className="w-1/3 bg-green-600 dark:bg-green-900 text-white flex flex-col items-center justify-center py-14 px-10">
            {/* Profile Image */}
            <div className="w-72 h-72 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={userData.picture_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mt-4">Hello, I'm {userData.name}</h2>
            <p className="text-center text-md mt-2 px-4">
              I am a student in the {userData.major} program, Faculty of {userData.faculty}.
            </p>
          </div>

          {/* Right Section: Detail Info */}
          <div className="w-2/3 p-12">
            <h3 className="text-2xl dark:text-gray-100 font-bold mb-6">Detail</h3>
            <div className="text-gray-700 dark:text-gray-100 space-y-4 text-lg">
              <p><strong>ชื่อ:</strong> {userData.name}</p>
              <p><strong>คณะ:</strong> {userData.faculty}</p>
              <p><strong>สาขา:</strong> {userData.major}</p>
              <p><strong>ชั้นปี:</strong> {userData.year}</p>
              <p><strong>เพศ:</strong> {userData.gender}</p>
              <p><strong>สัญชาติ:</strong> {userData.nationality}</p>
              <p><strong>ศาสนา:</strong> {userData.religion}</p>
              <p><strong>วันเกิด:</strong> {userData.birth_date}</p>
              <p><strong>เบอร์ติดต่อ:</strong> {userData.contract_number}</p>
              <p><strong>อาจารย์ที่ปรึกษา:</strong> {userData.advisor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
