const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  key: String,
  value: String,
});

module.exports = mongoose.model('Setting', SettingSchema);
