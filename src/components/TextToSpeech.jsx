import React, { useState, useEffect, useRef } from 'react';
import '../styles/features.css'; 

function EyeTracking() {
  const [tracking, setTracking] = useState(false);
  const [coords, setCoords] = useState({ x: null, y: null });
  const [focusLost, setFocusLost] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const intervalRef = useRef(null);
  const lastSeenRef = useRef(Date.now());

  const screenBounds = {
    xMin: window.innerWidth * 0.1,
    xMax: window.innerWidth * 0.9,
    yMin: window.innerHeight * 0.1,
    yMax: window.innerHeight * 0.9,
  };

  const startTracking = async () => {
    try {
      if (window.webgazer) {
        await window.webgazer.setRegression('ridge')
          .setGazeListener((data) => {
            if (data) {
              const x = Math.round(data.x);
              const y = Math.round(data.y);
              setCoords({ x, y });

              const insideScreen =
                x > screenBounds.xMin &&
                x < screenBounds.xMax &&
                y > screenBounds.yMin &&
                y < screenBounds.yMax;

              if (insideScreen) {
                lastSeenRef.current = Date.now();
                setFocusLost(false);
              }
            }
          });

        await window.webgazer.begin();
        window.webgazer.showVideoPreview(true);
        window.webgazer.showPredictionPoints(true);
        window.webgazer.showFaceOverlay(true);
        setTracking(true);

        intervalRef.current = setInterval(async () => {
          const prediction = await window.webgazer.getCurrentPrediction();
        
          const gazeLost = !prediction; // means no eyes/face detected
          const tooLong = Date.now() - lastSeenRef.current > 4000;
        
          if (gazeLost || tooLong) {
            setFocusLost(true);
            setShowPopup(true);
          }
        }, 1000);
      }
    } catch (err) {
      console.error('WebGazer start failed:', err);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFocusLost(false);
    lastSeenRef.current = Date.now();
  };

  const stopTracking = () => {
    clearInterval(intervalRef.current);

    ['webgazerVideoFeed', 'webgazerFaceOverlay', 'webgazerFaceFeedback'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.remove) el.remove();
    });

    if (window.webgazer) {
      try {
        window.webgazer.clearGazeListener();
        window.webgazer.pause();
        window.webgazer.end();
      } catch (error) {
        console.warn("webgazer.end() error:", error.message);
      }
    }

    const leftoverVideo = document.querySelector('video');
    if (leftoverVideo && leftoverVideo.srcObject) {
      leftoverVideo.srcObject.getTracks().forEach(track => track.stop());
      leftoverVideo.remove();
    }

    setCoords({ x: null, y: null });
    setFocusLost(false);
    setTracking(false);
  };

  useEffect(() => {
    return () => stopTracking();
  }, []);

  return (
    <div className="eye-tracking-container">
      <h3>Eye Tracking & Focus Detection</h3>
      <p>Click start to begin webcam-based attention tracking.</p>

      <div className="eye-tracking-buttons">
        {!tracking ? (
          <button className="start-btn" onClick={startTracking}>▶️ Start Eye Tracking</button>
        ) : (
          <button className="stop-btn" onClick={stopTracking}>⏹️ Stop Eye Tracking</button>
        )}
      </div>

      {tracking && (
        <div className="tracking-info">
          <p><strong>Tracking your gaze:</strong></p>
          <p>X: {coords.x ?? '--'}, Y: {coords.y ?? '--'}</p>
          {focusLost && <p className="focus-lost">⚠️ Focus Lost!</p>}
        </div>
      )}

      {showPopup && (
        <div className="focus-popup">
          <div className="popup-content">
            <h2>👁️ Hey! We noticed you lost focus…</h2>
            <p>
              Want help with this section? You can simplify it, listen to it, or just take a moment and come back when you're ready.
            </p>
            <button onClick={handleClosePopup}>✅ I’m back</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TextToSpeech;
