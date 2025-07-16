import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import FeaturesPage from './pages/Features'; // ✅ FIXED: Capital "P"
import ADHDFeaturesPage from './pages/ADHDFeaturesPage';
import LowVisionFeaturesPage from './pages/LowVisionFeaturesPage';
import LowVisionMode from './components/LowVision';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/features" element={<FeaturesPage />} /> {/* Default Dyslexia Features */}
        <Route path="/adhd-features" element={<ADHDFeaturesPage />} />
        <Route path="/low-vision-features" element={<LowVisionFeaturesPage />} />
         <Route path="/low-vision" element={<LowVisionMode />} />
      </Routes>
    </Router>
  );
}

export default App;

