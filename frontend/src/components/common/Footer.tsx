import React from 'react';
import './Footer.css'; // CSS 파일을 불러옵니다.

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p className="footer-text">Copyright &copy; Your Website 2023</p>
      </div>
    </footer>
  );
};

export default Footer;