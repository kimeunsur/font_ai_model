import React, { useState, useEffect } from "react";
import testLetterData from "../data/testLetterData";
import { useUser } from "../UserContext";
import "../styles/MyLetters.css";
import { fetchUserLetters } from "../systems/request";

const MyLetters = () => {
  const [letters, setLetters] = useState([]);
  const { user } = useUser();
  const [error, setError] = useState(null);

  // 더미 데이터를 로드
  // useEffect(() => {
  //   setLetters(testLetterData); // 데이터를 상태에 저장
  // }, []);
  useEffect(() => {
    const getLetters = async () => {
      try {
        const data = await fetchUserLetters();
        console.log("서버 응답 데이터:", data); // 디버깅용 로그
        setLetters(data);
      } catch (error) {
        console.error("편지 가져오기 실패:", error.response?.data || error.message);
        setError(error.message || "실패 ㅋㅋ");
      };
    }
    getLetters();
  }, []);

  return (
    <main className="main">
      <h1 className="heading">~{user.name} 만의 편지 목록~</h1>
      <div className="subbox">
        {/* {letters.map((letter) => (
          <div key={letter.id} className="letter-row">
            <p className="letter-name">{letter.letterName}</p>
            <p className="letter-text">(대충 뭐 해당하는 편지 내용)</p>
            <p className="letter-date">{new Date(letter.createdAt).toLocaleDateString()}</p>
          </div>
        ))} */}
            {letters.length === 0 ? (
                <p>편지가 없습니다.</p>
            ) : (
                <ul>
                    {letters.map((letter) => (
                        <li key={letter.id}>
                            <p>편지 내용: {letter.content}</p>
                            <p>작성일: {new Date(letter.addedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
      </div>
    </main>
  );
};

export default MyLetters;