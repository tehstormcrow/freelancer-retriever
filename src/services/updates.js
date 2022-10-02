const cron = require('node-cron');
const { searchAllActiveProjects } = require('../lib/freelancerApi');

const scheduleUpdates = () => {
  searchAllActiveProjects();

  cron.schedule('*/3 * * * *', () => {
    searchAllActiveProjects();
  });
};

module.exports = {
  scheduleUpdates,
};
