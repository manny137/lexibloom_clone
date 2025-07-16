import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/logo.png.jpeg'; // ✅ Confirm this path
import '../styles/home.css'; // ✅ Make sure CSS exists and has styles for navbar

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to section when on /home and clicking hash link
  const scrollToSection = (id) => {
    if (location.pathname !== '/home') {
      // Navigate to /home and scroll after short delay
      navigate('/home');
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Wait for DOM to load
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartKeyboard = async () => {
  setLoading(true);
  try {
    const response = await fetch("http://127.0.0.1:5000/start-keyboard");
    const data = await response.json();
    if (data.status === "success") {
      alert(data.message);
    } else {
      alert("Failed to start keyboard");
    }
  } catch (error) {
    console.error(error);
    alert("Error connecting to backend");
  }
  setLoading(false);
};


  // Toggle mobile menu
  useEffect(() => {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    const handleToggle = () => {
      navLinks.classList.toggle('active');
    };

    if (toggle) toggle.addEventListener('click', handleToggle);
    return () => {
      if (toggle) toggle.removeEventListener('click', handleToggle);
    };
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
          <li><button className="link-btn" onClick={() => scrollToSection('about')}>About</button></li>
          <li><button className="link-btn" onClick={() => scrollToSection('contact')}>Contact</button></li>
        </ul>

        <button className="menu-toggle" id="menuToggle">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;

