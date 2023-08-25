import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePart } from '../../../api/partsData';
import PartForm from '../../../components/forms/PartForm';

export default function EditJob() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;
  const data = router.query;

  console.warn(firebaseKey, data);

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSinglePart(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<PartForm obj={editItem} jobId={data} />);
}
