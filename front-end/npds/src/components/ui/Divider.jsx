// Divider.jsx
import React from "react";

export const Divider = ({ className, text }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <hr className="flex-grow border-t border-gray-300" />
      <span>{text}</span>
      <hr className="flex-grow border-t border-gray-300" />
    </div>
  );
};
