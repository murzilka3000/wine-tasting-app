const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;

app.use((cors()));
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/wineDB';
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('Добро пожаловать в API виртуального дегустатора вин!');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
})

// backend/index.js (добавляем в конце)
const winesRouter = require('./routes/wines');
app.use('/api/wines', winesRouter); // Подключаем маршруты для работы с вином
