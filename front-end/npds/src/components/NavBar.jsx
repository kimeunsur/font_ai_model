import React, { useState } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { useColor } from "../ColorContext";
import BlueAreas from "../styles/aaa (1).svg";
import nonBlueAreas from "../styles/bbb_transparent.png";
import "../styles/NavBar.css";

const NavBar = () => {
  const { user, logoutUser, loading } = useUser();
  const { svgUrl, setSvgUrl, buttonColor, setButtonColor, rotating, setRotating, resetColors } = useColor();
  const navigate = useNavigate();

  const colorPickers = Array.from({ length: 13 });
  // const [rotating, setRotating] = useState(Array(13).fill(false)); // 각 요소의 회전 상태

  // const [svgUrl, setSvgUrl] = useState(BlueAreas);
  // const [buttonColor, setButtonColor] = useState("#0000ff"); // 버튼 색상
  // const [trackingColor, setTrackingColor] = useState(false); // 색상 선택 모드 여부
  
  const handleLogout = () => {
    logoutUser();
    resetColors();
    setRotating(Array(13).fill(false));
    navigate("/");
  };

  const navigateToMainPage = async (index) => {
    navigate("/main"); // MainPage로 리디렉션
  };

  if (loading) {
    return <nav className="navbar">로딩중 ...</nav>;
  }
  // EyeDropper로 색상 선택
  const handleColorPick = async (index) => {
    if (!window.EyeDropper) {
      alert("이 브라우저는 EyeDropper API를 지원하지 않습니다.");
      return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
      // setTrackingColor(true); // 색상 추적 시작
      const result = await eyeDropper.open();
      const color = result.sRGBHex;
      // SVG 파일 읽어서 fill 속성 변경
      const response = await fetch(BlueAreas);
      let svgText = await response.text();
      svgText = svgText.replace(/fill="[^"]*"/g, `fill="${color}"`); // 모든 fill 속성 변경

      // 변경된 SVG를 Blob URL로 변환
      const blob = new Blob([svgText], { type: "image/svg+xml" });
      const newUrl = URL.createObjectURL(blob);
      setSvgUrl(newUrl);
      setButtonColor(color); // 선택된 색상 설정정
      document.documentElement.style.setProperty("--text-color", result.sRGBHex);

      // 특정 index의 회전 상태를 true로 유지
      const newRotating = [...rotating];
      newRotating[index] = true; // 회전 유지
      setRotating(newRotating);
    } catch (err) {
      console.error("색상 선택 취소 또는 오류:", err);}
    // } finally {
    //   setTrackingColor(false); // 색상 추적 종료
    // }
  };

  return (
    <nav className="navbar">
  <div className="navbar-left" onClick={navigateToMainPage}>
    <h1>NPDS</h1>
  </div>

  {colorPickers.map((_, index) => (
        <div
          className={`color-picker-wrapper ${rotating[index] ? "rotating" : ""}`}
          key={index}
        >
          <img
            src={svgUrl || BlueAreas}
            alt={`Dynamic SVG ${index + 1}`}
            onClick={() => handleColorPick(index)} // index를 전달
            className="color-picker-active"
          />
          <img
            src={nonBlueAreas}
            alt={`Color Picker Background ${index + 1}`}
            className="color-picker-background"
          />
        </div>
      ))}

  <div className="navbar-right">
    {user && (
      <div className="user-info">
        <span>{`${user.name} 님`}</span>
        <p className="logout-button" onClick={handleLogout}>
          로그아웃할거면 하든가
        </p>
      </div>
    )}
  </div>
</nav>

  );
};

export default NavBar;