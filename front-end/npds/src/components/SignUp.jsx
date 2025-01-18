import React, { use, useState } from "react";
import { createUser } from "../systems/request";
const SignUp = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const userData = { name, email, password };
      const response = await createUser(userData);

      console.log('회원가입 성공:', response);
      setSuccess(true);

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">회원가입</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="이름"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            id="email"
            type="email"
            placeholder="apdlfwnth"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            id="passowrd"
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            required
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
