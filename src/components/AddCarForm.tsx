import React, { useState } from 'react';

interface Car {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  prix: number;
  image: string;
  availableColors: string[];
}

interface AddCarFormProps {
  onAddCar: (car: Omit<Car, 'id' | 'image' | 'availableColors'> & { availableColors: string[] }) => void;
}

export const AddCarForm: React.FC<AddCarFormProps> = ({ onAddCar }) => {
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    annee: new Date().getFullYear(),
    prix: 0
  });

  const [colorsInput, setColorsInput] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'annee' || name === 'prix' ? parseInt(value) || 0 : value
    }));

    // Supprimer l'erreur du champ de ce input
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.marque.trim()) {
      newErrors.marque = 'La marque est requise';
    }
    if (!formData.modele.trim()) {
      newErrors.modele = 'Le modèle est requis';
    }
    if (formData.annee < 1900 || formData.annee > new Date().getFullYear() + 1) {
      newErrors.annee = `L'année doit être entre 1900 et ${new Date().getFullYear() + 1}`;
    }
    if (formData.prix <= 0) {
      newErrors.prix = 'Le prix doit être supérieur à 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const colors = colorsInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    onAddCar({
      marque: formData.marque,
      modele: formData.modele,
      annee: formData.annee,
      prix: formData.prix,
      availableColors: colors
    });

    // Réinitialiser le formulaire
    setFormData({
      marque: '',
      modele: '',
      annee: new Date().getFullYear(),
      prix: 0
    });
    setColorsInput('');
  };

  return (
    <div className="add-car-form">
      <h2>Ajouter une nouvelle voiture</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="marque">Marque</label>
          <input
            type="text"
            id="marque"
            name="marque"
            value={formData.marque}
            onChange={handleChange}
            placeholder="Ex: Toyota"
            className={errors.marque ? 'input-error' : ''}
          />
          {errors.marque && <span className="error-message">{errors.marque}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="modele">Modèle</label>
          <input
            type="text"
            id="modele"
            name="modele"
            value={formData.modele}
            onChange={handleChange}
            placeholder="Ex: Camry"
            className={errors.modele ? 'input-error' : ''}
          />
          {errors.modele && <span className="error-message">{errors.modele}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="annee">Année</label>
          <input
            type="number"
            id="annee"
            name="annee"
            value={formData.annee}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear() + 1}
            className={errors.annee ? 'input-error' : ''}
          />
          {errors.annee && <span className="error-message">{errors.annee}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="prix">Prix (€)</label>
          <input
            type="number"
            id="prix"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            min="0"
            step="1000"
            placeholder="Ex: 25000"
            className={errors.prix ? 'input-error' : ''}
          />
          {errors.prix && <span className="error-message">{errors.prix}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="availableColors">Couleurs (séparées par des virgules)</label>
          <input
            type="text"
            id="availableColors"
            name="availableColors"
            value={colorsInput}
            onChange={(e) => setColorsInput(e.target.value)}
            placeholder="Ex: rouge, blanc, noir"
          />
        </div>

        <button type="submit" className="submit-btn">
          Ajouter la voiture
        </button>
      </form>
    </div>
  );
};
