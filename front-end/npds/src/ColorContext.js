import React, { createContext, useContext, useState } from "react";

// Context 생성
const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [svgUrl, setSvgUrl] = useState(null); // SVG URL 상태
  const [buttonColor, setButtonColor] = useState("#0000ff"); // 버튼 색상 상태

  return (
    <ColorContext.Provider value={{ svgUrl, setSvgUrl, buttonColor, setButtonColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
