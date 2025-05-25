// src/CustomAlert.js
import React from "react";

const CustomAlert = ({ message, type }) => {
  const alertStyle = {
    backgroundColor: type === "success" ? "#d4edda" : "#f8d7da",
    color: type === "success" ? "#155724" : "#721c24",
    borderColor: type === "success" ? "#c3e6cb" : "#f5c6cb",
  };

  return (
    <div className={`alert ${message ? '' : 'd-none'}`} style={alertStyle}>
      <span>{message}</span>
    </div>
  );
};

export default CustomAlert;
