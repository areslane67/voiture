import React from 'react';
import { DeleteButton } from './DeleteButton';

interface Car {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  prix: number;
  image: string;
  availableColors: string[];
}

interface CarCardProps {
  car: Car;
  onDelete: () => void;
  onAddColor: (modele: string, color: string) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onDelete, onAddColor }) => {
  const [colorInput, setColorInput] = React.useState('');

  const handleAddColor = () => {
    const c = colorInput.trim();
    if (!c) return;
    onAddColor(car.modele, c);
    setColorInput('');
  };

  return (
    <div className="car-card">
      {car.image && (
        <img src={car.image} alt={`${car.marque} ${car.modele}`} className="car-image" />
      )}
      <h2>{car.marque} {car.modele}</h2>
      <div className="car-info">
        <p><strong>Année:</strong> {car.annee}</p>
        <p><strong>Prix:</strong> {car.prix.toLocaleString('fr-FR')} €</p>
      </div>

      <div className="colors-section">
        <div className="colors-list">
          {car.availableColors.length === 0 ? (
            <span className="no-colors">Aucune couleur disponible</span>
          ) : (
            car.availableColors.map((col, idx) => (
              <span key={idx} className="color-badge">{col}</span>
            ))
          )}
        </div>

        <div className="add-color-row">
          <input
            type="text"
            placeholder="Ajouter une couleur"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            className="color-input"
          />
          <button className="add-color-btn" onClick={handleAddColor}>Ajouter</button>
        </div>

      <DeleteButton 
        onDelete={onDelete} 
        carName={`${car.marque} ${car.modele}`}
      />
      </div>
    </div>
  );
};
