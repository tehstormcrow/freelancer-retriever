const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  id: Number,
  name: String,
  seo_url: String,
});

module.exports = mongoose.model('Job', JobSchema);
