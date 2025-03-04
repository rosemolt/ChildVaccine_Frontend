import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStethoscope, FaFileMedical, FaClipboardList, FaFilePrescription, FaSignOutAlt, FaBars } from "react-icons/fa";

const DoctorDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
                <h2 className="sidebar-title">Doctor Dashboard</h2>
                <ul className="sidebar-menu">
                    <li>
                        <Link to="/view-children" className="sidebar-link">
                            <FaClipboardList /> View Child Details
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/check-polio" className="sidebar-link">
                            <FaStethoscope /> Check Polio Condition
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/update-vaccination" className="sidebar-link">
                            <FaFileMedical /> Update Vaccination Status
                        </Link>
                    </li>
                    <li>
                        <Link to="/update-certificate" className="sidebar-link">
                            <FaFilePrescription /> Update & Send Certificates
                        </Link>
                    </li>
                </ul>
                <Link to="/" className="logout-btn">
                    <FaSignOutAlt /> Logout
                </Link>
            </div>

            {/* Main Content Area */}
            <div className="main-content">
                {/* Sidebar Toggle Button */}
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="toggle-btn">
                    <FaBars />
                </button>

                {/* Page Content */}
                <div className="content-box">
                    <h2>Welcome to the Doctor Dashboard</h2>
                    <p>Select an option from the sidebar to proceed.</p>
                </div>
            </div>
            <style jsx>{`
            /* Main Container */
            .dashboard-container {
                display: flex;
                height: 100vh;
                background-color: #f4f4f4;
            }

            /* Sidebar Styles */
            .sidebar {
                background-color: #1e3a8a;
                color: white;
                width: 250px;
                padding: 20px;
                transition: width 0.3s ease-in-out;
            }

            .sidebar.closed {
                width: 0;
                padding: 0;
                overflow: hidden;
            }

            .sidebar-title {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
                text-align: center;
            }

            .sidebar-menu {
                list-style: none;
                padding: 0;
            }

            .sidebar-menu li {
                margin: 15px 0;
            }

            .sidebar-link {
                display: flex;
                align-items: center;
                gap: 10px;
                color: white;
                text-decoration: none;
                padding: 10px;
                border-radius: 5px;
                transition: background 0.3s;
            }

            .sidebar-link:hover {
                background-color: #2563eb;
            }

            /* Logout Button */
            .logout-btn {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 20px;
                padding: 10px;
                background-color: #dc2626;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: background 0.3s;
            }

            .logout-btn:hover {
                background-color: #b91c1c;
            }

            /* Main Content */
            .main-content {
                flex: 1;
                padding: 20px;
                position: relative;
            }

            /* Sidebar Toggle Button */
            .toggle-btn {
                background-color: #2563eb;
                color: white;
                border: none;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
                position: absolute;
                top: 10px;
                left: 10px;
            }

            /* Content Box */
            .content-box {
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
      `}</style>
        </div>
    );
};

export default DoctorDashboard;
