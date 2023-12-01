import React from 'react';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* Left side - Donate Button */}
      <a className="navbar-brand" href="#">
        <button className="btn btn-warning">Donate</button>
      </a>

      {/* Right side - Login and Signup Buttons */}
      <div className="navbar-collapse ">
        <ul className="navbar-nav justify">
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
