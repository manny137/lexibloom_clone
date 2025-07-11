import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRContainer = () => {
  const [imageFile, setImageFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(URL.createObjectURL(file));
    setText("");
    setError("");
    setLoading(true);

    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setText(text.trim());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to extract text. Please try another image.");
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        marginTop: "20px",
      }}
    >
      <h3>📷 Upload an Image to Extract Text</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          margin: "10px 0",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {loading && <p>🕒 Processing image, please wait…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageFile && (
        <div>
          <img
            src={imageFile}
            alt="Uploaded preview"
            style={{
              maxWidth: "200px",
              marginTop: "10px",
              borderRadius: "4px",
            }}
          />
        </div>
      )}
      {text && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#fff",
            color: "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h4>📝 Extracted Text:</h4>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default OCRContainer;
