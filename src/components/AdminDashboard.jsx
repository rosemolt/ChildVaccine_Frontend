import React, { useState, useEffect } from "react";
import { FaClipboardList, FaPlusCircle, FaUsers, FaSignOutAlt, FaBars, FaUserCircle } from "react-icons/fa";
import AddSupplement from "./AddSupplement";
import AdminSupplement from "./AdminSupplement";
import ScheduleForm from "./ScheduleForm";
import BookedParents from "./BookedParents";
import PendingSupplements from "./PendingSupplements";
import AdminUpcomingSchedules from "./AdminUpcomingSchedules";
import ApproveAshaWorkers from "./ApproveAshaWorkers";
import AdminMessages from "./Admin Messages";

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedOption, setSelectedOption] = useState("welcome");
    const [scheduleData, setScheduleData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const renderContent = () => {
        switch (selectedOption) {
            case "addSupplement":
                return <AddSupplement />;
            case "adminsupplement":
                return <AdminSupplement />;
            case "approveasha":
                return <ApproveAshaWorkers />;
            case "pendingchild":
                return <PendingSupplements setSelectedOption={setSelectedOption} setScheduleData={setScheduleData} />;
            case "schedule":
                return <ScheduleForm scheduleData={scheduleData} />;
            case "upcomingschedules":
                return <AdminUpcomingSchedules />;
            case "messages":
                return <AdminMessages />;
            case "bookedParents":
                return <BookedParents />;
            default:
                return (
                    <div className="welcome-section">
                        <h1>Welcome Back, Admin!</h1>
                        <p>Today is {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}</p>
                        <p>Manage schedules, approve Asha workers, and keep track of vaccinations efficiently.</p>
                    </div>
                );
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
                <div className="admin-profile">
                    <FaUserCircle className="profile-icon" />
                    <h3>Admin</h3>
                </div>
                <ul className="sidebar-menu">
                    <li><button onClick={() => setSelectedOption("addSupplement")}><FaPlusCircle /> Add Supplement</button></li>
                    <li><button onClick={() => setSelectedOption("adminsupplement")}><FaClipboardList /> View Supplements</button></li>
                    <li><button onClick={() => setSelectedOption("approveasha")}><FaClipboardList /> Approve Asha Workers</button></li>
                    <li><button onClick={() => setSelectedOption("pendingchild")}><FaClipboardList /> Pending Child</button></li>
                    <li><button onClick={() => setSelectedOption("schedule")}><FaUsers /> Schedule</button></li>
                    <li><button onClick={() => setSelectedOption("upcomingschedules")}><FaClipboardList /> Upcoming Schedules</button></li>
                    <li><button onClick={() => setSelectedOption("messages")}><FaClipboardList /> Messages</button></li>
                    <li><button onClick={() => setSelectedOption("bookedParents")}><FaClipboardList /> Booked Parents</button></li>
                </ul>
                <a href="/" className="logout-btn"><FaSignOutAlt /> Logout</a>
            </div>

            {/* Main Content */}
            <div className="main-content">
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
                background-color: #eef7f5;
            }

            .sidebar {
                background: linear-gradient(135deg, #1b4332, #2d6a4f);
                color: white;
                width: 260px;
                transition: width 0.3s;
                padding: 20px;
            }

            .sidebar.closed {
                width: 70px;
                overflow: hidden;
            }

            .admin-profile {
                text-align: center;
                margin-bottom: 20px;
            }

            .profile-icon {
                font-size: 50px;
            }

            .sidebar-menu button {
                display: flex;
                align-items: center;
                gap: 12px;
                color: white;
                width: 100%;
                text-align: left;
                background: none;
                border: none;
                padding: 12px;
                cursor: pointer;
                border-radius: 5px;
                transition: background 0.3s;
                font-size: 16px;
            }

            .sidebar-menu button:hover {
                background-color: rgba(255, 255, 255, 0.2);
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
                text-align: center;
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
            }

            .welcome-section {
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                color: #2d6a4f;
                padding: 20px;
            }
            `}</style>
        </div>
    );
};

export default AdminDashboard;