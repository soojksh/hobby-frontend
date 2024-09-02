import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-logo">
            <img src="sh.png" alt="Demo" className="footer-logo-image" />
            <span className="footer-logo-text"></span>
          </div>
          <nav className="footer-nav">
            <a href="#about" className="footer-nav-link">
              About
            </a>
            <a href="#privacy" className="footer-nav-link">
              Privacy Policy
            </a>
            <a href="#licensing" className="footer-nav-link">
              Licensing
            </a>
            <a href="#contact" className="footer-nav-link">
              Contact
            </a>
          </nav>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Hobby™
        </div>
        <br />
      </div>
    </footer>
  );
};

export default Footer;
