import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoIcon from '../assets/logo.png.jpeg'; // ✅ Make sure the filename & path are correct
import '../styles/home.css'; // your global CSS file

const Navbar = () => {
  const location = useLocation();

  // Scroll to section when hash link is clicked
  const scrollToSection = (id) => {
    if (location.pathname === '/home') {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Toggle mobile menu
  useEffect(() => {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    const handleToggle = () => {
      navLinks.classList.toggle('active');
    };

    toggle.addEventListener('click', handleToggle);
    return () => toggle.removeEventListener('click', handleToggle);
  }, []);

  return (
    <nav id="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <img src={logoIcon} alt="Lexibloom logo" className="logo-img" />
          <Link to="/" className="logo">Lexibloom</Link>
        </div>

        <ul className="nav-links" id="navLinks">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li>
            <Link
              to="/home#about"
              onClick={() => scrollToSection('about')}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/home#contact"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Link>
          </li>
        </ul>
        <button className="menu-toggle" id="menuToggle">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
