/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getJobsWithDetails } from '../api/jobData';
import JobCard from '../components/JobCard';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const getAllJobs = () => {
    getJobsWithDetails().then(setJobs);
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
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
