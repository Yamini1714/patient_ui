import React from 'react'
import { Link } from 'react-router-dom'

const PrimarySearchAppBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
    <a className="navbar-brand" href="#">Health Track</a>
  
    <Link className='btn btn-outline-light' to="/addpatient">
      Add Patient </Link>
    
    
  </div>
</nav>
    </div>
  )
}

export default PrimarySearchAppBar