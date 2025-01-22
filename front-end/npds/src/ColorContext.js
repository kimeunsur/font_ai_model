import React, { createContext, useContext, useState } from "react";
import BlueAreas from "./styles/aaa (1).svg"; // 초기 SVG 파일 경로

// 초기 상태 정의
const initialState = {
  svgUrl: BlueAreas,
  buttonColor: "#000",
  rotating: Array(13).fill(false), // 각 요소의 초기 회전 상태
};

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [svgUrl, setSvgUrl] = useState(initialState.svgUrl);
  const [buttonColor, setButtonColor] = useState(initialState.buttonColor);
  const [rotating, setRotating] = useState(initialState.rotating);

  const resetColors = () => {
    setSvgUrl(initialState.svgUrl);
    setButtonColor(initialState.buttonColor);
    setRotating(initialState.rotating); // 회전 상태 초기화
    document.documentElement.style.setProperty("--text-color", initialState.buttonColor);
  };

  return (
    <ColorContext.Provider
      value={{
        svgUrl,
        setSvgUrl,
        buttonColor,
        setButtonColor,
        rotating,
        setRotating,
        resetColors, // 초기화 함수 전달
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
