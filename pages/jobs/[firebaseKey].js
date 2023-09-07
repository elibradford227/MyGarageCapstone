/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import PartCard from '../../components/PartCard';
import {
  getSingleJob, deleteJob, markJobComplete, updateCompleteJob,
} from '../../api/jobData';
import { getJobsParts } from '../../api/partsData';
import deleteJobsParts from '../../api/mergedData';

export default function ViewJob() {
  const [jobDetails, setJobDetails] = useState({});
  const [jobParts, setJobParts] = useState([]);
  const [totalCosts, setTotalCosts] = useState('');
  const router = useRouter();

  const { firebaseKey } = router.query;

  const deleteThisJob = () => {
    if (window.confirm(`Delete ${jobDetails.title} job?`)) {
      deleteJob(jobDetails.firebaseKey).then(deleteJobsParts(jobDetails.firebaseKey)).then(() => { router.push('/jobs'); });
    }
  };

  const calculateCosts = useCallback(() => {
    let countCost = 0;
    for (let i = 0; i < jobParts.length; i++) {
      countCost += Number(`${jobParts[i].cost}`) * Number(`${jobParts[i].quantity}`);
    }
    setTotalCosts(countCost);
  }, [jobParts]);

  const markComplete = () => {
    if (window.confirm('Are you sure you want to mark this job as completed?')) {
      markJobComplete(jobDetails).then(({ name }) => {
        const patchPayload = { firebaseKey: name, id: name, date: new Date().toISOString().split('T')[0] };
        updateCompleteJob(patchPayload);
      }).then(deleteJob(jobDetails.firebaseKey)).then(() => { router.push(`/cars/${jobDetails.car_id}`); });
    }
  };

  useEffect(() => {
    getSingleJob(firebaseKey).then(setJobDetails);
    getJobsParts(jobDetails.id).then(setJobParts);
  }, [firebaseKey, jobDetails.id]);

  useEffect(() => {
    calculateCosts();
  }, [calculateCosts]);

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
        <p>${totalCosts}</p>
        <Button variant="danger" onClick={deleteThisJob} className="m-2">
          Delete Job
        </Button>
        <Link href={`/jobs/edit/${jobDetails.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            Edit Job
          </Button>
        </Link>
        <Button variant="primary" className="m-2" onClick={markComplete}>Mark Complete</Button>
      </div>
      <div id="carsJobs">
        <h1 id="jobsh1">Parts</h1>
        <Link
          href={{
            pathname: '/parts/new',
            query: firebaseKey,
          }}
          passHref
        >
          <Button variant="primary" className="addBtn">Add A Part</Button>
        </Link>
        <div id="jobsDisplay" className="d-flex flex-wrap">
          {jobParts.map((part) => (
            <PartCard key={part.firebaseKey} partObj={part} />
          ))}
        </div>
      </div>
    </div>
  );
}
