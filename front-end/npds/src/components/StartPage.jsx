import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 제어

  const handleButtonClick = () => {
    navigate("/another"); // "/another" 경로로 이동
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8">
          니편대써: 니 편지 대충 써줌(NPDS)
          <br />
          "뭐, 대충 해줄 테니까 감성 그런 거 기대하지 마"
        </h1>
        <button
          onClick={handleButtonClick}
          className="text-5xl py-6 px-12 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          시작하기
        </button>
      </div>
    </main>
  );
};

export default StartPage;
