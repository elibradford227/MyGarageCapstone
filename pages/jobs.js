/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { getCarsJobs } from '../api/jobData';
import JobCard from '../components/JobCard';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const getAllJobs = () => {
    getCarsJobs().then(setJobs);
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="text-center my-4">
      {jobs.map((job) => (
        <JobCard key={job.firebaseKey} jobObj={job} />
      ))}
    </div>
  );
}
