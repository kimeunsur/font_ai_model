import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{
        backgroundImage: `url("/bonobonoface.jpg")`, // public 폴더 기준
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-6xl font-bold text-white shadow-lg mb-12">
        폰트 확인용 테스트 텍스트입니다
      </h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/create-letter")}
          className="px-6 py-3 bg-blue-500 text-white text-xl rounded-lg hover:bg-blue-600"
        >
          편지 생성하러 가기
        </button>
        <button
          onClick={() => navigate("/my-fonts")}
          className="px-6 py-3 bg-green-500 text-white text-xl rounded-lg hover:bg-green-600"
        >
          내 폰트 보러가기
        </button>
        <button
          onClick={() => navigate("/my-letters")}
          className="px-6 py-3 bg-yellow-500 text-white text-xl rounded-lg hover:bg-yellow-600"
        >
          내 편지 보러가기
        </button>
      </div>
    </main>
  );
};

export default MainPage;
