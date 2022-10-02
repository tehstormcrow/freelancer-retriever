const express = require('express');
const { getActiveProjects, getActiveProjectsCount } = require('../services/projects');

const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await getActiveProjects();
  const count = await getActiveProjectsCount();

  res.status(200).json({ projects, count });
});

// get: projects/
router.get('/:page', async (req, res) => {
  const projects = await getActiveProjects();
  const count = await getActiveProjectsCount();

  res.status(200).json({ projects, count });
});

module.exports = router;
