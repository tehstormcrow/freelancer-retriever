const axios = require('axios');

module.exports = axios.create({
  baseURL: 'https://www.freelancer.com/api/',
  headers: { 'X-Custom-Header': 'foobar' },
});
