import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">My Music App</Link>
        </div>

        <nav className="header__nav">
          <Link to="/" className="header__link">
            Home
          </Link>
          <Link to="/discover" className="header__link">
            Discover
          </Link>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="hamburger__line"></div>
          <div className="hamburger__line"></div>
          <div className="hamburger__line"></div>
        </div>

        <nav className={`side-menu ${isMenuOpen ? "side-menu--open" : ""}`}>
          <Link to="/" className="side-menu__link" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/discover" className="side-menu__link" onClick={toggleMenu}>
            Discover
          </Link>
        </nav>

        {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
      </div>
    </header>
  );
};

export default Header;
