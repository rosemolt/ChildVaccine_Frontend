import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ parent, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Site Title */}
        <Link to="/" className="navbar-brand">
          <span className="brand-highlight">CHILD</span> VACCINE
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          {/* <Link to="/" className="nav-item">Home</Link> Home link does not trigger logout */}

          {!parent && <Link to="/login" className="nav-item">Login</Link>}

          {/* Show Logout Only When Parent is Logged In */}
          {parent && (
            <button className="nav-item" style={{ color: 'red' }} onClick={onLogout}>⚙ Logout</button>
          )}
        </div>
      </div>

      {/* Navbar Styles */}
      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #00d1b2, #00796b);
          padding: 0.8rem 1.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .navbar-brand {
          font-size: 1.7rem;
          font-weight: bold;
          color: #fff;
          text-transform: uppercase;
          text-decoration: none;
        }
        .brand-highlight {
          color: #ffeb3b;
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
        }
        .nav-item {
          font-size: 1.2rem;
          color: #fff;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.3s ease, transform 0.2s;
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-item:hover {
          color: #ffeb3b;
          transform: scale(1.1);
        }
        @media (max-width: 768px) {
          .nav-links {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
