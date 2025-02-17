import React from 'react';
import { Link } from 'react-router-dom';

const ParentSidebar = ({ setViewProfile }) => {
  return (
    <div style={sidebarStyle}>
      <h3 style={sidebarHeaderStyle}>Parent Dashboard</h3>
      <div style={linkStyle}>
        <Link to="#" onClick={() => setViewProfile(true)} style={linkItemStyle}>👤 View Profile</Link>
        <Link to="/add-child" style={linkItemStyle}>➕ Add Child</Link>
      </div>
    </div>
  );
};

const sidebarStyle = {
  width: '250px',
  height: '100%',
  backgroundColor: '#00796b',
  color: '#fff',
  padding: '20px',
  position: 'fixed',
  top: 0,
  left: 0,
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
};

const sidebarHeaderStyle = {
  color: '#ffeb3b',
  fontSize: '1.5rem',
  marginBottom: '20px',
};

const linkStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const linkItemStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.2rem',
  marginBottom: '15px',
  transition: 'color 0.3s',
};

linkItemStyle[':hover'] = {
  color: '#ffeb3b',
};

export default ParentSidebar;
