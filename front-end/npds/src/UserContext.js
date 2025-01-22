import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";

// 기본 사용자 정보 설정
const UserContext = createContext(null);

// 사용자 정보 제공하는 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser ({
            id: decodedToken.id,
            name: decodedToken.name,
          });
        }
      } catch (error) {
        console.error("jwt 가져오기 실패~,,",error);
      } 
    }
    setLoading(false);
  }, []);

  // 로그인 시 사용자 정보 업데이트
  const loginUser = (token) => {
    const decodedToken = jwtDecode(token);
    setUser({
      id: decodedToken.id,
      name: decodedToken.name,
    });
    localStorage.setItem("token",token);
  };

  // 로그아웃 시 사용자 정보 초기화
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
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
