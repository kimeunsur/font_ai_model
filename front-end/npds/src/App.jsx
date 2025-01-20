import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import StartPage from "./components/StartPage";
import LoginModal from "./components/LoginModal";
import MainPage from "./components/MainPage";
import CreateLetter from "./components/CreateLetter";
import CreateLetter2 from "./components/CreateLetter2";
import MyFonts from "./components/MyFonts";
import MyLetters from "./components/MyLetters";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/loginpage" element={<LoginModal />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/create-letter" element={<CreateLetter />} />
        <Route path="/create-letter-2" element={<CreateLetter2 />} />
        <Route path="/my-fonts" element={<MyFonts />} />
        <Route path="/my-letters" element={<MyLetters />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
