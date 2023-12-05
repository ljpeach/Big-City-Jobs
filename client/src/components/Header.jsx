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
            <Link className="nav-link" to="loginsignup">Log In/Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className='nav-link' to='donate'>Donate</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
