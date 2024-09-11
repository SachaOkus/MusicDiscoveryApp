import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">My Music App</div>
      <nav className="header__nav">
        <Link to="/" className="header__link">
          Home
        </Link>
        <Link to="/discover" className="header__link">
          Discover
        </Link>
      </nav>
    </header>
  );
};

export default Header;
