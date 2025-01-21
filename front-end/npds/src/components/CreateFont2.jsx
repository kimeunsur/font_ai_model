import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CreateFont2 = () => {
  const location = useLocation();
  const file = location.state?.file; // 전달받은 파일 정보
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (file) {
        console.log("받은 파일:", file);

        const formData = new FormData();
        formData.append("file", file);
        setFileName(file.name);
        // 이러고 body에 formData 담아서 보내면됨
    }
  }, [file]);

  return (
    <main className="main">
      <h1 className="heading">제출 완료됨 ㅇ ㅇ</h1>
      <p>니가 제출한 파일: {fileName || "파일 없음"}</p>
      <p>그걸 기반으로 생성한 폰트: (GPT 해줘~)</p>
    </main>
  );
};

export default CreateFont2;
