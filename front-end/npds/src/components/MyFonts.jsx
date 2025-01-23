import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import testFontData from "../data/testFontData";
import { useUser } from "../UserContext";
import "../styles/MyFonts.css";

const MyFonts = () => {
  const [fonts, setFonts] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // 더미 데이터를 로드
  useEffect(() => {
    setFonts(testFontData); // 데이터를 상태에 저장
  }, []);

  return (
    <main className="main">
      <div>
      <h1 className="heading">{user.name} 만의 폰뚜~</h1>
      <div className="subbox">
        {fonts.map((font) => (
          <div key={font.id} className="font-row">
            <p className="font-name">{font.fontName}</p>
            <p className="font-text">(대충 뭐 해당하는 폰트가 입혀진 텍스트)</p>
          </div>
        ))}
      </div>
      {/* <button onClick={() => navigate("/create-font")}>폰트 생성하기</button> */}
      </div>
    </main>
  );
};

export default MyFonts;