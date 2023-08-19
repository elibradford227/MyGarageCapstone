import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function CarCard({ carObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={carObj.image} alt={carObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{carObj.year} {carObj.make} {carObj.model}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/book/${carObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/book/edit/${carObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
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
