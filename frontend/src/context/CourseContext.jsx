import React, { createContext, useState } from "react";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [addedCourses, setAddedCourses] = useState([]);

  return (
    <CourseContext.Provider value={{ addedCourses, setAddedCourses }}>
      {children}
    </CourseContext.Provider>
  );
};