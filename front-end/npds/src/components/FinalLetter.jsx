import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CreateLetter.css"; // CSS 파일을 가져옵니다.

const FinalLetter = () => {
  const location = useLocation();
  const { text, image } = location.state || {};
  const navigate = useNavigate();
  const GoingLetter = () => {
    navigate("/my-letters");
  }
  return (
    <main className="main">
        <div className="output-group">
          <label className="output-label">최종편지다 이 말이야</label>
          <div
            className="preview-container"
            style={{
              backgroundImage: `url(${image})`,
              height: "500px",
              position: "relative",
            }}
          >
            <textarea
              className="editable-text"
              value={text}
              placeholder="텍스트를 입력하거나 선택하세요"
            />
          </div>
        </div>
        <button onClick={GoingLetter}>편지 저장소로 기기</button>
    </main>
  );
};

export default FinalLetter;