// frontend/src/services/wineService.ts
import axios from 'axios';
import { Wine } from '../types/Wine';

const API_URL = 'http://localhost:5001/api/wines';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

// Получить все вина
export const getWines = async (): Promise<Wine[]> => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

// Обновленный `addWine` для работы с FormData
export const addWine = async (data: FormData): Promise<Wine> => {
  const response = await axios.post(API_URL, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeaders().headers
    }
  });
  return response.data;
};

// Обновить информацию о вине
export const updateWine = async (id: string, updatedWine: Partial<Wine>): Promise<Wine> => {
  const response = await axios.patch(`${API_URL}/${id}`, updatedWine, getAuthHeaders());
  return response.data;
};

// Удалить вино
export const deleteWine = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};