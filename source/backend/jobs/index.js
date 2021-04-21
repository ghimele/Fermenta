const {Enum} = require('../utils');

const jobs = [
  {
    name: Enum.JOBTYPE.PROGRAM,
    timeout: '5s', // give program script time to run
    interval: '1000'
  }
];

module.exports = jobs;