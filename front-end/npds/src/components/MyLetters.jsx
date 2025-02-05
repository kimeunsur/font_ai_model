import React, { useState, useEffect } from "react";
import testLetterData from "../data/testLetterData";
import { useUser } from "../UserContext";
import "../styles/MyLetters.css";
import trashIcon from "../styles/output_trash_transparent.png"; // 휴지통 이미지 가져오기
import { fetchUserLetters } from "../systems/request";
import { useNavigate } from "react-router-dom";

const MyLetters = () => {
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null); // 선택된 편지 상태
  const { user } = useUser();
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 휴지통 클릭 이벤트 핸들러
  const handleTrashClick = () => {
    console.log("휴지통 클릭함");
    if (selectedLetter) {
      console.log(`삭제 요청된 편지 ID: ${selectedLetter}`);
    } else {
      console.log("선택된 편지가 없습니다.");
    }
  };

  // 편지 데이터를 가져오는 useEffect
  useEffect(() => {
    const getLetters = async () => {
      try {
        const data = await fetchUserLetters();
        console.log("서버 응답 데이터:", data); // 디버깅용 로그
        setLetters(data);
      } catch (error) {
        console.error("편지 가져오기 실패:", error.response?.data || error.message);
        setError(error.message || "실패 ㅋㅋ");
      }
    };
    getLetters();
  }, []);

  const openPopup = (letter) => {
    setSelectedLetter(letter);
    setIsPopupOpen(true);
  }

  const closePopup = (letter) => {
    setSelectedLetter(null);
    setIsPopupOpen(false);
  }

  return (
    <main className="main">
      <div className="content-container">
        <h1 className="heading">~{user.name}의 편지 목록~</h1>
        <div className="subbox">
          {letters.length === 0 ? (
            <p>편지가 없습니다.</p>
          ) : (
            <ul>
              {letters.map((letter, index) => (
                <li key={letter.id}
                  onClick={()=> openPopup(letter)}
                  className={`letter-item ${selectedLetter?.id === letter.id ? "selected":""}`}
                >
                  <p>편지 번호: {index + 1}</p>
                  <p>작성일: {new Date(letter.addedAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}

          {isPopupOpen && (
            <div className="myletter-popup">
              <div className="myletter-popup-content">
                <button className="myletter-popup-close" onClick={closePopup}>
                  x
                </button>
                {selectedLetter?.content ? (
                  <img
                    src={selectedLetter.content}
                    className="myletter-popup-image"
                  />
                ) : (
                  <p>이미지 불러오기 실패~</p>
                )}
              </div>
            </div>
          )}
        {/* 휴지통 */}
        {selectedLetter && (
          <div>
            <h2>선택된 편지</h2>
            {selectedLetter.content ? (
              <img src={selectedLetter.content} alt="Selected Letter" />
            ) : (
              <p>편지 내용을 불러올 수 없습니다.</p>
            )}
            <div className="trash-container" onClick={handleTrashClick}>
              <img src={trashIcon} alt="Trash Icon" className="trash-icon" />
            </div>
          </div>
        )}
        </div>
      </div>
    </main>
  );
};

export default MyLetters;