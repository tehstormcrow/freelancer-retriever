require('dotenv').config();

const mongoose = require('mongoose');

require('./lib/freelancerApi');

mongoose.connect('mongodb://localhost:27017/freelancer-test');
