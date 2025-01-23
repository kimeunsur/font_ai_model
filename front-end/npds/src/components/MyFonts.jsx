import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import testFontData from "../data/testFontData";
import { useUser } from "../UserContext";
import "../styles/MyFonts.css";

const MyFonts = () => {
  const [fonts, setFonts] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    testFontData.forEach((font) => {
      const style = document.createElement("style");
      style.textContent = `
        @font-face {
          font-family: '${font.fontName}';
          src: url('${font.fontPath}') format('truetype');
        }
      `;
      document.head.appendChild(style);
    });
    setFonts(testFontData); // 폰트 데이터를 상태에 저장
  }, []);

  const handleFontClick = (fontName) => {
    document.documentElement.style.setProperty("--font-family", fontName);
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <main className="main">
      <div>
        <h1 className="heading">{user.name}님을 위한 폰뚜~</h1>
        <div className="subbox">
          {fonts.map((font) => (
            <div
              key={font.id}
              className="font-row"
              onClick={() => handleFontClick(font.fontName)} // 클릭 이벤트 추가
              style={{ cursor: "pointer" }} // 클릭 가능한 스타일
            >
              <p className="font-name">{font.fontName}</p>
              <p
                className="font-text"
                style={{
                  fontFamily: font.fontName, // 동적으로 생성한 폰트 적용
                }}
              >
                {font.fontName} 샘플 텍스트입니다만
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyFonts;
