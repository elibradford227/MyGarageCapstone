/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getJobsWithDetails } from '../api/jobData';
import { getJobsParts } from '../api/partsData';
import JobCard from '../components/JobCard';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [totalCosts, setTotalCosts] = useState(0);

  const getAllPartsTotal = () => {
    let sum = 0;
    jobs.forEach((e) => {
      getJobsParts(e.id).then((part) => {
        part.forEach((item) => {
          sum += Number(`${item.cost}`) * Number(`${item.quantity}`);
          setTotalCosts(sum);
        });
      });
    });
  };

  const getAllJobs = () => {
    getJobsWithDetails().then(setJobs);
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  useEffect(() => {
    getAllPartsTotal();
  }, [jobs]);

  return (
    <div>
      <head>
        <title>MyGarage | Jobs</title>
      </head>
      <h1>Jobs</h1>
      <h2>Expenses:${totalCosts}</h2>
      <Link href="/jobs/new" passHref>
        <Button variant="primary" className="addBtn">Add A Job</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {jobs.map((job) => (
          <JobCard key={job.firebaseKey} jobObj={job} />
        ))}
      </div>
    </div>
  );
}
