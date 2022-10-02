const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  id: Number,
  owner_id: Number,
  title: String,
  status: String,
  seo_url: String,
  currency: {
    code: String,
    sign: String,
  },
  submitdate: Number,
  description: String,
  bidperiod: Number,
  jobs: [
    {
      id: Number,
      name: String,
      seo_url: String,
    },
  ],
  budget: {
    minimum: Number,
    maximum: Number,
  },
  bid_stats: {
    bid_count: Number,
    bid_avg: Number,
  },
  time_submitted: Number,
  time_updated: Number,
});

module.exports = mongoose.model('Project', ProjectSchema);
