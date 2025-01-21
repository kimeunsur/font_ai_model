import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateLetter.css"; // CSS 파일을 가져옵니다.
import { GptResponse, ImageResponse } from "../systems/request";

const CreateLetter = () => {
  const [gptInput, setGptInput] = useState("");
  const [textToImageInput, setTextToImageInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
  try {
    event.preventDefault();
      console.log("GPT Input:", gptInput);
      console.log("Text-to-Image Input:", textToImageInput);

      //gpt
      const question = gptInput;
      const gptResponse = await GptResponse(question);
      console.log("gpt 답변 가져오기 성공~: ", gptResponse);

      //stability ai
      const prompt = {
        prompt: textToImageInput || "puppy",
        width: 512,
        height: 512,
        samples: 3,
        steps: 50,
      };
    
      const imageResponse = await ImageResponse(prompt);
      console.log("이미지 생성 성공~:", imageResponse);


      const requestData = {
        gptResponse,
        imageResponse,
      };navigate("/create-letter-2", {state: requestData});
  } catch (error) {
      console.error("handleSubmit에서 오류 발생:", error);
      alert("요청 처리 중 문제가 발생했습니다. 다시 시도해 주세요!");
    }
  };

  return (
    <main className="main">
      {/* 화면 좌측 상단 제목 */}
      <h1 className="heading">대충 편지 생성 제목</h1>

      {/* 입력 영역 */}
      <div className="input-section">
        <div className="input-group">
          <label htmlFor="gptInput" className="input-label">
            글 적어주는 GPT
          </label>
          <input
            type="text"
            id="gptInput"
            className="text-input"
            placeholder="무물보~"
            value={gptInput}
            onChange={(e) => setGptInput(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="textToImageInput" className="input-label">
            편지배경 생성해주는 TextToImage
          </label>
          <input
            type="text"
            id="textToImageInput"
            className="text-input"
            placeholder="무물보~"
            value={textToImageInput}
            onChange={(e) => setTextToImageInput(e.target.value)}
          />
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          생성
        </button>
      </div>
    </main>
  );
};

export default CreateLetter;