const Projects = require('../models/projects');

const getActiveProjects = async () => {
  const projects = await Projects.find({ blacklisted: false, favorited: false }).limit(5).exec();

  return projects;
};

const getActiveProjectsCount = async () => {
  const count = await Projects.find({ blacklisted: false, favorited: false }).count().exec();

  return count;
};

module.exports = {
  getActiveProjects,
  getActiveProjectsCount,
};
