/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getJobs } from '../api/jobData';
import { getJobsParts } from '../api/partsData';
import { useAuth } from '../utils/context/authContext';
import JobCard from '../components/JobCard';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [totalCosts, setTotalCosts] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { user } = useAuth();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setSearchResults(jobs);
    const results = jobs.filter((job) => job.title.toLowerCase().includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm]);

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
    getJobs(user.uid).then(setJobs);
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
      <div className="pageHead">
        <h1>Jobs</h1>
        <h2>Expenses: ${totalCosts}</h2>
        <input
          type="text"
          placeholder="Search Jobs"
          value={searchTerm}
          onChange={handleChange}
        />
        <Link href="/jobs/new" passHref>
          <Button variant="primary" className="addBtnJobs">Add A Job</Button>
        </Link>
      </div>
      <div id="jobsPageBody">
        <div className="d-flex flex-wrap">
          {
        jobs.length === 0 ? (
          <>
            <h2>No jobs to display</h2>
          </>
        ) : (
          <div className="d-flex flex-wrap">
            {searchResults.length === 0 ? jobs.map((job) => (
              <JobCard key={job.firebaseKey} jobObj={job} />
            )) : searchResults.map((job) => (
              <JobCard key={job.firebaseKey} jobObj={job} />
            ))}
          </div>
        )
      }
        </div>
      </div>
    </div>
  );
}
