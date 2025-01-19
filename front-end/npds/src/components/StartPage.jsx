import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import bononukki from "../styles/bononukki.png";
import "../styles/StartPage.css";
// import background from "../styles/background.jpg";

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
      <div className="start-page">
        <div className="npds-container">
          <div className="npds-row">
            <div className="npds-text">N</div>
            <div className="npds-text">ㅣ</div>
          </div>
          <div className="npds-row">
            <div className="npds-text">P</div>
            <div className="npds-text">ㅕ</div>
            <div className="npds-text">ㄴ</div>
          </div>
          <div className="npds-row">
            <div className="npds-text">D</div>
            <div className="npds-text">ㅐ</div>
          </div>
          <div className="npds-row">
            <div className="npds-text">S</div>
            <div className="npds-text">ㅓ</div>
          </div>
        </div>
      <div className="npds-title">니편대써</div>
      <div className="npds-subtitle">니 편지 대신 써줌</div>

      <button className="npds-button" onClick={openLoginModal}>
        시작하기
      </button>

      <img className="bononukki-image" alt="Bononukki" src={bononukki} />

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
