const express = require('express');
const Wine = require('../models/Wine');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

// Настраиваем `multer` для сохранения файлов в папке `uploads`
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Получить все вина текущего пользователя
router.get('/', authMiddleware, async (req, res) => {
  try {
    const wines = await Wine.find({ user: req.user.userId });
    res.json(wines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Добавить новое вино с изображением
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const wine = new Wine({
    ...req.body,
    imageUrl, // Сохраняем путь к изображению
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

module.exports = router;