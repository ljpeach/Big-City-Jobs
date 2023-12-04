import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Your Logo
      </Link>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className='nav-link' to='donate'>Donate</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="loginsignup">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="loginsignup">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
