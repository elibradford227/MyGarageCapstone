import { deleteJob } from './jobData';
import { getJobsParts, deletePart } from './partsData';

const deleteJobsParts = (jobId) => new Promise((resolve, reject) => {
  getJobsParts(jobId).then((partsArray) => {
    console.warn(partsArray, 'Jobs parts');
    const deletePartPromises = partsArray.map((part) => deletePart(part.firebaseKey));

    Promise.all(deletePartPromises).then(() => {
      deleteJob(jobId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export default deleteJobsParts;
