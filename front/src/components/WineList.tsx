// frontend/src/components/WineList.tsx
import React, { useEffect, useState } from 'react';
import { getWines } from '../services/wineService';
import { Wine } from '../types/Wine';

const WineList: React.FC = () => {
  const [wines, setWines] = useState<Wine[]>([]);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const data = await getWines();
        setWines(data);
      } catch (error) {
        console.error('Ошибка при загрузке вин:', error);
      }
    };

    fetchWines();
  }, []);

  return (
    <div>
      <h2>Wine List</h2>
      <ul>
        {wines.map((wine) => (
          <li key={wine._id}>
            <h3>{wine.name} ({wine.year})</h3>
            <p>{wine.country}, {wine.region} — {wine.grape}</p>
            <p>Rating: {wine.rating}</p>
            <p>{wine.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WineList;