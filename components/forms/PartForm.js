import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createPart, updatePart } from '../../api/partsData';

const initialState = {
  name: '',
  cost: '',
  quantity: '',
};
function PartForm({ obj, jobId }) {
  const [formInput, setFormInput] = useState(initialState);
  const [job, setJob] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  useEffect(() => {
    setJob(Object.keys(jobId));
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.warn(name, value);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePart(formInput).then(() => router.push(`/jobs/${job[0]}`));
    } else {
      const payload = { ...formInput, uid: user.uid, job_id: job[0] };
      console.warn(payload);
      createPart(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name, id: name };
        updatePart(patchPayload).then(() => {
          router.push(`/jobs/${job[0]}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Part</h2>

      <FloatingLabel controlId="floatingInput1" label="Part Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Part Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Part Cost" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Part Cost"
          name="cost"
          value={formInput.cost}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Part Quantity" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Part Quantity"
          name="quantity"
          value={formInput.quantity}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Part</Button>
    </Form>
  );
}

PartForm.propTypes = {
  jobId: PropTypes.string,
  obj: PropTypes.shape({
    name: PropTypes.string,
    cost: PropTypes.string,
    quantity: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PartForm.defaultProps = {
  obj: initialState,
  jobId: '',
};

export default PartForm;
