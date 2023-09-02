/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CompleteJobCard from '../../../components/CompleteJobCard';
import { getCarsCompleteJobs, getSingleCar } from '../../../api/carData';

export default function JobHistory() {
  const [car, setCar] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getCar = () => {
    getSingleCar(firebaseKey).then(setCar);
  };

  const getJobs = () => {
    getCarsCompleteJobs(firebaseKey).then((result) => setCompletedJobs(result));
  };

  useEffect(() => {
    getJobs();
    getCar();
  }, []);

  return (
    <div>
      <div className="pageHead">
        <h1>{car.make} {car.model} Completed Jobs</h1>
      </div>
      {completedJobs.map((job) => (
        <CompleteJobCard key={job.firebaseKey} jobObj={job} />
      ))}
    </div>
  );
}
