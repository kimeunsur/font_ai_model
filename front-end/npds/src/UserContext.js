import React, { createContext, useContext, useState, useEffect } from 'react';

// 기본 사용자 정보 설정
const UserContext = createContext(null);

// 사용자 정보 제공하는 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // localStorage에서 초기 사용자 정보를 가져옴
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 로그인 시 사용자 정보 업데이트
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 로그아웃 시 사용자 정보 초기화
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 사용자 정보 접근하는 훅
export const useUser = () => {
  return useContext(UserContext);
};
