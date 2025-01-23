// FontContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// FontContext 생성
const FontContext = createContext(null);

export const FontProvider = ({ children }) => {
  const [selectedFont, setSelectedFont] = useState("default");

  // 로컬 스토리지에서 폰트를 가져옴
  useEffect(() => {
    const storedFont = localStorage.getItem("selectedFont");
    if (storedFont) {
      setSelectedFont(storedFont);
      document.documentElement.style.setProperty("--font-family", storedFont);
    }
  }, []);

  // 폰트 업데이트 및 로컬 스토리지에 저장
  const updateFont = (fontName) => {
    setSelectedFont(fontName);
    localStorage.setItem("selectedFont", fontName);
    document.documentElement.style.setProperty("--font-family", fontName);
  };

  return (
    <FontContext.Provider value={{ selectedFont, updateFont }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => useContext(FontContext);
