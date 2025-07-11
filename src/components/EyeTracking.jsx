import React, { useEffect, useState } from 'react';

function EyeTracking() {
  const [coords, setCoords] = useState({ x: null, y: null });
  const [focusLost, setFocusLost] = useState(false);
  let lastSeen = Date.now();

  useEffect(() => {
    const runWebGazer = async () => {
      if (window.webgazer) {
        await window.webgazer.setRegression('ridge')
          .setGazeListener((data, elapsedTime) => {
            if (data) {
              setCoords({ x: Math.round(data.x), y: Math.round(data.y) });
              lastSeen = Date.now();
              setFocusLost(false);
            }
          });

        // 👇 Start webcam and visual overlays
        await window.webgazer.begin();
        window.webgazer.showVideoPreview(true);
        window.webgazer.showPredictionPoints(true);
        window.webgazer.showFaceOverlay(true);
      }
    };

    runWebGazer();

    // Focus drop check loop
    const interval = setInterval(() => {
      if (Date.now() - lastSeen > 4000) {
        setFocusLost(true);
      }
    }, 1000);

    return () => {
      if (window.webgazer) {
        window.webgazer.end();
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ border: "2px dashed #ccc", padding: "1rem", marginTop: "1rem", color: "white" }}>
      <h3>👁️ Eye Tracking & Focus Detection</h3>
      <p>Webcam-based attention tracking. Please allow camera access.</p>
      <div style={{ border: "1px solid #ddd", padding: "1rem", marginTop: "1rem" }}>
        <p style={{ fontWeight: 'bold' }}>Tracking your gaze here...</p>
        <p>X: {coords.x || '--'}, Y: {coords.y || '--'}</p>
        {focusLost && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            ⚠️ Focus Lost!
          </p>
        )}
      </div>
    </div>
  );
}

export default EyeTracking;