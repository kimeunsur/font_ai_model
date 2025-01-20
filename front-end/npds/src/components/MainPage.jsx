import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "../styles/MainPage.css"; // CSS 파일 가져오기

const MainPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <main className="main">
      <h1 className="heading">
        {user ? `${user.name} ${user.email}님, 안녕하세요!` : "로그인하고 들어오셈"}
      </h1>

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
    </main>
  );
};

export default MainPage;
