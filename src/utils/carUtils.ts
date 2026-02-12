interface Car {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  prix: number;
  image: string;
  availableColors: string[];
}

/**
 * Trie une liste de voitures selon leur prix
 * @param cars - La liste de voitures à trier
 * @param ascending - true pour ordre croissant, false pour ordre décroissant
 * @returns La liste triée
 */
export const sortCar = (cars: Car[], ascending: boolean): Car[] => {
  return [...cars].sort((a, b) => {
    if (ascending) {
      return a.prix - b.prix; // Ordre croissant
    } else {
      return b.prix - a.prix; // Ordre décroissant
    }
  });
};

/**
 * Supprime un élément d'une liste à un index donné
 * @param elements - La liste d'éléments
 * @param index - L'index de l'élément à supprimer
 * @returns Une nouvelle liste sans l'élément à l'index fourni
 */
export const deleteElement = <T>(elements: T[], index: number): T[] => {
  if (index < 0 || index >= elements.length) {
    return elements;
  }
  return elements.filter((_, i) => i !== index);
};

/**
 * Calcule la moyenne d'une liste de nombres
 * @param numbers - La liste de nombres
 * @returns La moyenne des nombres
 */
export const priceAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

/**
 * Extrait les prix d'une liste de voitures
 * @param cars - La liste de voitures
 * @returns Une liste contenant uniquement les prix
 */
export const extractPriceFromCarList = (cars: Car[]): number[] => {
  return cars.map(car => car.prix);
};

/**
 * Ajoute une couleur à la voiture correspondant au modèle fourni.
 * Si la couleur existe déjà, ne la duplique pas.
 * @param cars - liste de voitures
 * @param modele - modèle de la voiture à mettre à jour
 * @param color - couleur à ajouter
 * @returns nouvelle liste de voitures avec la couleur ajoutée
 */
export const addColorToCar = (cars: Car[], modele: string, color: string): Car[] => {
  return cars.map(car => {
    if (car.modele === modele) {
      const normalized = color.trim();
      if (!normalized) return car;
      if (car.availableColors.includes(normalized)) return car;
      return { ...car, availableColors: [...car.availableColors, normalized] };
    }
    return car;
  });
};
