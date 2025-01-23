import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import testFontData from "../data/testFontData";
import { useUser } from "../UserContext";
import { useFont } from "../FontContext"; // FontContext 추가
import "../styles/MyFonts.css";

const MyFonts = () => {
  const { user } = useUser();
  const { selectedFont, updateFont } = useFont(); // FontContext 활용
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
  }, []);

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <main className="main">
      <div>
        <h1 className="heading">{user.name}님을 위한 폰뚜~</h1>
        <div className="subbox">
          {testFontData.map((font) => (
            <div
              key={font.id}
              className="font-row"
              onClick={() => updateFont(font.fontName)} // 폰트 업데이트
              style={{ cursor: "pointer" }}
            >
              <p className="font-name">{font.fontName}</p>
              <p
                className="font-text"
                style={{
                  fontFamily: font.fontName, // 동적으로 생성한 폰트 적용
                }}
              >
                아무거나 하셈
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyFonts;
