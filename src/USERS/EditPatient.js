import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditPatient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    address: "",
    disability: ""
  });

  const [error, setError] = useState("");

  const { firstName, lastName, age, gender, phoneNumber, address, disability } = patient;

  // Handle input changes
  const onInputChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  // Phone number validation function
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+\d{1,3}\d{11}$/; // Format: +<CountryCode> and exactly 10 digits
    return phoneRegex.test(phoneNumber);
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Phone number must be in the format +<CountryCode> followed by exactly 10 digits.");
      return;
    }

    try {
      await axios.put(`http://localhost:8082/Patients/${id}`, patient);
      navigate("/");
    } catch (error) {
      console.error("Error updating patient:", error);
      setError("Failed to update patient. Please try again.");
    }
  };

  // Load patient data
  const loadPatient = async () => {
    try {
      const result = await axios.get(`http://localhost:8082/Patients/${id}`);
      setPatient(result.data);
    } catch (error) {
      console.error("Error loading patient:", error);
      setError("Failed to load patient details.");
    }
  };

  useEffect(() => {
    loadPatient();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Patient</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={onSubmit}>
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
              />
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
              <button type='submit' className='btn btn-primary'>Submit</button>
              <Link type='button' className='btn btn-outline-danger' to='/'>Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
