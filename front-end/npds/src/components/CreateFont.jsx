import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateFont = () => {
  const [selectedFile, setSelectedFile] = useState(null); // 파일 상태 관리
  const navigate = useNavigate(); // 리디렉션을 위한 useNavigate

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // 선택된 파일 저장
  };

  // 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("파일을 선택해 주세요.");
      return;
    }

    // 파일 제출 로직 (서버로 파일 업로드 등)
    console.log("제출된 파일:", selectedFile);

    // 제출 후 다른 페이지로 리디렉션
    navigate("/create-font2", { state: { file: selectedFile } });
  };

  return (
    <main className="main">
      <h1 className="heading">와! 폰트 생성 페이지!</h1>
      <p>양식에 맞추어 파일 or 폴더를 첨부해 주세요:</p>

      <form className="upload-form" onSubmit={handleSubmit}>
        {/* 파일 업로드 */}
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          accept=".zip,.rar,.7z" // 허용할 파일 형식
        />

        {/* 제출 버튼 */}
        <button type="submit" className="submit-button">
          제출하기
        </button>
      </form>
    </main>
  );
};

export default CreateFont;
