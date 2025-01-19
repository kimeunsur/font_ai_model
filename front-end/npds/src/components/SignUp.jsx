import React, { useState } from "react";
import { createUser } from "../systems/request";
import closeX from "../styles/close-x.svg";

const SignUp = ({ isOpen, onClose, onLoginOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const userData = { name, email, password };
      const response = await createUser(userData);

      console.log("회원가입 성공:", response);
      setSuccess(true);

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("회원가입 실패", error);
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[520px] max-w-full relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-700"
        >
          <img className="w-6 h-6" alt="close x" src={closeX} />
        </button>

        {/* 헤더 부분 */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-[#333333] mt-4">회원가입</h2>
        </div>

        {/* 폼 부분 */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            id="email"
            type="email"
            placeholder="메일 주소를 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 rounded text-white bg-green-500 hover:bg-green-600"
          >
            회원가입
          </button>
        </form>

        {/* 하단 링크 */}
        <div className="text-center mt-6">
          <p className="text-gray-500">
            이미 계정이 있으신가요?{" "}
            <button
              onClick={() => {
                onClose(); // 회원가입 모달 닫기
                onLoginOpen(); // 로그인 모달 열기
              }}
              className="text-blue-500 underline hover:text-blue-700"
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
