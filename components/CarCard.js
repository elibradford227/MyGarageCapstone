import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function CarCard({ carObj }) {
  return (
    <Card style={{ width: '17rem', marginRight: '20px', height: '20rem' }} className="carCard">
      <Card.Img variant="top" src={carObj.image ? carObj.image : 'default-car.webp'} alt={carObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{carObj.year} {carObj.make} {carObj.model}</Card.Title>
        <Link href={`/cars/${carObj.firebaseKey}`} passHref>
          <Button variant="primary" className="viewBtn">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

CarCard.propTypes = {
  carObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    make: PropTypes.string,
    year: PropTypes.string,
    model: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
