import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddPatient() {
  const navigate = useNavigate();

  const [patient, setPatients] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    address: "",
    disability: ""
  });

  const [error, setError] = useState(""); // State to handle validation errors

  const { firstName, lastName, age, gender, phoneNumber, address, disability } = patient;

  const onInputChange = (e) => {
    setPatients({ ...patient, [e.target.name]: e.target.value });
    if (e.target.name === 'phoneNumber') {
      validatePhoneNumber(e.target.value);
    }
  };

  const validatePhoneNumber = (value) => {
    // Regular expression to validate phone number format: +<CountryCode><10Digits>
    const regex = /^\+\d{1,3}\d{11}$/;
    if (regex.test(value)) {
      setError(""); // Clear error if valid
    } else {
      setError("Phone number must be in the format +<CountryCode> followed by exactly 10 digits");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Validate phone number before submitting
    if (error) {
      return; // Do not submit if there's an error
    }
    try {
      await axios.post("http://localhost:8082/Patients", patient);
      navigate("/");
    } catch (err) {
      console.error('Error adding patient:', err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add New Patient</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor='firstName' className='form-label'>
                First Name
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter first name'
                name='firstName'
                value={firstName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor='lastName' className='form-label'>
                Last Name
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter last name'
                name='lastName'
                value={lastName}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor='age' className='form-label'>
                Age
              </label>
              <input
                type='number'
                className='form-control'
                placeholder='Enter age'
                name='age'
                min='0'
                step='1'
                value={age}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor='gender' className='form-label'>
                Gender
              </label>
              <select
                className='form-control'
                name='gender'
                id='gender'
                value={gender}
                onChange={onInputChange}
              >
                <option value='' disabled>Select gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor='phoneNumber' className='form-label'>
                Phone Number
              </label>
              <input
                type='tel'
                className='form-control'
                placeholder='Enter phone number'
                name='phoneNumber'
                id='phoneNumber'
                value={phoneNumber}
                onChange={onInputChange}
                // Optional pattern attribute to provide hint on input format
                pattern="^\+\d{1,3}\d{11}$"
              />
              {error && <div className="text-danger">{error}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor='address' className='form-label'>
                Address
              </label>
              <textarea
                className='form-control'
                placeholder='Enter address'
                name='address'
                id='address'
                rows='3'
                value={address}
                onChange={onInputChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor='disability' className='form-label'>
                Disability
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter disability'
                name='disability'
                value={disability}
                onChange={onInputChange}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type='submit' className='btn btn-primary' disabled={!!error}>Submit</button>
              <Link type='button' className='btn btn-outline-danger' to='/'>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
