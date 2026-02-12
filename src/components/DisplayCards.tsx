import { useState } from 'react';
import { CarCard } from './CarCard';
import { AddCarForm } from './AddCarForm';
import { DisplayPriceAverage } from './DisplayPriceAverage';
import { sortCar, deleteElement, addColorToCar } from '../utils/carUtils';

interface Car {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  prix: number;
  image: string;
  availableColors: string[];
}

export const DisplayCards: React.FC = () => {
  // État pour gérer la liste des voitures
  const [cars, setCars] = useState<Car[]>([
    {
      id: 1,
      marque: 'Toyota',
      modele: 'Corolla',
      annee: 2023,
      prix: 25000,
      image: 'https://tse1.mm.bing.net/th/id/OIP.LvYr8eFwrUzJg7gmDSOPDAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3',
      availableColors: []
    },
    {
      id: 2,
      marque: 'Renault',
      modele: 'Clio',
      annee: 2022,
      prix: 18000,
      image: 'https://photos.auto-moto.com/32/2023/06/photo_article/22150/120154/1200-L-essai-renault-clio-e-tech-full-hybrid-145-esprit-alpine.jpg',
      availableColors: []
    },
    {
      id: 3,
      marque: 'Peugeot',
      modele: '308',
      annee: 2024,
      prix: 30000,
      image: 'https://cdn.motor1.com/images/mgl/kvlYR/s1/peugeot-308-2021.jpg',
      availableColors: []
    },
    {
      id: 4,
      marque: 'BMW',
      modele: 'X5',
      annee: 2023,
      prix: 65000,
      image: 'https://media.lesechos.com/api/v1/images/view/6519354c292322486a2ebc4c/1280x720/0902247010374-web-tete.jpg',
      availableColors: []
    },
    {
      id: 5,
      marque: 'Mercedes-Benz',
      modele: 'C-Class',
      annee: 2024,
      prix: 55000,
      image: 'https://www.gannett-cdn.com/-mm-/ef1fb3bcc80ee0eb2c557dd3e2b617ff96043935/c=0-1149-8269-5821/local/-/media/2018/02/13/USATODAY/USATODAY/636541420913175426-mb.jpg?width=3200&height=1809&fit=crop&format=pjpg&auto=webp',
      availableColors: []
    }
  ]);

  const [sortOrder, setSortOrder] = useState<boolean>(true);

  // Fonction pour ajouter une nouvelle voiture
  const handleAddCar = (newCar: Omit<Car, 'id' | 'image'>) => {
    const carWithId: Car = {
      ...newCar,
      id: Math.max(...cars.map(c => c.id), 0) + 1,
      image: '',
      availableColors: newCar.availableColors ?? []
    };
    setCars(prev => [...prev, carWithId]);
  };

  // Fonction pour supprimer une voiture
  const handleDeleteCar = (carId: number) => {
    const carIndex = cars.findIndex(c => c.id === carId);
    if (carIndex !== -1) {
      setCars(prev => deleteElement(prev, carIndex));
    }
  };

  // Fonction pour ajouter une couleur à un modèle de voiture
  const handleAddColorToCar = (modele: string, color: string) => {
    setCars(prev => addColorToCar(prev, modele, color));
  };

  const sortedCars = sortCar(cars, sortOrder);

  const handleSort = (ascending: boolean) => {
    setSortOrder(ascending);
  };

  return (
    <div className="display-cards-container">
      <h1>Catalogue de Véhicules</h1>
      
      <DisplayPriceAverage cars={cars} />

      <AddCarForm onAddCar={handleAddCar} />

      <div className="sort-buttons">
        <button 
          className={`sort-btn ${sortOrder ? 'active' : ''}`}
          onClick={() => handleSort(true)}
        >
          Prix ↑ (Croissant)
        </button>
        <button 
          className={`sort-btn ${!sortOrder ? 'active' : ''}`}
          onClick={() => handleSort(false)}
        >
          Prix ↓ (Décroissant)
        </button>
      </div>

      <p className="car-count">Total de véhicules: {sortedCars.length}</p>

      <div className="cards-grid">
        {sortedCars.map((car) => (
          <CarCard 
            key={car.id} 
            car={car}
            onDelete={() => handleDeleteCar(car.id)}
            onAddColor={(modele, color) => handleAddColorToCar(modele, color)}
          />
        ))}
      </div>
    </div>
  );
};
