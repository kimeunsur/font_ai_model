import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";

const StartPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달 상태
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // 회원가입 모달 상태
  const navigate = useNavigate();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false); // 회원가입 모달 닫기
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false); // 로그인 모달 닫기
  };

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
  };

  const handleLoginSuccess = () => {
    closeAllModals();
    navigate("/main"); // Navigate to MainPage
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
          onClick={openLoginModal}
          className="text-5xl py-6 px-12 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          시작하기
        </button>
      </div>

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeAllModals}
        onSignUp={openSignUpModal}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 회원가입 모달 */}
      <SignUp isOpen={isSignUpModalOpen} onClose={closeAllModals} />
    </main>
  );
};

export default StartPage;
