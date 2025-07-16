import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import TextToSpeech from '../components/TextToSpeech';
import EyeTracking from '../components/EyeTracking';

const ADHDFeaturesPage = () => {
  return (
    <div className="adhd-mode dark">
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1>ADHD-Focused Tools</h1>
          <p>Stay engaged and reduce distractions with features designed for attention support.</p>
        </div>
      </section>
       <section className="feature-section" id="text-to-speech">
          <div className="feature-header">
            <div className="feature-info">
              <h2>Text-to-Speech</h2>
              <p>
                Let LexiBloom read the text aloud for you! Upload or enter text and
                listen to it spoken clearly, helping users with reading difficulties or for convenience.
              </p>
            </div>
            <div className="feature-visual">
              <div className="feature-visual-content">🔊</div>
            </div>
          </div>
          <TextToSpeech />
        </section>
        <section className="feature-section" id="eye-tracking">
          <div className="feature-header">
            <div className="feature-info">
              <h2>Eye Tracking & Focus Detection</h2>
              <p>
                LexiBloom uses camera-based eye-tracking to monitor your gaze and attention while reading.
              </p>
            </div>
          
            <div className="feature-visual">
              <div className="feature-visual-content">👁️</div>
            </div>
          </div>
          
          <EyeTracking />
        </section>
      


      <section className="feature-section">
        <h2>🧘 Focus Mode</h2>
        <p>Minimal interface to avoid distractions and maintain attention while reading or working.</p>
      </section>

      <section className="feature-section">
        <h2>📌 Sticky Highlights</h2>
        <p>Highlight and pin important content to stay oriented.</p>
      </section>

      <section className="feature-section">
        <h2>⏱️ Pomodoro Timer</h2>
        <p>Break down tasks into focused intervals with rest in between.</p>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ADHDFeaturesPage; 