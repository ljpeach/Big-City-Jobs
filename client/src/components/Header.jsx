import React from 'react';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Your Logo
      </a>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Donate
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Signup
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
