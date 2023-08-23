/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getSingleJob, deleteJob } from '../../api/jobData';

export default function ViewCar() {
  const [jobDetails, setJobDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  const deleteThisJob = () => {
    if (window.confirm(`Delete ${jobDetails.title} job?`)) {
      deleteJob(jobDetails.firebaseKey).then(() => { router.push('/jobs'); });
    }
  };

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleJob(firebaseKey).then(setJobDetails);
  }, [firebaseKey]);

  console.warn(jobDetails);

  return (
    <div className="mt-5 d-flex flex-wrap" id="carViewContainer">
      <div
        id="carColumn"
        className="d-flex flex-column"
      >
        <h2>
          {jobDetails.title}
        </h2>
        <p>{jobDetails.description || ''}</p>
        <Button variant="danger" onClick={deleteThisJob} className="m-2">
          DELETE
        </Button>
        <Link href={`/jobs/edit/${jobDetails.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            EDIT
          </Button>
        </Link>
      </div>
      <div id="carsJobs">
        <h1 id="jobsh1">Jobs</h1>
        <Button variant="primary" className="addBtn">Add A Part</Button>
        <div id="jobsDisplay">
          {/* {carsJobs.map((job) => (
            <JobCard key={job.firebaseKey} jobObj={job} />
          ))} */}
        </div>
      </div>
    </div>
  );
}
