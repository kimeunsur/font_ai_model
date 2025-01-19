import React, { useState } from "react";
import { loginUser } from "../systems/request";
import "../styles/LoginModal.css";
import kakaotalkLogo1 from "../styles/KakaoTalk_logo.svg";
import closeX from "../styles/close-x.svg";

const LoginModal = ({ isOpen, onClose, onSignUp, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      console.log("로그인 성공:", data);
      if (onLoginSuccess) onLoginSuccess(data);
    } catch (error) {
      console.error("로그인 실패:", error);
      setError(error.response?.data?.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="close-button">
          <img className="close-icon" alt="close x" src={closeX} />
        </button>

        {/* 헤더 */}
        <div className="modal-header">
          <h2 className="modal-title">로그인</h2>
        </div>

        {/* 폼 */}
        <form className="form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="메일 주소를 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className={`submit-button ${loading ? "disabled" : ""}`}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <hr className="divider-line" />
          <span className="divider-text">혹은</span>
          <hr className="divider-line" />
        </div>

        {/* 카카오톡 로그인 */}
        <div className="kakao-login">
          <img className="kakao-icon" alt="Kakaotalk logo" src={kakaotalkLogo1} />
          <span className="kakao-text">카카오톡으로 시작하기</span>
        </div>

        {/* 회원가입 */}
        <div className="signup-container">
          <p>
            아직 회원이 아니신가요?{" "}
            <button onClick={onSignUp} className="signup-link">
              가입하기
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
