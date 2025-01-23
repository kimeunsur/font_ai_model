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

  return (
    <main className="main">
      <div>
        <h1 className="heading">{user.name} 만의 폰뚜~</h1>
        <div className="subbox">
          {fonts.map((font) => (
            <div key={font.id} className="font-row">
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
        {/* <button onClick={() => navigate("/create-font")}>폰트 생성하기</button> */}
      </div>
    </main>
  );
};

export default MyFonts;
