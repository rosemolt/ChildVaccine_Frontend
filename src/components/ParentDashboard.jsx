import React, { useState } from "react";
import { FaClipboardList, FaPlusCircle, FaUsers, FaSignOutAlt, FaBars, FaUser, FaUserCircle, FaCalendarCheck } from "react-icons/fa";
import ParentProfile from "./ParentProfile";
import AddChild from "./AddChild";
import ViewChildren from "./ViewChildren";
import Home from "./Home";
import ParentSchedules from "./ParentSchedules";
import ParentBookings from "./ParentBookings";

const ParentDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("welcome");

    const renderContent = () => {
        switch (selectedOption) {
            case "/":
                return <Home />;
            case "profile":
                return <ParentProfile />;
            case "add-child":
                return <AddChild />;
            case "view-child":
                return <ViewChildren />;
            case "booking":
                return <ParentSchedules />;
            case "view-booking":
                return <ParentBookings />;
            default:
                return <Home />;
        }
    };

    const handleLogout = () => {
        console.log("Logging out...");
        window.location.href = "/"; // Redirect to login/home page
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
                {sidebarOpen && (
                    <>
                        <h2 className="sidebar-title">Parent Dashboard</h2>
                        <ul className="sidebar-menu">
                            <li>
                                <button onClick={() => setSelectedOption("/")} className="sidebar-link">
                                    <FaUser /> <span>Home</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setSelectedOption("profile")} className="sidebar-link">
                                    <FaUserCircle /> <span>Profile</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setSelectedOption("add-child")} className="sidebar-link">
                                    <FaPlusCircle /> <span>Add Child</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setSelectedOption("view-child")} className="sidebar-link">
                                    <FaClipboardList /> <span>View Child</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setSelectedOption("booking")} className="sidebar-link">
                                    <FaCalendarCheck /> <span>Booking</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setSelectedOption("view-booking")} className="sidebar-link">
                                    <FaClipboardList /> <span>Your Bookings</span>
                                </button>
                            </li>
                        </ul>
                        <button onClick={handleLogout} className="logout-btn">
                            <FaSignOutAlt /> <span>Logout</span>
                        </button>
                    </>
                )}
            </div>

            {/* Main Content Area */}
            <div className={`main-content ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="toggle-btn">
                    <FaBars />
                </button>
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
                background-color: #6A4C93;
                color: white;
                width: 250px;
                padding: 20px;
                transition: transform 0.3s ease-in-out;
                // overflow: hidden;
                display: flex;
                flex-direction: column;
                transform: translateX(0);
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
                flex-grow: 1;
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
                background-color: #8B5FBF;
            }

            .logout-btn {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background-color: #B91C1C;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: background 0.3s;
                width: 100%;
                border: none;
                cursor: pointer;
                text-align: left;
            }

            .logout-btn:hover {
                background-color: #8B0000;
            }

            .main-content {
                flex: 1;
                padding: 20px;
                position: relative;
                transition: width 0.3s ease-in-out;
            }

            .main-content.full-width {
                width: 100%;
            }

            .toggle-btn {
                background-color: #8B5FBF;
                color: white;
                border: none;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
                position: absolute;
                top: 10px;
                left: 10px;
                z-index: 10;
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

export default ParentDashboard;
