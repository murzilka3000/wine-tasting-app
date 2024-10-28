// server/routes/wines.js
const express = require('express');
const Wine = require('../models/Wine');
const router = express.Router();

// Получить все вина
router.get('/', async (req, res) => {
  try {
    const wines = await Wine.find();          // Получаем все вина из базы данных
    res.json(wines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Добавить новое вино
router.post('/', async (req, res) => {
  const wine = new Wine(req.body);
  try {
    const newWine = await wine.save();       // Сохраняем новое вино в базе данных
    res.status(201).json(newWine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Обновить информацию о вине
router.patch('/:id', async (req, res) => {
  try {
    const wine = await Wine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!wine) return res.status(404).json({ message: 'Вино не найдено' });
    res.json(wine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Удалить вино
router.delete('/:id', async (req, res) => {
  try {
    const wine = await Wine.findByIdAndDelete(req.params.id);
    if (!wine) return res.status(404).json({ message: 'Вино не найдено' });
    res.json({ message: 'Вино удалено' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;