import React, { useState, useEffect } from "react";
import testLetterData from "../data/testLetterData";
import { useUser } from "../UserContext";
import "../styles/MyLetters.css";
import trashIcon from "../styles/output_trash_transparent.png"; // 휴지통 이미지 가져오기

const MyLetters = () => {
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null); // 선택된 편지 상태
  const { user } = useUser();

  // 더미 데이터를 로드
  useEffect(() => {
    setLetters(testLetterData); // 데이터를 상태에 저장
  }, []);

  // 휴지통 클릭 이벤트 핸들러
  const handleTrashClick = () => {
    console.log("휴지통 클릭함");
    if (selectedLetter) {
      console.log(`삭제 요청된 편지 ID: ${selectedLetter}`);
    } else {
      console.log("선택된 편지가 없습니다.");
    }
  };

  return (
    <main className="main">
      <h1 className="heading">{user.name} 만의 편지~</h1>
      <div className="content-container">
        {/* 편지 리스트 */}
        <div className="subbox">
          {letters.map((letter) => (
            <div
              key={letter.id}
              className={`letter-row ${
                selectedLetter === letter.id ? "selected" : ""
              }`}
              onClick={() => setSelectedLetter(letter.id)} // 선택된 항목 상태 업데이트
            >
              <p className="letter-name">{letter.letterName}</p>
              <p className="letter-text">(대충 뭐 해당하는 편지 내용)</p>
              <p className="letter-date">
                {new Date(letter.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* 휴지통 */}
        {selectedLetter && (
          <div className="trash-container" onClick={handleTrashClick}>
            <img src={trashIcon} alt="Trash Icon" className="trash-icon" />
          </div>
        )}
      </div>
    </main>
  );
};

export default MyLetters;
