import React, { useEffect, useState } from "react";
import axios from "axios";

const ParentSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(null);
    const [message, setMessage] = useState(null);
    const [bookedSchedules, setBookedSchedules] = useState(new Set());

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/parent/schedule", {
                    headers: { token }
                });

                // Get current date in YYYY-MM-DD format
                const currentDate = new Date().toISOString().split("T")[0];

                // Filter out schedules where the date has already passed
                const upcomingSchedules = response.data.schedules.filter(schedule => schedule.date >= currentDate);

                setSchedules(upcomingSchedules);
            } catch (error) {
                console.error("Error fetching schedules:", error);
                setMessage("Failed to fetch schedules.");
            }
        };

        fetchSchedules();
    }, []);

    const handleBook = async (scheduleid) => {
        setLoading(scheduleid);
        setMessage(null);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:8080/book-schedule",
                { scheduleid },
                { headers: { token } }
            );
            setMessage(response.data.status);
            setBookedSchedules((prev) => new Set([...prev, scheduleid]));
        } catch (error) {
            setMessage(error.response?.data?.status || "Booking failed.");
        }
        setLoading(null);
    };

    return (
        <div className="container">
            <h2>Available Schedules</h2>
            {message && <p className="message">{message}</p>}
            {schedules.length === 0 ? (
                <p>No upcoming schedules available.</p>
            ) : (
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Child Name</th>
                            <th>Supplement Type</th>
                            <th>Supplement Name</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) => (
                            <tr key={schedule.scheduleid}>
                                <td>{schedule.childName}</td>
                                <td>{schedule.supplementType}</td>
                                <td>{schedule.supplementName}</td>
                                <td>{schedule.description}</td>
                                <td>{schedule.date}</td>
                                <td>{schedule.time}</td>
                                <td>{schedule.location}</td>
                                <td>
                                    {bookedSchedules.has(schedule.scheduleid) ? (
                                        <button className="booked-btn" disabled>Booked</button>
                                    ) : (
                                        <button 
                                            onClick={() => handleBook(schedule.scheduleid)} 
                                            disabled={loading === schedule.scheduleid}
                                            className="book-btn"
                                        >
                                            {loading === schedule.scheduleid ? "Booking..." : "Book"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <style jsx>{`
                .container {
                    width: 100%;
                    margin: auto;
                    text-align: center;
                }

                .schedule-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                .schedule-table th, .schedule-table td {
                    border: 1px solid #ddd;
                    padding: 10px;
                }

                .schedule-table th {
                    background-color: #f4f4f4;
                }

                .book-btn {
                    padding: 8px 12px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 4px;
                }

                .booked-btn {
                    padding: 8px 12px;
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    cursor: not-allowed;
                    border-radius: 4px;
                }

                .book-btn:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .message {
                    color: red;
                    font-weight: bold;
                    margin: 10px 0;
                }
            `}</style>
        </div>
    );
};

export default ParentSchedule;
