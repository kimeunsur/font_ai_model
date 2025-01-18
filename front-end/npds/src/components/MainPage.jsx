import React from "react";

const MainPage = () => {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url("/bonobonoface.jpg")`, // public 폴더 기준
        backgroundSize: "cover", // 이미지 크기를 화면에 맞춤
        backgroundPosition: "center", // 이미지 위치를 중앙으로
        backgroundRepeat: "no-repeat", // 이미지 반복 방지
      }}
    >
      <h1 className="text-6xl font-bold text-white shadow-lg">
        와! 메인화면!
      </h1>
    </main>
  );
};

export default MainPage;
