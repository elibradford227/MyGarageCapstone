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
import { getCars, getSingleCarByID, getSingleCar } from '../../api/carData';

const initialState = {
  title: '',
  description: '',
  car_id: '',
};
function JobForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const getAllCars = () => {
    getCars(user.uid).then(setCars);
  };

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
      getSingleCarByID(obj.car_id).then((result) => setSelectedCar(`${result[0].year} ${result[0].make} ${result[0].model}`));
    } else if (Object.keys(obj).length === 0) {
      setSelectedCar('');
    } else if (obj) {
      getSingleCar(Object.keys(obj)).then((result) => {
        formInput.car_id = result.firebaseKey;
        setSelectedCar(`${result.year} ${result.make} ${result.model}`);
      });
    }
    getAllCars();
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (e) => {
    const displayVal = e.split(',');
    setSelectedCar(`${displayVal[1]} ${displayVal[2]} ${displayVal[3]}`);
    const value = displayVal[0];
    setFormInput((prevState) => ({
      ...prevState,
      car_id: value,
    }));
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
          router.push(`/cars/${Object.keys(obj)}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Job</h2>

      <FloatingLabel controlId="floatingInput1" label="Job title" className="mb-3">
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
      <p>You selected: {selectedCar}</p>
      <DropdownButton id="dropdown-basic-button" type="dropdown" title={selectedCar === '' ? 'Select a Car' : 'Car Selected!'} name="car_id" onSelect={handleSelect} required>
        {cars.map((car) => (
          <Dropdown.Item eventKey={[car.id, car.year, car.make, car.model]}>{car.year} {car.make} {car.model}</Dropdown.Item>
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
    car_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

JobForm.defaultProps = {
  obj: initialState,
};

export default JobForm;
