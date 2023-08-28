/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getCars } from '../api/carData';
import CarCard from '../components/CarCard';

export default function Cars() {
  const [cars, setCars] = useState([]);

  const { user } = useAuth();

  const getAllCars = () => {
    getCars(user.uid).then(setCars);
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <div>
      <h1>Cars</h1>
      <Link href="/cars/new" passHref>
        <Button variant="primary" className="addBtn">Add A Car</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {cars.map((car) => (
          <CarCard key={car.firebaseKey} carObj={car} />
        ))}
      </div>
    </div>
  );
}
