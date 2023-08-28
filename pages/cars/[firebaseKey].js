/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getSingleCar, deleteCar } from '../../api/carData';
import { getCarsJobs } from '../../api/jobData';
import deleteJobsParts from '../../api/mergedData';
import JobCard from '../../components/JobCard';

export default function ViewCar() {
  const [carDetails, setCarDetails] = useState({});
  const [carsJobs, setCarsJobs] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const deleteThisCar = () => {
    if (window.confirm(`Delete ${carDetails.model}?`)) {
      deleteCar(carDetails.firebaseKey).then(carsJobs.forEach((job) => deleteJobsParts(job.firebaseKey))).then(() => { router.push('/cars'); });
    }
  };

  useEffect(() => {
    getSingleCar(firebaseKey).then(setCarDetails);
    getCarsJobs(carDetails.id).then(setCarsJobs);
  }, [firebaseKey, carDetails.id]);

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
          Delete
        </Button>
        <Link href={`/cars/edit/${carDetails.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            Edit
          </Button>
        </Link>
      </div>
      <div id="carsJobs">
        <h1 id="jobsh1">Jobs</h1>
        {/* <Link href="/jobs/new" passHref> */}
        <Link
          href={{
            pathname: '/jobs/new',
            query: carDetails.firebaseKey,
          }}
          passHref
        >
          <Button variant="primary" className="addBtn">Add A Job</Button>
        </Link>
        <div id="jobsDisplay">
          {carsJobs.map((job) => (
            <JobCard key={job.firebaseKey} jobObj={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
