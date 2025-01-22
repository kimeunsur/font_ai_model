import React, { createContext, useContext, useState } from "react";
import BlueAreas from "./styles/aaa (1).svg"; // 초기 SVG 파일 경로

// 초기 상태 정의
const initialState = {
  svgUrl: Array(13).fill(BlueAreas), // 각 요소의 초기 SVG URL 배열
  buttonColor: "#000", // --text-color에 사용
  rotating: Array(13).fill(false), // 각 요소의 초기 회전 상태
  colors: Array(13).fill("#0000ff"), // 각 요소의 초기 색상
};

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [svgUrl, setSvgUrl] = useState(initialState.svgUrl); // SVG URL 배열 관리
  const [buttonColor, setButtonColor] = useState(initialState.buttonColor);
  const [rotating, setRotating] = useState(initialState.rotating);
  const [colors, setColors] = useState(initialState.colors);

  const resetColors = () => {
    setSvgUrl(initialState.svgUrl);
    setButtonColor(initialState.buttonColor);
    setRotating(initialState.rotating);
    setColors(initialState.colors); // 모든 색상 초기화
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
        colors,
        setColors,
        resetColors, // 초기화 함수 전달
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
