import React from "react";

const CreateLetter = () => {
  return (
    <main 
    className="min-h-screen flex items-center justify-center"
    style={{
        backgroundImage: `url("/bonobonoface.jpg")`, // public 폴더 기준
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-4xl font-bold">
        와! 편지 생성 페이지!
      </h1>
    </main>
  );
};

export default CreateLetter;
