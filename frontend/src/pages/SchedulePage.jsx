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
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 dark:border-t-green-400 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 font-semibold">
          Loading Profile...
        </p>
      </div>
    );
  }
  

  return (
    <div className="flex bg-gray-100 min-h-screen dark:bg-gray-900">
      <Dashboard />
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg flex overflow-hidden w-[1100px] h-auto">
          
          <div className="w-1/3 bg-green-600 dark:bg-green-900 text-white flex flex-col items-center justify-center py-14 px-10">
            
            <div className="w-72 h-72 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={userData.picture_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl mt-4 text-center font-bold">Hello, I'm {userData.name}</h2>
            <p className="text-center text-md mt-2 px-4">
              I am a student in the {userData.major} program, Faculty of {userData.faculty}.
            </p>
          </div>

          <div className="w-2/3 p-12 font-bold">
            <h3 className="text-2xl dark:text-gray-100 font-bold mb-6">Detail</h3>
            <div className="text-gray-700 dark:text-gray-100 space-y-4 text-lg">
              
              <p className="text-gray-700 dark:text-gray-100 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-100 transition-colors duration-300">Name :</strong> {userData.name}
              </p>
              <p className="text-gray-700 dark:text-gray-100 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-100 transition-colors duration-300">Faculty :</strong> {userData.faculty}
              </p>
              <p className="text-gray-700 dark:text-gray-100 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-100 transition-colors duration-300">Major :</strong> {userData.major}
              </p>
              <p className="text-gray-700 dark:text-gray-100 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-100 transition-colors duration-300">Year :</strong> {userData.year}
              </p>
              <p className="text-gray-700 dark:text-gray-100 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-100 transition-colors duration-300">Gender :</strong> {userData.gender}
              </p>
              <p className="text-gray-700 dark:text-gray-100 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-100 transition-colors duration-300">Nationality :</strong> {userData.nationality}
              </p>
              <p className="text-gray-700 dark:text-gray-100 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-100 transition-colors duration-300">Religion :</strong> {userData.religion}
              </p>
              <p className="text-gray-700 dark:text-gray-100 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-100 transition-colors duration-300">Birth Date :</strong> {userData.birth_date}
              </p>
              <p className="text-gray-700 dark:text-gray-100 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-100 transition-colors duration-300">Contact :</strong> {userData.contract_number}
              </p>
              <p className="text-gray-700 dark:text-gray-100 transition-colors duration-300">
                <strong className="text-gray-700 dark:text-gray-100 transition-colors duration-300">Advisor :</strong> {userData.advisor}
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
