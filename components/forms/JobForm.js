/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createJob, updateJob } from '../../api/jobData';
import { getCars, getSingleCar } from '../../api/carData';

const initialState = {
  title: '',
  description: '',
  car_id: '',
};
function JobForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [cars, setCars] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllCars = () => {
    getCars(user.uid).then(setCars);
  };

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getAllCars();
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(formInput);
  };

  const handleSelect = (e) => {
    // console.warn(e);
    // setValue(e);
    const value = e;
    setFormInput((prevState) => ({
      ...prevState,
      car_id: value,
    }));
    console.warn(formInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateJob(formInput).then(() => router.push(`/jobs/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createJob(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name, id: name };
        updateJob(patchPayload).then(() => {
          router.push('/jobs');
        });
      });
    }
  };

  // cars.map((car) => console.warn(car.id, car.year, car.make, car.model));

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Job</h2>

      <FloatingLabel controlId="floatingInput2" label="Job title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Job title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Job description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Job description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <DropdownButton id="dropdown-basic-button" type="dropdown" title={formInput.car_id === '' ? 'Select a Car' : 'Car Selected!'} name="car_id" onSelect={handleSelect}>
        {cars.map((car) => (
          <Dropdown.Item eventKey={car.id}>{car.year} {car.make} {car.model}</Dropdown.Item>
        ))}
      </DropdownButton>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Job</Button>
    </Form>
  );
}

JobForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

JobForm.defaultProps = {
  obj: initialState,
};

export default JobForm;