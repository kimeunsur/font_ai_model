import React, { useState } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BlueAreas } from "../styles/aaa_updated.svg";
import nonBlueAreas from "../styles/bbb_transparent.png";
import "../styles/NavBar.css";
import sibal from "../styles/bononukki.png";

const NavBar = () => {
  const { user, logoutUser } = useUser();  
  const navigate = useNavigate();

  const [buttonColor, setButtonColor] = useState("#0000ff"); // 버튼 색상
  const [trackingColor, setTrackingColor] = useState(false); // 색상 선택 모드 여부

  console.log('current color: ' + buttonColor);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const navigateToMainPage = () => {
    navigate("/main"); // MainPage로 리디렉션
  };

  // EyeDropper로 색상 선택
  const handleColorPick = async () => {
    if (!window.EyeDropper) {
      alert("이 브라우저는 EyeDropper API를 지원하지 않습니다.");
      return;
    }

    const eyeDropper = new window.EyeDropper();

    try {
      setTrackingColor(true); // 색상 추적 시작
      const result = await eyeDropper.open();
      setButtonColor(result.sRGBHex); // 선택된 색상 설정
      console.log("siuu" + buttonColor);
      document.documentElement.style.setProperty("--text-color", result.sRGBHex);
    } catch (err) {
      console.error("색상 선택 취소 또는 오류:", err);
    } finally {
      setTrackingColor(false); // 색상 추적 종료
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={navigateToMainPage}>
        <h1>NPDS</h1>
      </div>

      <div className="color-picker-wrapper">
        {/* 클릭 가능한 blue_areas.png */}
        <BlueAreas
          // src={sibal}
          onClick={handleColorPick}
          className="color-picker-active"
          style={{ color: buttonColor, fill: buttonColor, cursor: "pointer" }}
        />
        {/* 겹쳐 있는 non_blue_areas.png */}
        <img
          src={nonBlueAreas}
          alt="Color Picker Background"
          className="color-picker-background"
        />
      </div>

      {/* <img
        src={sibal}
      /> */}

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