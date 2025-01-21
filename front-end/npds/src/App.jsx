import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Layout from "../src/components/Layout";
import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";
import CreateLetter from "./components/CreateLetter";
import CreateLetter2 from "./components/CreateLetter2";
import MyFonts from "./components/MyFonts";
import CreateFont from "./components/CreateFont";
import MyLetters from "./components/MyLetters";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<StartPage />} />

        <Route element={<Layout />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/create-letter" element={<CreateLetter />} />
          <Route path="/create-letter-2" element={<CreateLetter2 />} />
          <Route path="/my-fonts" element={<MyFonts />} />
          <Route path="/create-font" element={<CreateFont />} />
          <Route path="/my-letters" element={<MyLetters />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
