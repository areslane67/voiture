import { priceAverage, extractPriceFromCarList } from '../utils/carUtils';

interface Car {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  prix: number;
  image: string;
  availableColors: string[];
}

interface DisplayPriceAverageProps {
  cars: Car[];
}

export const DisplayPriceAverage: React.FC<DisplayPriceAverageProps> = ({ cars }) => {
  const prices = extractPriceFromCarList(cars);
  const average = priceAverage(prices);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  return (
    <div className="price-stats-container">
      <div className="price-stat-card average">
        <div className="stat-label">Prix Moyen</div>
        <div className="stat-value">
          {average.toLocaleString('fr-FR', { 
            style: 'currency', 
            currency: 'EUR',
            maximumFractionDigits: 0
          })}
        </div>
      </div>
      
      <div className="price-stat-card min">
        <div className="stat-label">Prix Minimum</div>
        <div className="stat-value">
          {minPrice.toLocaleString('fr-FR', { 
            style: 'currency', 
            currency: 'EUR',
            maximumFractionDigits: 0
          })}
        </div>
      </div>
      
      <div className="price-stat-card max">
        <div className="stat-label">Prix Maximum</div>
        <div className="stat-value">
          {maxPrice.toLocaleString('fr-FR', { 
            style: 'currency', 
            currency: 'EUR',
            maximumFractionDigits: 0
          })}
        </div>
      </div>
    </div>
  );
};
