import React from 'react';
import { useRouter } from 'next/router';
import JobForm from '../../components/forms/JobForm';

export default function AddCar() {
  const router = useRouter();
  const data = router.query;
  return <JobForm obj={data} />;
}
