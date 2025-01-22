import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CreateLetter2.css";
import html2canvas from "html2canvas";
import { letterStore } from "../systems/request";

const CreateLetter2 = () => {
  const location = useLocation();
  const { gptResponse, imageResponse } = location.state || {};
  const navigate = useNavigate();
  const [selectedText, setSelectedText] = useState(""); // 선택된 텍스트
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지
  const captureRef = useRef(null);

  const handleSubmit = async () => {

    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current, {
      useCORS: true,
      scale: 2,
      width: captureRef.current.offsetWidth,
      height: captureRef.current.offsetHeight,      
    });
    
    const token = localStorage.getItem("token");
    console.log("토큰~",token);
    const dataURL = canvas.toDataURL("image/png");
    await letterStore(dataURL);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "final-letter.png";
    link.click();
    console.log("저장완~:");
    navigate("/final-letter", {state: {ImageData: dataURL}});
  }

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
            {imageResponse && imageResponse.length > 0 ? (
              imageResponse.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Generated Background ${index + 1}`}
                className={`output-image ${selectedImage === image ? "selected" : ""}`}
                onClick={() => setSelectedImage(image)}
              />                
              ))
            ) : (
              <p>데이터 없음</p>
            )}
          </div>
        </div>

        {/* 세 번째 그룹 */}
        <div className="output-group">
          <label className="output-label">Preview & Edit:</label>
          <div ref={captureRef}>
            <div
              className="preview-container"
              style={{
                backgroundImage: `url(${selectedImage})`,
                height: "400px",
                position: "relative",
                padding: "10px",
                boxSizing: "border-box",
                overflow: "hidden"
              }}
            >
              <div
                className="editable-text"
                contentEditable
                suppressContentEditableWarning
                style={{
                  width: "100%",
                  height: "100%",
                  justifyItems: "center",
                  
                  lineHeight: "1.5",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  overflow: "hidden"
                }}
                onChange={(e) => setSelectedText(e.target.value)}
              >
                {selectedText || "텍스트를 입력하거나 선택하세요"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit}>이걸 카톡으로 보낼게!</button>
    </main>
  );
};

export default CreateLetter2;
