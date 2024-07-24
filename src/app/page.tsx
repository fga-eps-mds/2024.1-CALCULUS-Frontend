'use client';

import '../styles/positioning.css'; 
import Button from './components/Button/Button';

const HomePage: React.FC = () => {
  const handleClick = () => {
    alert('Botão clicado!');
  };

  return (
    <div className="position-relative">
      <Button 
        label="Comece aqui"
        onClick={handleClick}
        className="position-custom" // Posiciona o botão com base nas unidades de viewport
      />
    </div>
  );
};

export default HomePage;
  