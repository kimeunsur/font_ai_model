import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/CreateLetter2.css";

const CreateLetter2 = () => {
  const location = useLocation();
  const { gptResponse, textToImageInput } = location.state || {};

  return (
    <main className="main">
      <h1 className="heading">대충 생성된 편지</h1>

      <div className="output-section">
        {/* 첫 번째 그룹 */}
        <div className="output-group">
          <label className="output-label">GPT 생성 답변</label>
          {gptResponse && gptResponse.length > 0 ? (
            gptResponse.map((response, index) => (
              <p key={index} className="output-text">{`${index + 1}. ${response}`}</p>
            ))
          ) : (
            <p className="output-text">데이터 없음</p>
          )}
        </div>

        {/* 두 번째 그룹 */}
        <div className="output-group">
          <label className="output-label">Text-to-Image Input:</label>
          {[...Array(3)].map((_, index) => (
            <p key={index} className="output-text">
              {textToImageInput || "데이터 없음"}
            </p>
          ))}
        </div>

        {/* 세 번째 그룹 */}
        <div className="output-group">
          <label className="output-label">Input Zzamppong:</label>
          <p className="output-text">
            {textToImageInput || "데이터 없음"} 이랑 {textToImageInput || "데이터 없음"}
          </p>
        </div>
      </div>
    </main>
  );
};

export default CreateLetter2;
