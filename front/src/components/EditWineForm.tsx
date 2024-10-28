// frontend/src/components/EditWineForm.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWines, updateWine } from '../services/wineService';
import { Wine } from '../types/Wine';

const EditWineForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Wine | null>(null);

  useEffect(() => {
    const fetchWine = async () => {
      try {
        const data = await getWines();
        const wineToEdit = data.find((wine) => wine._id === id);
        if (wineToEdit) setFormData(wineToEdit);
      } catch (error) {
        console.error('Ошибка при загрузке вина:', error);
      }
    };

    fetchWine();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => prevData ? { ...prevData, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        await updateWine(id!, formData);
        alert('Вино успешно обновлено!');
        navigate('/');
      } catch (error) {
        console.error('Ошибка при обновлении вина:', error);
        alert('Произошла ошибка при обновлении вина.');
      }
    }
  };

  if (!formData) return <div>Загрузка...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h3>Редактировать вино</h3>
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
      <button type="submit">Сохранить изменения</button>
    </form>
  );
};

export default EditWineForm;