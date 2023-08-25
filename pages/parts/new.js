import React from 'react';
import { useRouter } from 'next/router';
import PartForm from '../../components/forms/PartForm';

export default function AddPart() {
  const router = useRouter();
  const data = router.query;
  return <PartForm jobId={data} />;
}
