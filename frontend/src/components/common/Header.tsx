import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav className="header-nav">
      <div className="header-container">
       <h1>헤더입니다.</h1>
      </div>
    </nav>
  );
};

export default Header;
