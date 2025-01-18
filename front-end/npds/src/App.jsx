import React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import LoginModal from "./components/LoginModal";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <Routes>
      {/* StartPage는 기본 경로("/")에서 렌더링 */}
      <Route path="/" element={<StartPage />} />

      {/* LoginPage는 "/loginpage" 경로에서 렌더링 */}
      <Route path="/loginpage" element={<LoginModal />} />

      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
};

export default App;
