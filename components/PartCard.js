import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { deletePart } from '../api/partsData';

export default function PartCard({ partObj }) {
  console.warn(partObj);

  const deleteThisPart = () => {
    if (window.confirm(`Delete ${partObj.name}?`)) {
      deletePart(partObj.firebaseKey).then(() => window.location.reload());
    }
  };

  return (
    <Card style={{ width: '17rem', marginRight: '20px' }}>
      <Card.Body>
        <Card.Title>{partObj.name}</Card.Title>
        <p>Quantity: {partObj.quantity}</p>
        <p>{partObj.cost}</p>
        <Button variant="danger" onClick={deleteThisPart} className="m-2">
          DELETE
        </Button>
        <Link href={`/parts/edit/${partObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            EDIT
          </Button>
        </Link>
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
