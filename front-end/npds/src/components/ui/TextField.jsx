import React from "react";

export const TextField = ({ className, text, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={text}
      value={value} // 상태와 동기화
      onChange={onChange} // 상태 업데이트 핸들러
      className={`border border-gray-300 rounded px-3 py-2 w-full ${className}`}
    />
  );
};
