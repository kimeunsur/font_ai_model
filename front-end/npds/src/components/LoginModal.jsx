import React from "react";

const LoginModal = ({ isOpen, onClose, onSignUp, onLoginSuccess }) => {
  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 성공 처리 (테스트용)
    console.log("로그인 성공!");
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
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
        <button onClick={onClose} className="mt-4 text-gray-500 hover:underline">
          닫기
        </button>
        <button
          onClick={onSignUp}
          className="mt-2 w-full bg-white text-blue-500 border border-blue-500 py-2 rounded hover:bg-blue-100"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
