const {Enum} = require('../utils');

const jobs = [
  {
    name: Enum.JOBTYPE.PROGRAM,
    timeout: '1s', // give program script time to run
    interval: '1000'
  },
  {
    name: Enum.JOBTYPE.EMAIL,
    timeout: '3s', // give email script time to run
    interval: '1000'
  }
];

// 
module.exports = jobs;