/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createCar, updateCar } from '../../api/carData';

const initialState = {
  make: '',
  model: '',
  year: '',
  mileage: '',
  image: '',
};
function CarForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      setFormInput((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateCar(formInput).then(() => router.push(`/cars/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCar(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name, id: name };
        updateCar(patchPayload).then(() => {
          router.push('/cars');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Car</h2>

      <FloatingLabel controlId="floatingInput1" label="Car Year" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Car Year"
          name="year"
          value={formInput.year}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Car Make" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Car Make"
          name="make"
          value={formInput.make}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Car Model" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Car Model"
          name="model"
          value={formInput.model}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Car Mileage" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Car Mileage"
          name="mileage"
          value={formInput.mileage}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Label className="ml-3">Car Image (Optional)</Form.Label>
      <div className="d-flex align-items-center">
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-3"
        />
        {formInput.image && (
          <img
            src={formInput.image}
            alt="profile"
            style={{ height: '250px', width: '250px', borderRadius: '0%' }}
          />
        )}
      </div>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Car</Button>
    </Form>
  );
}

CarForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CarForm.defaultProps = {
  obj: initialState,
};

export default CarForm;
