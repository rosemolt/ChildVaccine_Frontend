import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUpcomingSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get("http://localhost:8080/admin/upcoming-schedules", {
                    headers: { Authorization: `${localStorage.getItem("token")}` },
                });

                const currentDateTime = new Date(); 

                const upcomingSchedules = response.data.schedules.filter(schedule => {
                    if (!schedule.date || !schedule.time) return false; 

                    const [hours, minutes] = schedule.time.split(":").map(Number);
                    const scheduleDateTime = new Date(schedule.date);
                    scheduleDateTime.setHours(hours, minutes, 0, 0); 

                    return scheduleDateTime >= currentDateTime; 
                });

                setSchedules(upcomingSchedules);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch schedules");
                setLoading(false);
            }
        };
        fetchSchedules();
    }, []);

    return (
        <div className="page-container">
            <h2 className="title">Upcoming Schedules</h2>

            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : schedules.length === 0 ? (
                <p className="no-schedules">No upcoming schedules.</p>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Location</th>
                                <th>Notes</th>
                                <th>Published On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((schedule, index) => (
                                <tr key={schedule.scheduleid} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                                    <td>{schedule.scheduleid}</td>
                                    <td>{schedule.supplementType}</td>
                                    <td>{schedule.supplementName}</td>
                                    <td>{schedule.description || "-"}</td>
                                    <td>{new Date(schedule.date).toLocaleDateString()}</td>
                                    <td>{schedule.time}</td>
                                    <td>{schedule.location}</td>
                                    <td>{schedule.additionalNotes || "-"}</td>
                                    <td>{new Date(schedule.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
                .page-container {
                    background: linear-gradient(135deg, #f8fafc, #eef2f3);
                    min-height: 100vh;
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .title {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .spinner-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 50px;
                }

                .spinner {
                    height: 40px;
                    width: 40px;
                    border: 4px solid #3498db;
                    border-top-color: transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                .error-message {
                    color: #e74c3c;
                    text-align: center;
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                .no-schedules {
                    color: #7f8c8d;
                    text-align: center;
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                .table-container {
                    width: 100%;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    overflow-x: auto;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    color: white;
                    font-weight: bold;
                    padding: 10px;
                    text-align: center;
                    border: 1px solid #ddd;
                }

                td {
                    padding: 12px;
                    text-align: center;
                    border: 1px solid #ddd;
                    color: #333;
                }

                .even-row {
                    background: #f9f9f9;
                }

                .odd-row {
                    background: #ffffff;
                }

                tr:hover {
                    background: #d6eaf8;
                    transition: 0.3s;
                }
            `}</style>
        </div>
    );
};

export default AdminUpcomingSchedules;
