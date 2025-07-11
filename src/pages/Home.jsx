// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import CTASection from '../components/CTASection'; // Optional CTA component

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Lexibloom</h1>
          <p>
            Empowering digital accessibility with AI-powered tools that make content readable, understandable, and engaging for everyone.
          </p>
          <Link to="/features" className="cta-button">Explore Features</Link>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Accessibility Features</h2>
        <div className="features-grid">
          <FeatureCard icon="👁️" title="Dyslexia-Friendly Reader" desc="Specially designed reading interface with customizable fonts, spacing, and colors to reduce reading difficulties and improve comprehension." />
          <FeatureCard icon="✨" title="Text Simplifier" desc="AI-powered text simplification that breaks down complex sentences into clearer language while maintaining the original meaning." />
          <FeatureCard icon="🔊" title="Text-to-Speech" desc="Natural-sounding voice synthesis that reads content aloud with adjustable speed and tone." />
          <FeatureCard icon="📷" title="OCR Technology" desc="Advanced OCR extracts text from images and documents, making printed content accessible." />
          <FeatureCard icon="👀" title="Eye-Tracking" desc="Monitors reading patterns and provides personalized suggestions to improve comprehension." />
          <FeatureCard icon="🎯" title="Smart Adaptation" desc="AI adapts the content layout based on user behavior for personalized accessibility." />
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-container">
          <div className="about-content">
            <h2>Making Digital Content Accessible</h2>
            <p>Lexibloom is revolutionizing digital accessibility using cutting-edge AI to create inclusive reading experiences for diverse learners.</p>
            <p>We adapt to your needs — whether it's dyslexia, visual impairments, or different learning preferences.</p>
            <p>Join thousands who trust Lexibloom to deliver human-centered accessible tech.</p>
          </div>
          <div className="about-visual">
            <div className="about-visual-content">🚀</div>
          </div>
        </div>
      </section>

      <CTASection /> {/* You can customize or remove if not using this */}

      <Footer />
    </>
  );
};

export default Home;

