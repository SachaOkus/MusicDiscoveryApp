import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss"; // Ensure this import is present

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if the side menu is open

  // Toggle the side menu when hamburger is clicked
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">My Music App</Link>
        </div>

        {/* Regular Nav Links for Large Screens */}
        <nav className="header__nav">
          <Link to="/" className="header__link">
            Home
          </Link>
          <Link to="/discover" className="header__link">
            Discover
          </Link>
        </nav>

        {/* Hamburger Icon (Visible on small screens) */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className="hamburger__line"></div>
          <div className="hamburger__line"></div>
          <div className="hamburger__line"></div>
        </div>

        {/* Side Menu for Small Screens */}
        <nav className={`side-menu ${isMenuOpen ? "side-menu--open" : ""}`}>
          <Link to="/" className="side-menu__link" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/discover" className="side-menu__link" onClick={toggleMenu}>
            Discover
          </Link>
        </nav>

        {/* Dark overlay when the menu is open */}
        {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
      </div>
    </header>
  );
};

export default Header;
