import React, {useState} from "react";
import { loginUser } from "../systems/request";

const LoginModal = ({ isOpen, onClose, onSignUp, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      console.log("로그인 성공:",data);
    } catch (error) {
      console.error("로그인 실패:", error);
      setError(error.response?.data?.message || "개같이 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            id="email"
            type="email"
            placeholder="메일주소"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
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
