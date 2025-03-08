import Dashboard from "../component/Dashboard";
import profilePic from "../assets/nut_test.jpg"; // 🔹 นำเข้ารูปจาก `src/assets/`

export default function ProfilePage() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Dashboard />

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-[1100px] h-auto">
          {/* Left Section: Profile Info */}
          <div className="w-1/3 bg-green-600 text-white flex flex-col items-center justify-center py-14 px-10">
            {/* Profile Image (ใช้รูปจากเครื่อง) */}
            <div className="w-72 h-72 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={profilePic} // 🔹 ใช้รูปที่นำเข้า
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mt-4">Hello, I'm Natthaphon</h2>
            <p className="text-center text-md mt-2 px-4">
              I am a student in the Computer Engineering program, Faculty of
              Engineering Sriracha, Kasetsart University Sriracha Campus.
            </p>
          </div>

          {/* Right Section: Detail Info */}
          <div className="w-2/3 p-12">
            <h3 className="text-2xl font-bold mb-6">Detail</h3>
            <div className="text-gray-700 space-y-4 text-lg">
              <p><strong>ชื่อ:</strong> ณัฐพล พิลาไชย</p>
              <p><strong>คณะ:</strong> วิศวกรรมศาสตร์</p>
              <p><strong>สาขา:</strong> วิศวกรรมคอมพิวเตอร์</p>
              <p><strong>ชั้นปี:</strong> /</p>
              <p><strong>เพศ:</strong> ชาย</p>
              <p><strong>สัญชาติ:</strong> ไทย</p>
              <p><strong>ศาสนา:</strong> พุทธ</p>
              <p><strong>วันเกิด:</strong> 18 เมษายน 2547</p>
              <p><strong>เบอร์ติดต่อ:</strong> 09x-xxx-xxxx</p>
              <p><strong>อาจารย์ที่ปรึกษา:</strong> อาจารย์ ไพรัช</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
