'use client';
import '../../styles/creation.css';

export default function CreationStudio() {
  
    return (
      <div className="principal">
      <div className="container">
      <div className="editor-section">
          <div id="botoes">
              <button><strong>N</strong></button>
              <button><strong><em>S</em></strong></button>
              <button><strong><s>S</s></strong></button>
          </div>
          <div className="editor">
              <textarea id="editor" placeholder="Insira seu texto aqui..."></textarea>
          </div>
      </div>
      <div className="preview-section">
          <div id="preview" className="preview-content"></div>
      </div>
  </div>
  </div>
    );
  }
