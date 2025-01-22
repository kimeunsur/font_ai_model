import React from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { useColor } from "../ColorContext";
import BlueAreas from "../styles/aaa (1).svg";
import nonBlueAreas from "../styles/bbb_transparent.png";
import "../styles/NavBar.css";

const NavBar = () => {
  const { user, logoutUser, loading } = useUser();
  const {
    svgUrl,
    setSvgUrl,
    buttonColor,
    setButtonColor,
    rotating,
    setRotating,
    colors,
    setColors,
    resetColors,
  } = useColor();
  const navigate = useNavigate();

  const colorPickers = Array.from({ length: 13 });

  const handleLogout = () => {
    logoutUser();
    resetColors();
    navigate("/");
  };

  const navigateToMainPage = () => {
    navigate("/main");
  };

  const handleColorPick = async (index, event) => {
    event.preventDefault(); // 우클릭 메뉴 기본 동작 막기

    if (!window.EyeDropper) {
      alert("이 브라우저는 EyeDropper API를 지원하지 않습니다.");
      return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
      const result = await eyeDropper.open();
      const color = result.sRGBHex;

      // 클릭된 요소의 색상 업데이트
      const newColors = [...colors];
      newColors[index] = color; // 클릭된 요소만 색상 변경
      setColors(newColors);

      // SVG 파일 읽어서 클릭된 요소만 URL 업데이트
      const response = await fetch(BlueAreas);
      let svgText = await response.text();
      svgText = svgText.replace(/fill="[^"]*"/g, `fill="${color}"`);

      const blob = new Blob([svgText], { type: "image/svg+xml" });
      const newSvgUrl = URL.createObjectURL(blob);

      // 클릭된 요소의 URL 업데이트
      const newSvgUrls = [...svgUrl];
      newSvgUrls[index] = newSvgUrl;
      setSvgUrl(newSvgUrls);

      // 이전 회전 상태 초기화 및 클릭된 요소의 회전 상태 활성화
      const newRotating = Array(13).fill(false);
      newRotating[index] = true;
      setRotating(newRotating);

      // --text-color 업데이트
      setButtonColor(color);
      document.documentElement.style.setProperty("--text-color", color);
    } catch (err) {
      console.error("색상 선택 취소 또는 오류:", err);
    }
  };

  if (loading) {
    return <nav className="navbar">로딩중 ...</nav>;
  }

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
            src={svgUrl[index] || BlueAreas}
            alt={`Dynamic SVG ${index + 1}`}
            onContextMenu={(event) => handleColorPick(index, event)} // 우클릭 이벤트 처리
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
