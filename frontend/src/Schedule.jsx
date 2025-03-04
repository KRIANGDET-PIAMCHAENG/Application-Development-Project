import React from "react";
import './style/Schedule.css';

const Schedule = () => {
  return (
    <div className="schedule-container">
      <aside className="sidebar">
        <div className="menu-icon">☰</div>
        <div className="menu-item">📅</div>
        <div className="menu-item">📖</div>
        <div className="menu-item">🔄</div>
      </aside>
      <main className="schedule-content">
        <h1 className="title">KU-SCHEDULE</h1>
        <table className="schedule-table">
          <thead>
            <tr>
              <th colSpan="2">ปีที่ 1</th>
              <th colSpan="2">ปีที่ 2</th>
            </tr>
            <tr>
              <th>กลางภาค</th>
              <th>ปลายภาค</th>
              <th>กลางภาค</th>
              <th>ปลายภาค</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill()
              .map((_, index) => (
                <tr key={index}>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Schedule;
