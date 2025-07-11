// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css'; // or your combined CSS file

const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">Lexibloom</Link>
        <ul className="nav-links" id="navLinks">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#Contact">Contact</a></li>
        </ul>
        <button className="menu-toggle" id="menuToggle">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
