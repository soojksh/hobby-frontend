import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import {
  FaHome,
  FaBars,
  FaMusic,
  FaBookOpen,
  FaVideo,
  FaMountain,
} from "react-icons/fa";
import BioCard from "./BioCard"; // Adjust the path as needed
import Modal from "@mui/joy/Modal"; // Import the MUI modal if not done already
import ModalDialog from "@mui/joy/ModalDialog";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMobile(!isMobile);
  };

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <div className="footer-logo">
            <Link to="/">
              <img
                src="sh.png"
                alt="Sooj Hobby"
                className="footer-logo-image"
              />
              <span className="footer-logo-text"></span>
            </Link>
          </div>
        </div>
        <div className="navbar-menu-icon" onClick={handleMenuClick}>
          <FaBars />
        </div>
        <div className={isMobile ? "navbar-links mobile" : "navbar-links"}>
          <Link to="/">
            <FaHome /> Home
          </Link>
          <Link to="/books">
            <FaBookOpen /> Books
          </Link>
          <Link to="/movies">
            <FaVideo /> Movies
          </Link>
          <Link to="/songs">
            <FaMusic /> Songs
          </Link>
          <Link to="/places">
            <FaMountain /> Places
          </Link>

          {/* <div className="navbar-search mobile">
            <input type="text" placeholder="Search..." />
          </div> */}
          <div className="navbar-profile" onClick={handleProfileClick}>
            <img src="sujan.jpg" alt="Profile" />
            <div className="navbar-profile-info">
              <p>Sooj Ksh</p>
              <small>Developer</small>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for BioCard */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        {/* <ModalDialog> */}
        <BioCard />
        {/* </ModalDialog> */}
      </Modal>
    </nav>
  );
};

export default Navbar;
