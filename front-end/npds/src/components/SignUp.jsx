import React from "react";

const SignUp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">회원가입</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="이메일"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            회원가입
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:underline"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
