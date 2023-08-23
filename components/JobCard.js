/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { getSingleCar } from '../api/carData';

export default function JobCard({ jobObj }) {
  const [car, setCar] = useState({});

  console.warn(car);

  useEffect(() => {
    getSingleCar(jobObj.car_id).then(setCar);
  }, []);

  return (
    <Card style={{ width: '18rem', marginRight: '20px' }}>
      <Card.Body>
        <Card.Title>{jobObj.title}</Card.Title>
        <p>{car.make} {car.model}</p>
        <Link href={`/jobs/${jobObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

JobCard.propTypes = {
  jobObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    car_id: PropTypes.string,
    make: PropTypes.string,
    year: PropTypes.string,
    model: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
