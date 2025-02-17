import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Home from './Home';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="main-content">
                <h2>Welcome Back, Admin!</h2>
                <Routes>
                    <Route path="/" element={<Home />} /> 
                </Routes>
            </div>
            <style jsx>{`
            .admin-dashboard {
            display: flex;
            }
      `}</style>
        </div>
    );
};

export default AdminDashboard;
