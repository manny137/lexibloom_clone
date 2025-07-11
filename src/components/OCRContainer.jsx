import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';

const OCRContainer = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setText('');
    }
  };

  const extractText = async () => {
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

      <input type="file" accept="image/*" onChange={handleImageChange} />

      {image && (
        <>
          <div style={{ margin: '10px 0' }}>
            <img
              src={image}
              alt="Uploaded"
              style={{ maxWidth: '300px', borderRadius: '5px' }}
            />
          </div>

          <button onClick={extractText}>📄 Extract Text</button>
        </>
      )}

      {isLoading && <p>⏳ Processing… please wait</p>}

      {text && (
        <div>
          <h3>📋 Extracted Text</h3>
          <pre
            style={{
              background: '#ffffff',     // white background
              color: '#000000',          // black text
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {text}
          </pre>
          <a
      href={`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`}
      download="extracted_text.txt"
    >
            📥 Download Extracted Text
          </a>
        </div>
      )}
    </div>
  );
};

export default OCRContainer;
