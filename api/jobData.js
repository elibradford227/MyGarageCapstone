import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getJobs = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/jobs.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleJob = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/jobs/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCarsJobs = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/jobs.json?orderBy="car_id"&equalTo="${id}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export { getJobs, getCarsJobs, getSingleJob };
