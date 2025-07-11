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

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "extracted_text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "8px",
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
            background: "#fff", // 👈 white background ONLY for extracted text box
            color: "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h4>📝 Extracted Text:</h4>
          <p>{text}</p>
          <button
            onClick={downloadText}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ⬇️ Download Extracted Text
          </button>
        </div>
      )}
    </div>
  );
};

export default OCRContainer;
