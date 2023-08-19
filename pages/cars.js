/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
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
    <div className="text-center my-4">
      {cars.map((car) => (
        <CarCard key={car.firebaseKey} carObj={car} />
      ))}
    </div>
  );
}
