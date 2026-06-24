const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  tokenNumber: { type: String, required: true, unique: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Token', TokenSchema);