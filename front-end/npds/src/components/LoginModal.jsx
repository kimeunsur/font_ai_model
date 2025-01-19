import React, { useState } from "react";
import { loginUser } from "../systems/request";
import { Button } from "./ui/Button";
import { Divider } from "./ui/Divider";
import { TextField } from "./ui/TextField";
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
          <h2 className="text-2xl font-bold text-[#333333] mt-4">로그인</h2>
        </div>

        {/* 폼 부분 */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* <TextField
            className="w-full"
            hasErrorMessage={false}
            property1="generic-text-field"
            text="메일 주소를 입력하세요"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="w-full"
            hasErrorMessage={false}
            property1="generic-text-field"
            text="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <TextField
            className="w-full"
            text="메일 주소를 입력하세요"
            value={email} // 상태 전달
            onChange={(e) => setEmail(e.target.value)} // 상태 업데이트
          />
          <TextField
            className="w-full"
            text="비밀번호를 입력하세요"
            value={password} // 상태 전달
            onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            className={`w-full py-2 rounded text-white bg-blue-500 hover:bg-blue-600 ${
              loading ? "opacity-50" : ""
            }`}
            frameClassName=""
            text={loading ? "로그인 중..." : "로그인"}
            disabled={loading}
          />
        </form>

        <Divider
          className="mt-6"
          divClassName="italic text-gray-500 text-center"
          text="혹은"
        />

        {/* 카카오톡 로그인 */}
        <div className="flex items-center justify-center mt-6 gap-4 border border-gray-300 py-3 rounded-md cursor-pointer hover:bg-gray-100">
          <img className="w-6 h-6" alt="Kakaotalk logo" src={kakaotalkLogo1} />
          <span className="text-gray-700">카카오톡으로 시작하기</span>
        </div>

        {/* 회원가입 */}
        <div className="text-center mt-6">
          <p className="text-gray-500">
            아직 회원이 아니신가요?{" "}
            <button
              onClick={onSignUp}
              className="text-blue-500 underline hover:text-blue-700"
            >
              가입하기
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;


// import React, {useState} from "react";
// import { loginUser } from "../systems/request";

// const LoginModal = ({ isOpen, onClose, onSignUp, onLoginSuccess }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   if (!isOpen) return null;

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await loginUser(email, password);
//       console.log("로그인 성공:",data);
//     } catch (error) {
//       console.error("로그인 실패:", error);
//       setError(error.response?.data?.message || "개같이 실패");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">로그인</h2>
//         <form className="space-y-4" onSubmit={handleLogin}>
//           <input
//             id="email"
//             type="email"
//             placeholder="메일주소"
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <input
//             id="password"
//             type="password"
//             placeholder="비밀번호"
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             로그인
//           </button>
//         </form>
//         <button onClick={onClose} className="mt-4 text-gray-500 hover:underline">
//           닫기
//         </button>
//         <button
//           onClick={onSignUp}
//           className="mt-2 w-full bg-white text-blue-500 border border-blue-500 py-2 rounded hover:bg-blue-100"
//         >
//           회원가입
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;