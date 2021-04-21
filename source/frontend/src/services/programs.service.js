
function getPrograms() {
  const url=process.env.REACT_APP_API_BASE_URL;
  return fetch(url + "programs")
    .then(
      response => response.json()
    );
}

function newProgram(newprogram) {
  const url=process.env.REACT_APP_API_BASE_URL;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newprogram)
  };

  return fetch(url + "program",requestOptions)
        .then(
          response => response.json()
        );
}

function deleteProgram(programId) {
  const url=process.env.REACT_APP_API_BASE_URL;

  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(url + "program/" + programId, requestOptions)
        .then(
          response => response.json()
        );
}

function startProgram(programId) {
  const url=process.env.REACT_APP_API_BASE_URL;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(url + "job/" + programId, requestOptions)
        .then(
          response => response.json()
        );
}

function saveProgram(programId,updatedprogram) {
  const url=process.env.REACT_APP_API_BASE_URL;

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedprogram)
  };

  return fetch(url + "program/" + programId, requestOptions)
        .then(
          response => response.json()
        );
}

function getRunningProgram() {
  const url=process.env.REACT_APP_API_BASE_URL;

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(url + "runningprogram/" , requestOptions)
        .then(
          response => response.json()
        );
}

function updateJob(jobid,status){
  const url=process.env.REACT_APP_API_BASE_URL;
  const body={"STATUS": status}

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  return fetch(url + "job/"+jobid, requestOptions)
        .then(
          response => response.json()
        );
}

function getJobLogs(jobid) {
  const url=process.env.REACT_APP_API_BASE_URL;

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(url + "joblog/"+jobid, requestOptions)
        .then(
          response => response.json()
        );
}

const ServiceProgram = {
    getPrograms: getPrograms,
    newProgram: newProgram,
    deleteProgram: deleteProgram,
    saveProgram: saveProgram,
    startProgram: startProgram,
    getRunningProgram: getRunningProgram,
    getJobLogs: getJobLogs,
    updateJob: updateJob
};

export default ServiceProgram;
