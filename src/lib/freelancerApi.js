const axios = require('../utils/axios');
const Jobs = require('../models/jobs');
const Currencies = require('../models/currencies');
const Projects = require('../models/projects');
const mocker = require('../utils/mocker');

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

const searchActiveProjects = async () => {
  const ops = [];
  // const res = await axios.get(
  //   '/projects/0.1/projects/active?full_description=true&job_details=true',
  // );
  // mocker.writeMock('searchActiveProjects', res.data);
  const res = { data: mocker.readMock('searchActiveProjects') };

  if (!res || !res.data || !res.data.result || !res.data.result.projects) {
    return;
  }

  res.data.result.projects.forEach((project) => {
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
};

searchActiveProjects();

module.exports = {
  listJobs,
  listCurrencies,
  searchActiveProjects,
};
