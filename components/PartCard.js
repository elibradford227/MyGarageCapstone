import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function PartCard({ partObj }) {
  console.warn(partObj);
  return (
    <Card style={{ width: '17rem', marginRight: '20px' }}>
      <Card.Body>
        <Card.Title>{partObj.name}</Card.Title>
        <p>Quantity: {partObj.quantity}</p>
        <p>{partObj.cost}</p>
      </Card.Body>
    </Card>
  );
}

PartCard.propTypes = {
  partObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.string,
    cost: PropTypes.string,
    model: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
