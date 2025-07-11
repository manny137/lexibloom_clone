import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import CTASection from '../components/CTASection';

const HomePage = () => {
  useEffect(() => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
        });
      });
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Reveal on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.feature-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });

    // Parallax hero
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });

    // Button hover animations
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.05)';
      });
      button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Accessibility focus outlines
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navLinks.classList.remove('active');
      }
    });

    document.querySelectorAll('a, button').forEach(element => {
      element.addEventListener('focus', function () {
        this.style.outline = '2px solid #60a5fa';
        this.style.outlineOffset = '2px';
      });
      element.addEventListener('blur', function () {
        this.style.outline = 'none';
      });
    });
  }, []);

  return (
    <div>
      <Navbar />

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Lexibloom</h1>
          <p>Empowering digital accessibility with AI-powered tools that make content readable, understandable, and engaging for everyone.</p>
          <Link to="/features" className="cta-button">Explore Features</Link>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Accessibility Features</h2>
        <div className="features-grid">
          <FeatureCard icon="👁️" title="Dyslexia-Friendly Reader" desc="Specially designed reading interface with customizable fonts, spacing, and colors." />
          <FeatureCard icon="✨" title="Text Simplifier" desc="AI-powered text simplification that breaks down complex sentences." />
          <FeatureCard icon="🔊" title="Text-to-Speech" desc="Natural-sounding voice synthesis that reads aloud with adjustable speed." />
          <FeatureCard icon="📷" title="OCR Technology" desc="Advanced OCR extracts text from images and printed material." />
          <FeatureCard icon="👀" title="Eye-Tracking" desc="Monitors focus and suggests simplification based on user engagement." />
          <FeatureCard icon="🎯" title="Smart Adaptation" desc="Content adapts layout based on your reading patterns and needs." />
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-container">
          <div className="about-content">
            <h2>Making Digital Content Accessible</h2>
            <p>Lexibloom is revolutionizing accessibility using AI and design for neurodiverse learners.</p>
            <p>We adapt to your needs — whether it’s dyslexia, visual impairments, or learning preferences.</p>
          </div>
          <div className="about-visual">
            <div className="about-visual-content">🚀</div>
          </div>
        </div>
      </section>

      <CTASection />

      <Footer />
    </div>
  );
};

export default HomePage;
