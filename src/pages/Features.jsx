import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import '../styles/features.css';
import OCRContainer from '../components/OCRContainer';
import EyeTracking from '../components/EyeTracking';

const FeaturesPage = () => {
  const [inputText, setInputText] = useState('');
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(1);
  const [wordSpacing, setWordSpacing] = useState(2);
  const [fontFamily, setFontFamily] = useState('Default');
  const [theme, setTheme] = useState('dark');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('text')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputText(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a plain text (.txt) file.');
    }
  };

  const formattedStyle = {
    fontSize: `${fontSize}px`,
    lineHeight,
    letterSpacing: `${letterSpacing}px`,
    wordSpacing: `${wordSpacing}px`,
    fontFamily:
      fontFamily === 'Default'
        ? 'sans-serif'
        : fontFamily === 'OpenDyslexic'
        ? 'OpenDyslexic, sans-serif'
        : `${fontFamily}, sans-serif`,
    backgroundColor: theme === 'dark' ? '#111' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
    padding: '1rem',
    borderRadius: '8px',
    marginTop: '1rem'
  };

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>Powerful Accessibility Features</h1>
          <p>
            Discover how Lexibloom's AI-powered tools transform digital content into accessible,
            engaging experiences.
          </p>
        </div>
      </section>

      <section className="features-nav">
        <div className="features-nav-container">
          <ul className="features-nav-list">
            <li><a href="#dyslexia-reader" className="nav-item active">Dyslexia Reader</a></li>
            <li><a href="#text-simplifier" className="nav-item">Text Simplifier</a></li>
            <li><a href="#text-to-speech" className="nav-item">Text-to-Speech</a></li>
            <li><a href="#ocr-technology" className="nav-item">OCR Technology</a></li>
            <li><a href="#eye-tracking" className="nav-item">Eye Tracking</a></li>

            <li><a href="#smart-adaptation" className="nav-item">Smart Adaptation</a></li>
          </ul>
        </div>
      </section>

      <div className="features-container">
        {/* === Dyslexia Reader === */}
        <section className="feature-section" id="dyslexia-reader">
          <div className="feature-header">
            <div className="feature-info">
              <h2>Dyslexia-Friendly Reader</h2>
              <p>
                A distraction-free, customizable reading interface for users with dyslexia.
                Adjust fonts, spacing, and contrast. Upload text files or paste content
                to personalize your reading experience.
              </p>
            </div>
            <div className="feature-visual">
              <div className="feature-visual-content">👁️</div>
            </div>
          </div>

          {/* === Upload + Text Input Section === */}
          <div className="dyslexia-tools-section">
            <h3 className="section-heading">📄 Upload File or Paste Text</h3>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              style={{ marginBottom: '10px' }}
            />
            <textarea
              rows="5"
              placeholder="Or paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ width: '100%', borderRadius: '5px', padding: '10px' }}
            />

            {/* === Accessibility Tools === */}
            <div className="tool-controls">
              <label><strong>Font Family:</strong>
                <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                  <option value="Default">Default (Sans-serif)</option>
                  <option value="OpenDyslexic">OpenDyslexic</option>
                  <option value="Arial">Arial</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                </select>
              </label>

              <label><strong>Font Size:</strong>
                <input
                  type="range"
                  min="14"
                  max="30"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                />
              </label>

              <label><strong>Line Height:</strong>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(e.target.value)}
                />
              </label>

              <label><strong>Letter Spacing:</strong>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(e.target.value)}
                />
              </label>

              <label><strong>Word Spacing:</strong>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={wordSpacing}
                  onChange={(e) => setWordSpacing(e.target.value)}
                />
              </label>

              <label><strong>Theme:</strong>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </label>
            </div>

            {/* === Formatted Output === */}
            <div className="formatted-output-section">
              <h3>🧠 Formatted Output</h3>
              <div style={formattedStyle}>
                {inputText || 'Your formatted content will appear here...'}
              </div>
            </div>
          </div>

          {/* === Description Cards === */}
          <div className="feature-details">
            <div className="feature-detail-card">
              <h3>OpenDyslexic Font</h3>
              <p>
                Typeface that increases readability by reducing letter confusion and improving letter distinction.
              </p>
            </div>
            <div className="feature-detail-card">
              <h3>Customizable Spacing</h3>
              <p>Adjust line, letter, and word spacing to suit your preferences.</p>
            </div>
            <div className="feature-detail-card">
              <h3>Color Themes</h3>
              <p>Choose light or dark mode to reduce visual strain.</p>
            </div>
            <div className="feature-detail-card">
              <h3>Reading Ruler</h3>
              <p>Helps users focus line by line to prevent skipping or re-reading.</p>
            </div>
          </div>

          {/* === Benefits Grid === */}
          <div className="feature-benefits">
            <h3>Benefits for Dyslexic Users</h3>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">📈</div>
                <h4>Improved Reading Speed</h4>
                <p>Users report 30–50% faster reading speeds.</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🎯</div>
                <h4>Better Comprehension</h4>
                <p>Understand and retain more from your reading.</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">😌</div>
                <h4>Reduced Eye Strain</h4>
                <p>Comfortably read for longer periods.</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💪</div>
                <h4>Boosted Confidence</h4>
                <p>Read with more ease and enjoyment.</p>
              </div>
            </div>
          </div>
        </section>


        {/* === OCR Technology Section === */}
        <section className="feature-section" id="ocr-technology">
          <div className="feature-header">
            <div className="feature-info">
              <h2>OCR Technology</h2>
              <p>
                LexiBloom leverages advanced Optical Character Recognition (OCR) to extract text from images, scanned documents, and photographs.
                This allows users to make printed or handwritten content accessible and searchable instantly.
              </p>
          </div>
        <div className="feature-visual">
          <div className="feature-visual-content">📷</div>
        </div>
       </div>

  {/* Insert the component here */}
  <OCRContainer />
</section>

        {/* === Eye Tracking Section === */}
        <section className="feature-section" id="eye-tracking">
          <div className="feature-header">
            <div className="feature-info">
              <h2>Eye Tracking & Focus Detection</h2>
              <p>
                LexiBloom uses camera-based eye-tracking to monitor the reader's gaze and attention while reading.
                This feature detects when users slow down or lose focus, enabling intelligent support.
              </p>
            </div>
          <div className="feature-visual">
            <div className="feature-visual-content">👁️</div>
          </div>
         </div>

          {/* Insert the component here */}
          <EyeTracking />
        </section>
      </div>

      <CTASection />
      <Footer />
    </>
  );
};

export default FeaturesPage;
