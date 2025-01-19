// TextField.jsx
import React from "react";

export const TextField = ({ className, text }) => {
  return (
    <input
      type="text"
      placeholder={text}
      className={`border border-gray-300 rounded px-3 py-2 w-full ${className}`}
    />
  );
};
