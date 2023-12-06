import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark p-2 d-flex justify-content-between">
      <Link className="navbar-brand" to="/">
        Your Logo
      </Link>

      <ul className="navbar-nav">
        {
          Auth.loggedIn() ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logout}>Logout</Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="loginsignup">Log In/Sign Up</Link>
            </li>
          )
        }
        <li className="nav-item">
          <Link className='nav-link' to='donate'>Donate</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
