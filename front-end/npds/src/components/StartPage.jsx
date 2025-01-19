import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUp from "./SignUp";
import bononukki from "../styles/bononukki.png"
import background from "../styles/background.jpg";

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
    <div
      style={{
        backgroundImage: `url(${background})`, // 이미지 경로를 동적으로 지정
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      
      <div className="absolute w-[436px] h-[1054px] -top-4 left-0">
        <div className="absolute w-[170px] h-[1024px] top-[15px] left-0 [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[220px] text-center tracking-[0] leading-[normal]">
          N<br />P<br />D<br />S
        </div>

        <div className="w-[170px] h-64 top-0 left-[115px] text-black text-[220px] whitespace-nowrap absolute [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
          ㅣ
        </div>

        <div className="w-[170px] h-64 top-[256px] left-[115px] text-black text-[220px] whitespace-nowrap absolute [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
          ㅕ
        </div>

        <div className="w-[170px] h-64 top-[256px] left-[266px] text-black text-[220px] whitespace-nowrap absolute [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
          ㄴ
        </div>

        <div className="w-[170px] h-64 top-[512px] left-[115px] text-black text-[220px] whitespace-nowrap absolute [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
          ㅐ
        </div>

        <div className="w-[170px] h-64 top-[768px] left-[115px] text-black text-[220px] whitespace-nowrap absolute [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
          ㅓ
        </div>

        {/* <div className="absolute w-[170px] h-64 top-[798px] left-[115px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[220px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
          S
        </div> */}
      </div>

      <div className="w-[810px] h-[266px] top-[298px] left-[630px] text-black text-[220px] absolute [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
        니편대써
      </div>

      <div className="h-[116px] top-[564px] left-[720px] text-black text-8xl absolute [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
        니 편지 대신 써줌
      </div>

      <div
        className="absolute w-[496px] h-[114px] top-[794px] left-[924px] bg-[#111111]"
        onClick={openLoginModal}
      >
        <div className="w-[496px] h-28 top-px left-0 text-white text-[64px] absolute [font-family:'Inter-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal]">
          시작하기
        </div>
      </div>

      <img
        className="absolute w-[284px] h-[313px] top-[711px] left-[578px] object-cover"
        alt="Bononukki"
        src={bononukki}
      />
      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeAllModals}
        onSignUp={openSignUpModal}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 회원가입 모달 */}
      <SignUp
        isOpen={isSignUpModalOpen}
        onClose={closeAllModals}
        onLoginOpen={openLoginModal}
      />
    </div>

  );
};

export default StartPage;
