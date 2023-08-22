/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { getSingleCar, deleteCar } from '../../api/carData';
import { getCarsJobs } from '../../api/jobData';
import JobCard from '../../components/JobCard';

export default function ViewCar() {
  const [carDetails, setCarDetails] = useState({});
  const [carsJobs, setCarsJobs] = useState([]);
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const deleteThisCar = () => {
    if (window.confirm(`Delete ${carDetails.model}?`)) {
      deleteCar(carDetails.firebaseKey).then(() => { router.push('/cars'); });
    }
  };

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleCar(firebaseKey).then(setCarDetails);
    getCarsJobs(carDetails.id).then(setCarsJobs);
  }, [firebaseKey, carDetails.id]);

  console.warn(carsJobs);

  return (
    <div className="mt-5 d-flex flex-wrap" id="carViewContainer">
      <div
        id="carColumn"
        className="d-flex flex-column"
      >
        <img src={carDetails.image ? carDetails.image : '../default-car.webp'} alt={carDetails.title} style={{ height: '200px', width: '270px' }} />
        <h3>
          {carDetails.make} {carDetails.model}
        </h3>
        <h4>
          Year: {carDetails.year}
        </h4>
        <div className="text-white ms-5 details">
          <p>{carDetails.description || ''}</p>
        </div>
        <Button variant="danger" onClick={deleteThisCar} className="m-2">
          DELETE
        </Button>
      </div>
      <div id="carsJobs">
        <h1 id="jobsh1">Jobs</h1>
        <Button variant="primary" className="addBtn">Add A Job</Button>
        <div id="jobsDisplay">
          {carsJobs.map((job) => (
            <JobCard key={job.firebaseKey} jobObj={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
