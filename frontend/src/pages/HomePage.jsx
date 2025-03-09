import Dashboard from "../component/Dashboard";
import { AiOutlineSchedule } from "react-icons/ai";

export default function HomePage() {
  return (
    <div className="flex bg-gray-100 min-h-screen dark:bg-gray-900">
      <Dashboard />
      <div className="flex-1 flex justify-center items-center p-8">
        <h1 className="ml-96 flex items-center dark:text-gray-100">
          <AiOutlineSchedule className="text-2xl mr-2" />
          Schedule
        </h1>
      </div>
    </div>
  );
}
