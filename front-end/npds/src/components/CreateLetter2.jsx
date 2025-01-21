import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/CreateLetter2.css";

// 이미지 경로를 불러옵니다.
import letterBackground111 from "../data/letterbackground111.jpg";
import letterBackground222 from "../data/letterbackground222.jpg";
import letterBackground333 from "../data/letterbackground333.jpg";

const CreateLetter2 = () => {
  const location = useLocation();
  const { gptResponse, textToImageInput } = location.state || {};

  // 이미지 배열
  const images = [letterBackground111, letterBackground222, letterBackground333];

  // 상태 관리
  const [selectedText, setSelectedText] = useState(""); // 선택된 텍스트
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지

  return (
    <main className="main">
      <div className="output-section">
        {/* 첫 번째 그룹 */}
        <div className="output-group">
          <label className="output-label">GPT 생성 답변</label>
          {gptResponse && gptResponse.length > 0 ? (
            gptResponse.map((response, index) => (
              <p
                key={index}
                className={`output-text ${selectedText === response ? "selected" : ""}`}
                onClick={() => setSelectedText(response)}
              >
                {`${response}`}
              </p>
            ))
          ) : (
            <p className="output-text">데이터 없음</p>
          )}
        </div>

        {/* 두 번째 그룹 */}
        <div className="output-group">
          <label className="output-label">Text-to-Image Output:</label>
          <div className="image-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Generated Background ${index + 1}`}
                className={`output-image ${selectedImage === image ? "selected" : ""}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* 세 번째 그룹 */}
        <div className="output-group">
          <label className="output-label">Preview & Edit:</label>
          <div
            className="preview-container"
            style={{
              backgroundImage: `url(${selectedImage})`,
              height: "400px",
              position: "relative",
            }}
          >
            <textarea
              className="editable-text"
              value={selectedText}
              onChange={(e) => setSelectedText(e.target.value)}
              placeholder="텍스트를 입력하거나 선택하세요"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateLetter2;
