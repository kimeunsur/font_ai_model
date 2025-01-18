import React, { useState } from "react";

const StartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const handleButtonClick = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8">
          니편대써: 니 편지 대충 써줌(NPDS)
          <br />
          "뭐, 대충 해줄 테니까 감성 그런 거 기대하지 마"
        </h1>
        <button
          onClick={handleButtonClick}
          className="text-5xl py-6 px-12 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          시작하기
        </button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">로그인</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="아이디"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                로그인
              </button>
            </form>
            <button
              onClick={closeModal}
              className="mt-4 text-gray-500 hover:underline"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default StartPage;
