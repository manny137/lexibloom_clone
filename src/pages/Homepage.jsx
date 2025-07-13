import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import CTASection from '../components/CTASection';
import LexiBloomTitle from '../components/LexiBloomTitle';
import logo from '../assets/logo.png.jpeg';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth scrolling for hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Mobile menu toggle
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

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Intersection observer animation for feature cards
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

    // Hero parallax scroll
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });

    // CTA button hover
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.05)';
      });
      button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Escape key closes nav menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navLinks.classList.remove('active');
      }
    });

    // Accessibility outlines on focus
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
          <LexiBloomTitle />
          <p>Empowering digital accessibility with AI-powered tools that make content readable, understandable, and engaging for everyone.</p>
          <Link to="/features" className="cta-button">Explore Features</Link>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Accessibility Features</h2>
        <div className="features-grid">
          <Link to="/features#dyslexia-friendly-reader">
            <FeatureCard icon="👁️" title="Dyslexia-Friendly Reader" desc="Specially designed reading interface with customizable fonts, spacing, and colors." />
          </Link>

          <a href="https://d79e5b803146.ngrok-free.app/" target="_blank" rel="noopener noreferrer">
            <FeatureCard icon="✨" title="Text Simplifier" desc="AI-powered text simplification that breaks down complex sentences." />
          </a>

          <Link to="/features#text-to-speech">
            <FeatureCard icon="🔊" title="Text-to-Speech" desc="Natural-sounding voice synthesis that reads aloud with adjustable speed." />
          </Link>

          <Link to="/features#ocr-technology">
            <FeatureCard icon="📷" title="OCR Technology" desc="Advanced OCR extracts text from images and printed material." />
          </Link>

          <Link to="/features#eye-tracking">
            <FeatureCard icon="👀" title="Eye-Tracking" desc="Monitors focus and suggests simplification based on user engagement." />
          </Link>

          <Link to="/features#smart-adaptation">
            <FeatureCard icon="🎯" title="Smart Adaptation" desc="Content adapts layout based on your reading patterns and needs." />
          </Link>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-container">
          <div className="about-content">
            <h2>About Us</h2>
            <p>Lexibloom is an AI-powered website that makes digital content more accessible for differently abled users.</p>
            <p>It offers features like a dyslexia-friendly reader, text simplifier, text-to-speech, OCR, and eye-tracking to improve reading, understanding, and engagement.</p>
          </div>
          <div className="about-visual">
            <div className="about-visual-content">
              <img src={logo} alt="Lexibloom Logo" className="about-logo" />
            </div>
          </div>
        </div>
      </section>

      <div className="feature-benefits">
        <h3>Benefits for Dyslexic Users</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            📚
            <h4>Accessible Text Formats</h4>
            <p>Custom fonts, spacing, and layout improve clarity and ease of reading.</p>
          </div>
          <div className="benefit-item">
            🧠
            <h4>Smart Text Simplification</h4>
            <p>AI simplifies complex words and sentences to improve understanding.</p>
          </div>
          <div className="benefit-item">
            🗣️
            <h4>Text-to-Speech Support</h4>
            <p>Natural-sounding voice playback helps with word recognition and fluency.</p>
          </div>
          <div className="benefit-item">
            👁️‍🗨️
            <h4>Visual Focus Aids</h4>
            <p>Guided highlighting and eye-tracking reduce distractions and maintain focus.</p>
          </div>
          <div className="benefit-item">
            🎯
            <h4>Improved Learning Outcomes</h4>
            <p>Better comprehension, faster reading, and more confidence in academic tasks.</p>
          </div>
        </div>
      </div>

      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
