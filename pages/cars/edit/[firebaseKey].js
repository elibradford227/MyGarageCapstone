import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCar } from '../../../api/carData';
import CarForm from '../../../components/forms/CarForm';

export default function EditCar() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCar(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CarForm obj={editItem} />);
}
