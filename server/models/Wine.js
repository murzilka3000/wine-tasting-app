// server/models/Wine.js
const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: Number,
  country: String,
  region: String,
  grape: String,
  rating: Number,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Привязка к пользователю
});

module.exports = mongoose.model('Wine', wineSchema);