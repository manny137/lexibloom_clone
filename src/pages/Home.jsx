import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import CTASection from '../components/CTASection'; // Optional CTA component

const Home = () => {
  const navigate = useNavigate();

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

  const goToFeature = (sectionId) => {
    navigate(`/features#${sectionId}`);
  };

  return (
    <>
      <Navbar />

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Lexibloom</h1>
          <p>
            Empowering digital accessibility with AI-powered tools that make content readable, understandable, and engaging for everyone.
          </p>
          <button onClick={() => navigate('/features')} className="cta-button">Explore Features</button>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Accessibility Features</h2>
        <div className="features-grid">
          <div onClick={() => goToFeature('dyslexia-reader')}>
            <FeatureCard icon="👁️" title="Dyslexia-Friendly Reader" desc="Specially designed reading interface with customizable fonts, spacing, and colors to reduce reading difficulties and improve comprehension." />
          </div>
          
          {/* UPDATED: Text Simplifier links to ngrok external app */}
          <div onClick={() => window.open('https://0056f0819579.ngrok-free.app/', '_blank')}>
            <FeatureCard icon="✨" title="Text Simplifier" desc="AI-powered text simplification that breaks down complex sentences into clearer language while maintaining the original meaning." />
          </div>

          <div onClick={() => goToFeature('text-to-speech')}>
            <FeatureCard icon="🔊" title="Text-to-Speech" desc="Natural-sounding voice synthesis that reads content aloud with adjustable speed and tone." />
          </div>
          <div onClick={() => goToFeature('ocr-technology')}>
            <FeatureCard icon="📷" title="OCR Technology" desc="Advanced OCR extracts text from images and documents, making printed content accessible." />
          </div>
          <div onClick={() => goToFeature('eye-tracking')}>
            <FeatureCard icon="👀" title="Eye-Tracking" desc="Monitors reading patterns and provides personalized suggestions to improve comprehension." />
          </div>
          <div onClick={() => goToFeature('smart-adaptation')}>
            <FeatureCard icon="🎯" title="Smart Adaptation" desc="AI adapts the content layout based on user behavior for personalized accessibility." />
          </div>
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

      <CTASection />
      <Footer />
    </>
  );
};

export default Home;