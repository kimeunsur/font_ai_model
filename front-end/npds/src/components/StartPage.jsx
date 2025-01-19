import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import bononukki from "../styles/bononukki.png";
import background from "../styles/background.jpg";

const StartPage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const navigate = useNavigate();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
  };

  const handleLoginSuccess = () => {
    closeAllModals();
    navigate("/main");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <div>
          <div>N<br />P<br />D<br />S</div>
          <div>ㅣ</div>
          <div>ㅕ</div>
          <div>ㄴ</div>
          <div>ㅐ</div>
          <div>ㅓ</div>
        </div>
      </div>

      <div>니편대써</div>

      <div>니 편지 대신 써줌</div>

      <div onClick={openLoginModal}>
        <div>시작하기</div>
      </div>

      <img alt="Bononukki" src={bononukki} />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeAllModals}
        onSignUp={openSignUpModal}
        onLoginSuccess={handleLoginSuccess}
      />

      <SignUp
        isOpen={isSignUpModalOpen}
        onClose={closeAllModals}
        onLoginOpen={openLoginModal}
      />
    </div>
  );
};

export default StartPage;
