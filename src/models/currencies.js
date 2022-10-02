const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
  id: Number,
  code: String,
  name: String,
  sign: String,
});

module.exports = mongoose.model('Currency', CurrencySchema);
