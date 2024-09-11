import "./Footer.scss"; // Import your SCSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 My Music App</p>
      <nav>
        <a href="/about" className="footer__link">
          About
        </a>
        <a href="/contact" className="footer__link">
          Contact
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
