import React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import AnotherPage from "./components/AnotherPage";

const App = () => {
  return (
    <Routes>
      {/* StartPage는 기본 경로("/")에서 렌더링 */}
      <Route path="/" element={<StartPage />} />

      {/* AnotherPage는 "/another" 경로에서 렌더링 */}
      <Route path="/another" element={<AnotherPage />} />
    </Routes>
  );
};

export default App;
