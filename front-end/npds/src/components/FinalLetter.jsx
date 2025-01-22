import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FinalLetter = () => {
  const location = useLocation();
  const {ImageData} = location.state || {};
  const navigate = useNavigate();

  const gotoLetterStorage = () => {
    navigate("/my-letters");
  }



  return (
    <main className="main">
      <div
        className="output-group"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "600px", // 캡처된 원본 비율에 맞춰 고정
          aspectRatio: "4 / 3", // 비율 고정 (가로:세로)
          overflow: "hidden",
          border: "1px solid #ccc",
        }}
      >
        <label className="output-label" style={{ display: "block", textAlign: "center", marginBottom: "10px" }}>
          최종편지다 이 말이야
        </label>
          {ImageData ? (
            <img src={ImageData} 
              alt="Final Letter"
              style = {{
                maxWidth: "100%",
                height: "auto",
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
                margin: "0 auto",
              }}
            />
          ) : (
            <p>전달된 데이터가 없습니다</p>
          )}
        </div>
        <button onClick={gotoLetterStorage} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
          편지 저장소로 기기
        </button>
      </main>
  );
};

export default FinalLetter;