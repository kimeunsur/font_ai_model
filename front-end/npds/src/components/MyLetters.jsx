import React from "react";
import { useUser } from "../UserContext";
import "../styles/MyLetters.css"; // CSS 파일을 가져옵니다.

const MyLetters = () => {
  const { user } = useUser();

  return (
    <main className="main">
      <h1 className="heading">{user.name} 이(가) 직접 쓴 편지~</h1>
    </main>
  );
};

export default MyLetters;
