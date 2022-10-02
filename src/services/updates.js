const cron = require('node-cron');
const { searchAllActiveProjects } = require('../lib/freelancerApi');

const scheduleUpdates = () => {
  searchAllActiveProjects();

  cron.schedule('*/1 * * * *', () => {
    searchAllActiveProjects();
  });
};

module.exports = {
  scheduleUpdates,
};
