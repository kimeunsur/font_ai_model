import React, { createContext, useContext, useState } from "react";
import BlueAreas from "./styles/aaa (1).svg"; // 초기 SVG 파일 경로

// 초기 상태 정의
const initialState = {
  svgUrl: BlueAreas,
  buttonColor: "#000",
};

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [svgUrl, setSvgUrl] = useState(initialState.svgUrl);
  const [buttonColor, setButtonColor] = useState(initialState.buttonColor);

  const resetColors = () => {
    setSvgUrl(initialState.svgUrl);
    setButtonColor(initialState.buttonColor);
    document.documentElement.style.setProperty("--text-color", initialState.buttonColor);
  };

  return (
    <ColorContext.Provider
      value={{
        svgUrl,
        setSvgUrl,
        buttonColor,
        setButtonColor,
        resetColors, // 초기화 함수 전달
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
