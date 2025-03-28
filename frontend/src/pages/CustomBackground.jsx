import React from 'react';
import Dashboard from "../component/Dashboard";

const CustomBackground = () => {
  return (
    <div className="relative w-full h-full dark:bg-gray-900 bg-white  font-sans flex flex-col ">
      {/* Header */}
      <div className="bg-gray-800 border-b-2 border-blue-500 flex justify-between items-center relative">

        <div className="w-7 h-7 rounded-full flex justify-center items-center cursor-pointer">

        </div>
      </div>

      {/* Main Content - Table Layout */}
      <div className="flex-1 flex flex-col">
        {/* Year Headers - 4 Years */}
        <div className="flex border-b border-gray-600 dark:text-white">
          <div className="w-1/4 p-2.5 text-center border-r border-gray-600">
            ปีที่1
          </div>
          <div className="w-1/4 p-2.5 text-center border-r border-gray-600">
            ปีที่2
          </div>
          <div className="w-1/4 p-2.5 text-center border-r border-gray-600">
            ปีที่3
          </div>
          <div className="w-1/4 p-2.5 text-center">
            ปีที่4
          </div>
        </div>

        {/* Term Headers - 8 columns (2 for each year) */}
        <div className="flex border-b border-gray-600 dark:text-white">
          {[1, 2, 3, 4].map(year => (
            <React.Fragment key={`year-${year}`}>
              <div className="w-1/2 p-2 text-center border-r border-gray-600">
                กลางภาค
              </div>
              <div className={`w-1/2 p-2 text-center ${year < 4 ? 'border-r border-gray-600' : ''}`}>
                ปลายภาค
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Course Slots - Empty columns for all 8 sections */}
        <div className="flex flex-1">
          {[1, 2, 3, 4].map(year => (
            <React.Fragment key={`content-${year}`}>
              {/* Midterm column */}
              <div className="w-1/2 border-r border-gray-600 min-h-[300px]">

              </div>

              <div className={`w-1/2 ${year < 4 ? 'border-r border-gray-600' : ''} min-h-[300px]`}>

              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomBackground;