import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCar } from '../../../api/carData';
import CarForm from '../../../components/forms/CarForm';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleCar(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<CarForm obj={editItem} />);
}
