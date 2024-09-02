import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewPatient() {
    const [patient, setPatient] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        phoneNumber: "",
        address: "",
        disability:""
      });

  const {id} = useParams();

  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    try {
      const result = await axios.get(`http://localhost:8082/Patients/${id}`);
      console.log(result.data); // Check the API response
      setPatient(result.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  return (
    
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Patient Details</h2>
         
            <div className="card">
              <div className="card-header">
                Details of patient id : {patient.id}
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>First Name:</b> {patient.firstName}
                  </li>
                  <li className="list-group-item">
                    <b>Last Name:</b> {patient.lastName}
                  </li>
                  <li className="list-group-item">
                    <b>Age:</b> {patient.age}
                  </li>
                  <li className="list-group-item">
                    <b>Gender:</b> {patient.gender}
                  </li>
                  <li className="list-group-item">
                    <b>Contact:</b> {patient.phoneNumber}
                  </li>
                  <li className="list-group-item">
                    <b>Address:</b> {patient.address}
                  </li>
                  <li className="list-group-item">
                    <b>Disability:</b> {patient.disability}
                  </li>
                </ul>
              </div>
            </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
  
}