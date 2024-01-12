import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { getSingleCar } from '../api/carData';

export default function CompleteJobCard({ jobObj }) {
  const [car, setCar] = useState({});

  useEffect(() => {
    getSingleCar(jobObj.car_id).then(setCar);
  }, [jobObj.car_id]);

  return (
    <Card style={{ width: '18rem', marginRight: '20px' }}>
      <Card.Body>
        <Card.Title>{jobObj.title}</Card.Title>
        <p>{car.make} {car.model}</p>
        <p>Completed: {jobObj.date}</p>
      </Card.Body>
    </Card>
  );
}

CompleteJobCard.propTypes = {
  jobObj: PropTypes.shape({
    title: PropTypes.string,
    car_id: PropTypes.string,
    make: PropTypes.string,
    date: PropTypes.string,
    model: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
