import React from "react";

export const Button = ({ className, text }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
    >
      {text}
    </button>
  );
};