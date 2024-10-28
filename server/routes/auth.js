// server/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET; // Читаем секрет из .env файла

// Регистрация пользователя
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при регистрации', error: err.message });
  }
});

// Вход пользователя
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Неверное имя пользователя или пароль' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неверное имя пользователя или пароль' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при входе', error: err.message });
  }
});

module.exports = router;