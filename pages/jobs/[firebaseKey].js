/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import PartCard from '../../components/PartCard';
import { getSingleJob, deleteJob } from '../../api/jobData';
import { getJobsParts } from '../../api/partsData';

export default function ViewJob() {
  const [jobDetails, setJobDetails] = useState({});
  const [jobParts, setJobParts] = useState([]);
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
    getJobsParts(jobDetails.id).then(setJobParts);
  }, [firebaseKey, jobDetails.id]);

  console.warn(jobParts);

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
        <h1 id="jobsh1">Parts</h1>
        {/* <Link href="/parts/new" passHref> */}
        <Link
          href={{
            pathname: '/parts/new',
            query: firebaseKey,
          }}
          passHref
        >
          <Button variant="primary" className="addBtn">Add A Part</Button>
        </Link>
        <div id="jobsDisplay">
          {jobParts.map((part) => (
            <PartCard key={part.firebaseKey} partObj={part} />
          ))}
        </div>
      </div>
    </div>
  );
}
