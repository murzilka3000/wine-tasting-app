// frontend/src/services/wineService.ts
import axios from 'axios';
import { Wine } from '../types/Wine';

const API_URL = 'http://localhost:5001/api/wines';

// Получить все вина
export const getWines = async (): Promise<Wine[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Добавить новое вино
export const addWine = async (wine: Wine): Promise<Wine> => {
  const response = await axios.post(API_URL, wine);
  return response.data;
};

// Обновить информацию о вине
export const updateWine = async (id: string, updatedWine: Partial<Wine>): Promise<Wine> => {
  const response = await axios.patch(`${API_URL}/${id}`, updatedWine);
  return response.data;
};

// Удалить вино
export const deleteWine = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};