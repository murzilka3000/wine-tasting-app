const express = require('express');
const Wine = require('../models/Wine');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Получить все вина текущего пользователя
router.get('/', authMiddleware, async (req, res) => {
  try {
    const wines = await Wine.find({ user: req.user.userId });
    res.json(wines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Добавить новое вино
router.post('/', authMiddleware, async (req, res) => {
  const wine = new Wine({
    ...req.body,
    user: req.user.userId
  });
  try {
    const newWine = await wine.save();
    res.status(201).json(newWine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Обновить информацию о вине
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedWine = await Wine.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedWine) {
      return res.status(404).json({ message: 'Вино не найдено' });
    }
    res.json(updatedWine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Удалить вино
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedWine = await Wine.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });
    if (!deletedWine) {
      return res.status(404).json({ message: 'Вино не найдено' });
    }
    res.json({ message: 'Вино успешно удалено' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Экспортируем router для использования в index.js
module.exports = router;