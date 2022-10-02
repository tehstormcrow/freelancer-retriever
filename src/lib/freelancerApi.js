const axios = require('../utils/axios');
const Jobs = require('../models/jobs');
const Currencies = require('../models/currencies');
const Projects = require('../models/projects');
const settingsService = require('../services/settings');

const listJobs = async () => {
  const ops = [];
  const res = await axios.get('projects/0.1/jobs');

  if (!res || !res.data || !res.data.result) {
    return;
  }

  res.data.result.forEach((job) => {
    ops.push({
      updateOne: {
        filter: {
          id: job.id,
        },
        update: {
          id: job.id,
          name: job.name,
          seo_url: job.seo_url,
        },
        upsert: true,
      },
    });
  });

  await Jobs.bulkWrite(ops);
};

const listCurrencies = async () => {
  const ops = [];
  const res = await axios.get('/projects/0.1/currencies/');

  if (!res || !res.data || !res.data.result || !res.data.result.currencies) {
    return;
  }

  res.data.result.currencies.forEach((currency) => {
    ops.push({
      updateOne: {
        filter: {
          id: currency.id,
        },
        update: {
          id: currency.id,
          code: currency.code,
          name: currency.name,
          sign: currency.sign,
        },
        upsert: true,
      },
    });
  });

  await Currencies.bulkWrite(ops);
};

const searchActiveProjects = async (page = 0, lastFetch = 0) => {
  const res = await axios.get(
    `/projects/0.1/projects/active?limit=100&offset=${
      page * 100
    }&from_time=${lastFetch}&full_description=true&job_details=true`,
  );

  if (!res || !res.data || !res.data.result || !res.data.result.projects) {
    return [];
  }

  return res.data;
};

const searchAllActiveProjects = async () => {
  const projects = [];
  const ops = [];
  const lastFetch = await settingsService.getSetting('lastFetch');

  const res = await searchActiveProjects(0, lastFetch);
  projects.push(...res.result.projects);
  console.log('just fetched', projects.length, ' projects');

  for (let page = 1; page < res.result.total_count / 100; page += 1) {
    // eslint-disable-next-line no-await-in-loop
    projects.push(...(await searchActiveProjects(page, lastFetch)).result.projects);
    console.log('just fetched', projects.length, ' projects');
  }

  projects.forEach((project) => {
    ops.push({
      updateOne: {
        filter: {
          id: project.id,
        },
        update: {
          id: project.id,
          owner_id: project.owner_id,
          title: project.title,
          status: project.status,
          seo_url: project.seo_url,
          currency: {
            code: project.currency.code,
            sign: project.currency.sign,
          },
          jobs: project.jobs.map((job) => ({ id: job.id, name: job.name, seo_url: job.seo_url })),
          submitdate: project.submitdate,
          description: project.description,
          bidperiod: project.bidperiod,
          budget: {
            minimum: project.budget.minimum,
            maximum: project.budget.maximum,
          },
          bid_stats: {
            bid_count: project.bid_stats.bid_count,
            bid_avg: project.bid_stats.bid_avg,
          },
          time_submitted: project.time_submitted,
          time_updated: project.time_updated,
        },
        upsert: true,
      },
    });
  });

  const bulkWriteResult = await Projects.bulkWrite(ops);
  console.log('succesfully bulk writed projects from searchActiveProjects result', bulkWriteResult);

  await settingsService.setSetting('lastFetch', Math.round(new Date().getTime() / 1000));
};

module.exports = {
  listJobs,
  listCurrencies,
  searchAllActiveProjects,
};
