'use client';
import '../../styles/creation.css';

export default function CreationStudio() {
  
    return (
    <div className='principal'>
    {/*botões */}

      <div>
          <button><strong>N</strong></button>
          <button><strong><em>S</em></strong></button>
          <button><strong><s>S</s></strong></button>
      </div>
    
    <div className="container">
    <div className="editor">
        <textarea id="editor" placeholder="Insira seu texto aqui..."></textarea>
    </div>
    <div className="preview">
        <div id="preview" className="preview-content"></div>
    </div>
    </div>
    </div>
    );
  }
