import React, { useState } from "react";
import { FaClipboardList, FaPlusCircle, FaUsers, FaSignOutAlt, FaBars } from "react-icons/fa";
import AddSupplement from "./AddSupplement";
import AdminSupplement from "./AdminSupplement";
import ScheduleForm from "./ScheduleForm";
import BookedParents from "./BookedParents";


const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedOption, setSelectedOption] = useState("welcome");

    const renderContent = () => {
        switch (selectedOption) {
            case "addSupplement":
                return <AddSupplement />;
            case "adminsupplement":
                return <AdminSupplement/>;
            case "schedule":
                return <ScheduleForm />;
            case "bookedParents":
                return <BookedParents />;
            default:
                return <h2>Welcome Back, Admin! <br /> Select an option from the sidebar to proceed.</h2>;
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
                <h2 className="sidebar-title">Admin Dashboard</h2>
                <ul className="sidebar-menu">
                    <li>
                        <button onClick={() => setSelectedOption("addSupplement")} className="sidebar-link">
                            <FaPlusCircle /> Add Supplement
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedOption("adminsupplement")} className="sidebar-link">
                            <FaClipboardList /> View Supplements
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedOption("schedule")} className="sidebar-link">
                            <FaUsers /> Schedule
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setSelectedOption("bookedParents")} className="sidebar-link">
                            <FaClipboardList /> Booked Parents
                        </button>
                    </li>
                </ul>
                <a href="/" className="logout-btn">
                    <FaSignOutAlt /> Logout
                </a>
            </div>

            {/* Main Content Area */}
            <div className="main-content">
                {/* Sidebar Toggle Button */}
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="toggle-btn">
                    <FaBars />
                </button>

                {/* Page Content */}
                <div className="content-box">
                    {renderContent()}
                </div>
            </div>
            
            <style jsx>{`
            .dashboard-container {
                display: flex;
                height: 100vh;
                background-color: #f0f8ff;
            }

            .sidebar {
                background-color: #2d6a4f;
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
                border: none;
                background: none;
                cursor: pointer;
                border-radius: 5px;
                transition: background 0.3s;
                font-size: 16px;
                width: 100%;
                text-align: left;
            }

            .sidebar-link:hover {
                background-color: #40916c;
            }

            .logout-btn {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 20px;
                padding: 10px;
                background-color: #b91c1c;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: background 0.3s;
            }

            .logout-btn:hover {
                background-color: #8b0000;
            }

            .main-content {
                flex: 1;
                padding: 20px;
                position: relative;
            }

            .toggle-btn {
                background-color: #40916c;
                color: white;
                border: none;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
                position: absolute;
                top: 10px;
                left: 10px;
            }

            .content-box {
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                min-height: 200px;
            }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
