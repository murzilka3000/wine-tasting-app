import React, { useState } from 'react';
import { addWine } from '../services/wineService';
import { Wine } from '../types/Wine';

type NewWine = Omit<Wine, '_id' | 'imageUrl'>; // Тип для нового вина без `_id` и `imageUrl`

const AddWineForm: React.FC = () => {
  const [formData, setFormData] = useState<NewWine>({
    name: '',
    year: new Date().getFullYear(),
    country: '',
    region: '',
    grape: '',
    rating: 0,
    description: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null); // Состояние для файла изображения

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'year' || name === 'rating' ? Number(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, String(value)));

      if (imageFile) {
        data.append('image', imageFile); // Добавляем файл изображения в FormData
      }

      await addWine(data);
      alert('Вино успешно добавлено!');

      setFormData({
        name: '',
        year: new Date().getFullYear(),
        country: '',
        region: '',
        grape: '',
        rating: 0,
        description: ''
      });
      setImageFile(null);
    } catch (error) {
      console.error('Ошибка при добавлении вина:', error);
      alert('Произошла ошибка при добавлении вина.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Добавить новое вино</h3>
      <label>
        Название:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Год:
        <input type="number" name="year" value={formData.year} onChange={handleChange} required />
      </label>
      <label>
        Страна:
        <input type="text" name="country" value={formData.country} onChange={handleChange} required />
      </label>
      <label>
        Регион:
        <input type="text" name="region" value={formData.region} onChange={handleChange} required />
      </label>
      <label>
        Сорт винограда:
        <input type="text" name="grape" value={formData.grape} onChange={handleChange} required />
      </label>
      <label>
        Рейтинг:
        <input type="number" name="rating" value={formData.rating} onChange={handleChange} required min="0" max="5" />
      </label>
      <label>
        Описание:
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </label>
      <label>
        Изображение:
        <input type="file" name="image" onChange={handleFileChange} />
      </label>
      <button type="submit">Добавить вино</button>
    </form>
  );
};

export default AddWineForm;