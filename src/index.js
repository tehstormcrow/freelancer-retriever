require('dotenv').config();

const mongoose = require('mongoose');

const { scheduleUpdates } = require('./services/updates');

scheduleUpdates();

mongoose.connect('mongodb://localhost:27017/freelancer-test');
