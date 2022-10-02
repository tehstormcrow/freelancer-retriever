const fs = require('fs');
const path = require('path');

const getMockDirectory = (filename) => path.join(process.env.PWD, 'mocks', `${filename}.json`);

const writeMock = (file, data) => {
  fs.writeFileSync(getMockDirectory(file), JSON.stringify(data, null, 2));
};

const readMock = (file) => JSON.parse(fs.readFileSync(getMockDirectory(file)));

module.exports = {
  writeMock,
  readMock,
};
