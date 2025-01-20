import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/MainPage.css"; // CSS 파일 가져오기

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="main">
        <div className="content">
          <h1 className="heading">폰트 확인용 테스트 텍스트입니다</h1>
          <div className="button-group">
            <button
              onClick={() => navigate("/create-letter")}
              className="button button-blue"
            >
              편지 생성하러 가기
            </button>
            <button
              onClick={() => navigate("/my-fonts")}
              className="button button-green"
            >
              내 폰트 보러가기
            </button>
            <button
              onClick={() => navigate("/my-letters")}
              className="button button-yellow"
            >
              내 편지 보러가기
            </button>
          </div>
        </div>
      </main>
      <NavBar />
    </>
  );
};

export default MainPage;
