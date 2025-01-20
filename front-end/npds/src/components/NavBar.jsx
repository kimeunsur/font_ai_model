import React from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>NPDS</h1>
      </div>
      <div className="navbar-right">
        {user && (
          <div className="user-info">
            <span>{`${user.name} 님`}</span>
            <p className="logout-button" onClick={handleLogout}>
              로그아웃할거면 하든가
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
