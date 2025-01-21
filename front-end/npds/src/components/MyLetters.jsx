import React, { useState, useEffect } from "react";
import testLetterData from "../data/testLetterData";
import { useUser } from "../UserContext";
import "../styles/MyLetters.css";

const MyLetters = () => {
  const [letters, setLetters] = useState([]);
  const { user } = useUser();

  // 더미 데이터를 로드
  useEffect(() => {
    setLetters(testLetterData); // 데이터를 상태에 저장
  }, []);

  return (
    <main className="main">
      <h1 className="heading">{user.name} 만의 편지~</h1>
      <div className="subbox">
        {letters.map((letter) => (
          <div key={letter.id} className="letter-row">
            <p className="letter-name">{letter.letterName}</p>
            <p className="letter-text">(대충 뭐 해당하는 편지 내용)</p>
            <p className="letter-date">{new Date(letter.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyLetters;