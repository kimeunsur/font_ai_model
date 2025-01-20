import React, { useState, useEffect } from "react";
import testFontData from "../data/testFontData";
import { useUser } from "../UserContext";
import "../styles/MyFonts.css";

const MyFonts = () => {
  const [fonts, setFonts] = useState([]);
  const { user } = useUser();

  // 더미 데이터를 로드
  useEffect(() => {
    setFonts(testFontData); // 데이터를 상태에 저장
  }, []);

  return (
    <main className="main">
      <h1 className="heading">나만의 폰뚜~</h1>
      <div className="subbox">
        {fonts.map((font) => (
          <div key={font.id} className="font-row">
            <p className="font-name">{font.fontName}</p>
            <p className="font-text">(대충 뭐 해당하는 폰트가 입혀진 텍스트)</p>
            <p className="font-date">{new Date(font.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyFonts;