import React, { createContext, useContext, useState } from 'react';

// 기본 사용자 정보 설정
const UserContext = createContext(null);

// 사용자 정보 제공하는 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user 상태 관리

  // 로그인 시 사용자 정보 업데이트
  const loginUser = (userData) => {
    setUser(userData);
  };

  // 로그아웃 시 사용자 정보 초기화
  const logoutUser = () => {
    setUser(null);
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
