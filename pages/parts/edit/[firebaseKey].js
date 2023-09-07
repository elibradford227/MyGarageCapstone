import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePart } from '../../../api/partsData';
import PartForm from '../../../components/forms/PartForm';

export default function EditJob() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const data = router.query;

  console.warn(firebaseKey, data);

  useEffect(() => {
    getSinglePart(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<PartForm obj={editItem} jobId={data} />);
}
