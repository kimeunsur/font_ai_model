import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bononukki from "../styles/aaa.png";

const FinalLetter = () => {
  const location = useLocation();
  const {ImageData} = location.state || {};
  const navigate = useNavigate();

  const gotoLetterStorage = () => {
    navigate("/my-letters");
  }



  return (
    <main className="main">
      <div
        style={{hieght: "100vh", display: "flex", flexDirection:"column", justifyContent: "center", alignItems:"center", overflow:"hidden"}}

      >
        <label className="output-label"
          style={{
            display: "block",
            marginBottom: "10px",
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          최종편지다 이 말이야
        </label>
          {ImageData ? (
            <img src={ImageData} 
              alt="Final Letter"
              style = {{
                maxHeight: "50vh",
                height: "auto",
                width: "auto",
                display: "block",
                objectFit: "contain",
                marginRight: "50px",                
                marginLeft: "80px",    
                marginTop: "50px"            
              }}
            />
          ) : (
            <p>전달된 데이터가 없습니다</p>
          )}
        </div>
        <button onClick={gotoLetterStorage} style={{ background: "none", border: "none",  padding: "10px 20px", fontSize: "16px" }}>
          <img className="button-image" src={bononukki}/>
        </button>
      </main>
  );
};

export default FinalLetter;