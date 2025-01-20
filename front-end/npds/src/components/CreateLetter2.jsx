import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/CreateLetter2.css"; // CSS 파일을 가져옵니다.

const CreateLetter2 = () => {
  const location = useLocation();
  
  const { gptInput, textToImageInput } = location.state || {};

  return (
    <main className="main">
      <h1 className="heading">대충 생성된 편지</h1>

      <div className="output-section">
        <div className="output-group">
          <label className="output-label">GPT Input:</label>
          <p className="output-text">{gptInput || "데이터 없음"}</p>
        </div>

        <div className="output-group">
          <label className="output-label">Text-to-Image Input:</label>
          <p className="output-text">{textToImageInput || "데이터 없음"}</p>
        </div>

        <div className="output-group">
          <label className="output-label">Input Zzamppong:</label>
          <p className="output-text">{gptInput || "데이터 없음"} 이랑 {textToImageInput || "데이터 없음"}</p>
        </div>
      </div>
    </main>
  );
};

export default CreateLetter2;