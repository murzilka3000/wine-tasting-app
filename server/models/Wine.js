const mongoose = require('mongoose');

const WineSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Название вина, обязательное поле
    year: Number, // Год выпуска вина
    country: String, // Страна происхождения
    region: String, // Регион
    grape: String, // Сорт винограда
    rating: Number, // Рейтинг вина
    description: String 
})

module.exports = mongoose.model('Wine', WineSchema);