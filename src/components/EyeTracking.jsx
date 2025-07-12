import React, { useState, useEffect, useRef } from 'react';
import '../styles/features.css'; // ✅ Correct


function EyeTracking() {
  const [tracking, setTracking] = useState(false);
  const [coords, setCoords] = useState({ x: null, y: null });
  const [focusLost, setFocusLost] = useState(false);
  const intervalRef = useRef(null);
  const lastSeenRef = useRef(Date.now());

  const startTracking = async () => {
    try {
      if (window.webgazer) {
        await window.webgazer.setRegression('ridge')
          .setGazeListener((data) => {
            if (data) {
              setCoords({ x: Math.round(data.x), y: Math.round(data.y) });
              lastSeenRef.current = Date.now();
              setFocusLost(false);
            }
          });

        await window.webgazer.begin();
        window.webgazer.showVideoPreview(true);
        window.webgazer.showPredictionPoints(true);
        window.webgazer.showFaceOverlay(true);
        setTracking(true);

        intervalRef.current = setInterval(() => {
          if (Date.now() - lastSeenRef.current > 4000) {
            setFocusLost(true);
          }
        }, 1000);
      }
    } catch (err) {
      console.error('WebGazer start failed:', err);
    }
  };

  const stopTracking = () => {
  clearInterval(intervalRef.current);

  // Remove overlays safely
  ['webgazerVideoFeed', 'webgazerFaceOverlay', 'webgazerFaceFeedback'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.remove) {
      el.remove();
    }
  });

  // Stop WebGazer
  if (window.webgazer) {
    try {
      window.webgazer.clearGazeListener();
      window.webgazer.pause();     // Pause first
      window.webgazer.end();       // Then end
    } catch (error) {
      console.warn("webgazer.end() error:", error.message);
    }
  }

  // 🧼 Extra Cleanup for ghost webcam window
  const leftoverVideo = document.querySelector('video');
  if (leftoverVideo && leftoverVideo.srcObject) {
    leftoverVideo.srcObject.getTracks().forEach(track => track.stop());
    leftoverVideo.remove(); // ⬅️ This removes the black preview
  }

  setCoords({ x: null, y: null });
  setFocusLost(false);
  setTracking(false);
};


  useEffect(() => {
    return () => stopTracking(); // Cleanup
  }, []);

  return (
    <div className="eye-tracking-container">
      <h3>Eye Tracking & Focus Detection</h3>
      <p>Click start to begin webcam-based attention tracking.</p>

      <div className="eye-tracking-buttons">
        {!tracking ? (
          <button className="start-btn" onClick={startTracking}>
            ▶️ Start Eye Tracking
          </button>
        ) : (
          <button className="stop-btn" onClick={stopTracking}>
            ⏹️ Stop Eye Tracking
          </button>
        )}
      </div>

      {tracking && (
        <div className="tracking-info">
          <p><strong>Tracking your gaze:</strong></p>
          <p>X: {coords.x ?? '--'}, Y: {coords.y ?? '--'}</p>
          {focusLost && (
            <p className="focus-lost">⚠️ Focus Lost!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default EyeTracking;

