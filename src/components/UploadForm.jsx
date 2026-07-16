import { useState } from 'react';

export default function UploadForm({ client: true }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedStyles, setSelectedStyles] = useState(['catalog']);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleStyleToggle = (style) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('styles', JSON.stringify(selectedStyles));

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
        setFile(null);
        setPreview(null);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="result-container">
        <h2>✨ Your Images Ready!</h2>
        <div className="results-grid">
          {result.images?.map((img, idx) => (
            <div key={idx} className="result-item">
              <img src={img.url} alt={img.style} />
              <p>{img.style}</p>
              <a href={img.url} download className="btn btn-primary">
                Download
              </a>
            </div>
          ))}
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setResult(null);
            setSelectedStyles(['catalog']);
          }}
        >
          Transform Another
        </button>
      </div>
    );
  }

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="upload-area">
          {preview ? (
            <div className="preview">
              <img src={preview} alt="Preview" />
              <button
                type="button"
                className="change-btn"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
              >
                Change Image
              </button>
            </div>
          ) : (
            <label className="upload-label">
              <div className="upload-icon">📷</div>
              <p>Drop your photo here or click to select</p>
              <p className="upload-hint">JPG, PNG up to 10MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
            </label>
          )}
        </div>

        {preview && (
          <div className="styles-section">
            <h3>Select Styles to Generate:</h3>
            <div className="styles-grid">
              {['catalog', 'lifestyle', 'campaign'].map(style => (
                <label key={style} className="style-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(style)}
                    onChange={() => handleStyleToggle(style)}
                  />
                  <span className="style-label">{style.charAt(0).toUpperCase() + style.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || loading}
          className="btn btn-primary btn-submit"
        >
          {loading ? '⏳ Processing...' : '✨ Transform Photo'}
        </button>
      </form>

      <style>{`
        .upload-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }

        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .upload-area {
          border: 2px dashed var(--brand-primary);
          border-radius: 12px;
          padding: 2rem;
          background: rgba(0, 102, 255, 0.05);
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
        }

        .preview img {
          max-width: 100%;
          max-height: 250px;
          border-radius: 8px;
          object-fit: contain;
        }

        .upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          width: 100%;
        }

        .upload-icon {
          font-size: 3rem;
        }

        .upload-label p {
          margin: 0;
        }

        .upload-hint {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .file-input {
          display: none;
        }

        .change-btn {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .styles-section {
          padding: 1.5rem;
          background: var(--brand-light);
          border-radius: 8px;
        }

        .styles-section h3 {
          margin-bottom: 1rem;
        }

        .styles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }

        .style-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .style-checkbox input {
          cursor: pointer;
          width: auto;
          margin: 0;
          padding: 0;
          accent-color: var(--brand-primary);
        }

        .style-label {
          font-weight: 500;
        }

        .btn-submit {
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
        }

        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .result-container {
          text-align: center;
          padding: 2rem;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }

        .result-item {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .result-item img {
          width: 100%;
          border-radius: 8px;
          object-fit: cover;
          max-height: 250px;
        }

        .result-item p {
          font-weight: 600;
          margin: 0;
        }

        .result-item .btn {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
