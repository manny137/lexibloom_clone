import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';

const OCRContainer = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);  // keep the file itself
      setPreview(URL.createObjectURL(file)); // just for <img> preview
      setText('');
    }
  };

  const extractText = async () => {
    if (!image) return;

    setIsLoading(true);

    const worker = await createWorker('eng', 1);
    const {
      data: { text: extractedText },
    } = await worker.recognize(image);

    setText(extractedText);
    await worker.terminate();
    setIsLoading(false);
  };

  return (
    <div>
      <h2>📷 OCR Technology</h2>
      <p>Upload an image and extract text using Tesseract OCR (in-browser).</p>

      {/* Stylized file input */}
      <label
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '10px',
        }}
      >
        📁 Choose Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </label>

      {preview && (
        <>
          <div style={{ margin: '10px 0' }}>
            <img
              src={preview}
              alt="Uploaded"
              style={{ maxWidth: '300px', borderRadius: '5px' }}
            />
          </div>

          <button
            onClick={extractText}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            📄 Extract Text
          </button>
        </>
      )}

      {isLoading && <p>⏳ Processing… please wait</p>}

      {text && (
        <div>
          <h3>📋 Extracted Text</h3>
          <pre
            style={{
              background: '#ffffff',
              color: '#000000',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              maxWidth: '600px',
              overflowX: 'auto',
            }}
          >
            {text}
          </pre>
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`}
            download="extracted_text.txt"
            style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
            }}
          >
            📥 Download Extracted Text
          </a>
        </div>
      )}
    </div>
  );
};

export default OCRContainer;
