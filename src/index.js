require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const { scheduleUpdates } = require('./services/updates');
const projectsRouter = require('./routes/projects');

const app = express();

scheduleUpdates();

app.use('/projects', projectsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
