/* eslint-disable prefer-const */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function CatalogPartCard({ partObj, removePart, partQuantity }) {
  let [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState(partObj.cost);

  const increment = () => {
    setQuantity(quantity += 1);
    setCost(cost + partObj.cost);
    partQuantity(quantity, partObj);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity -= 1);
      setCost(cost - partObj.cost);
      partQuantity(quantity, partObj);
    }
  };

  return (
    <Card style={{ width: '17rem', marginRight: '20px' }}>
      <Card.Body>
        <Card.Title>{partObj.name}</Card.Title>
        <p>${cost}</p>
        <Button variant="primary" className="m-2" onClick={decrement}>
          -
        </Button>
        {quantity}
        <Button variant="primary" className="m-2" onClick={increment}>
          +
        </Button>
        <Button variant="danger" className="m-2" onClick={() => removePart(partObj)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

CatalogPartCard.propTypes = {
  partObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.string,
    cost: PropTypes.string,
    job_id: PropTypes.string,
    model: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  partQuantity: PropTypes.func.isRequired,
  removePart: PropTypes.func.isRequired,
};
