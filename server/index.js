require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Раздача статических файлов из папки uploads
app.use('/uploads', express.static('uploads'));

// Подключение к MongoDB
const mongoURI = 'mongodb://localhost:27017/wineDB';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Основной маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('Добро пожаловать в API виртуального дегустатора вин!');
});

// Подключаем маршруты
const winesRouter = require('./routes/wines');
const authRouter = require('./routes/auth');
app.use('/api/wines', winesRouter);
app.use('/api/auth', authRouter);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});