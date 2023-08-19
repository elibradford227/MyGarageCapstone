import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCars = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cars.json?orderBy="uid"&equalTo="${uid}"`, {
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

const getSingleCar = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cars/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getCars, getSingleCar };
