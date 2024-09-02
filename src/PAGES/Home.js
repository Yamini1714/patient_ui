import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Home() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8082/Patients');
      const sortedPatients = sortPatients(response.data, sortOrder);
      setPatients(sortedPatients);
      setTotalPages(Math.ceil(sortedPatients.length / patientsPerPage));
    } catch (error) {
      console.error('Error loading patients:', error);
    }
  };

  const sortPatients = (data, order) => {
    return [...data].sort((a, b) => (order === 'asc' ? a.id - b.id : b.id - a.id));
  };

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    const sortedPatients = sortPatients(patients, newOrder);
    setPatients(sortedPatients);
    setCurrentPage(1);
  };

  const confirmDelete = (id) => {
    setPatientToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (patientToDelete) {
      await axios.delete(`http://localhost:8082/Patients/${patientToDelete}`);
      loadPatients();
      setShowModal(false);
      setPatientToDelete(null);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.firstName.toLowerCase().includes(searchQuery) ||
    patient.lastName.toLowerCase().includes(searchQuery) ||
    patient.gender.toLowerCase().includes(searchQuery) ||
    patient.phoneNumber.includes(searchQuery)
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const generatePageNumbers = () => {
    const maxPagesToShow = 7;
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <div className="py-4">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by First Name, Last Name, Gender, or Contact"
          value={searchQuery}
          onChange={handleSearch}
        />

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col" onClick={handleSort} style={{ cursor: 'pointer' }}>
                Id
                <span className="ms-2">
                  {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
                </span>
              </th>
              <th scope="col">First</th>
              <th scope="col">Lat</th>
              <th scope="col">Gender</th>
              <th scope="col">Contact</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((patient, index) => (
              <tr key={index}>
                <th scope="row">{indexOfFirstPatient + index + 1}</th>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.gender}</td>
                <td>{patient.phoneNumber}</td>
                <td>
                  
                  <Link className="btn btn-outline-primary mx-2" to={`/editpatient/${patient.id}`}>Edit</Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => confirmDelete(patient.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                &laquo;
              </button>
            </li>
            {generatePageNumbers().map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button onClick={() => paginate(page)} className="page-link">
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                &raquo;
              </button>
            </li>
          </ul>
        </nav>

        {currentPage > 5 && (
          <button className="btn btn-primary my-2" onClick={resetToFirstPage}>
            Back to Home
          </button>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this patient permanently?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Permanently
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
