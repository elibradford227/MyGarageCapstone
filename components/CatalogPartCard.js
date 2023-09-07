import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function SelectedPartCard({ partObj, handleClick }) {
  return (
    <Card style={{ width: '17rem', marginRight: '20px' }}>
      <Card.Body>
        <Card.Title>{partObj.name}</Card.Title>
        <p>${partObj.cost}</p>
        <Button variant="primary" className="m-2" onClick={() => handleClick(partObj)}>
          Add
        </Button>
      </Card.Body>
    </Card>
  );
}

SelectedPartCard.propTypes = {
  partObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.string,
    cost: PropTypes.string,
    job_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};
