// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { FontProvider } from "./FontContext"; // FontProvider 추가
import Layout from "../src/components/Layout";
import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";
import CreateLetter from "./components/CreateLetter";
import CreateLetter2 from "./components/CreateLetter2";
import MyFonts from "./components/MyFonts";
import CreateFont from "./components/CreateFont";
import CreateFont2 from "./components/CreateFont2";
import MyLetters from "./components/MyLetters";
import FinalLetter from "./components/FinalLetter";
import "./App.css";

const App = () => {
  return (
    <UserProvider>
      <FontProvider> {/* FontProvider로 감싸기 */}
        <Routes>
          <Route path="/" element={<StartPage />} />

          <Route element={<Layout />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/create-letter" element={<CreateLetter />} />
            <Route path="/create-letter-2" element={<CreateLetter2 />} />
            <Route path="/my-fonts" element={<MyFonts />} />
            <Route path="/create-font" element={<CreateFont />} />
            <Route path="/create-font2" element={<CreateFont2 />} />
            <Route path="/my-letters" element={<MyLetters />} />
            <Route path="/final-letter" element={<FinalLetter />} />
          </Route>
        </Routes>
      </FontProvider>
    </UserProvider>
  );
};

export default App;
