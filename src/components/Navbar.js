import React from "react";
import LockOpen from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" to="/">
          <img src="/imagens/logo.png" width="150px" className="d-inline-block align-top" alt="Logo MovieRise" />
        </Link>
        <Link to="/login" className="btn btn-outline-light" tabIndex="1" role="button">
          <LockOpen className="logout" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
