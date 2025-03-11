import React, { useEffect, useState } from "react";
import axios from "axios";

const ParentSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [bookedSchedules, setBookedSchedules] = useState(new Set());
    const [loading, setLoading] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchSchedules();
        fetchBookedSchedules();
    }, []);

    // Fetch all available schedules
    const fetchSchedules = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/parent/schedule", {
                headers: { token }
            });

            const currentDate = new Date().toISOString().split("T")[0];

            const upcomingSchedules = response.data.schedules.filter(schedule => schedule.date >= currentDate);
            setSchedules(upcomingSchedules);
        } catch (error) {
            console.error("Error fetching schedules:", error);
            setMessage("Failed to fetch schedules.");
        }
    };

    // Fetch schedules that the parent has already booked
    const fetchBookedSchedules = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/parent/booked-schedules", {
                headers: { token }
            });

            const bookedSet = new Set(response.data.bookedSchedules.map(schedule => schedule.scheduleid));
            setBookedSchedules(bookedSet);
        } catch (error) {
            console.error("Error fetching booked schedules:", error);
        }
    };

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
            setBookedSchedules((prev) => new Set([...prev, scheduleid])); // Update booked schedules
        } catch (error) {
            setMessage(error.response?.data?.status || "Booking failed.");
        }
        setLoading(null);
    };

    // Group schedules by scheduleid
    const groupedSchedules = schedules.reduce((acc, schedule) => {
        if (!acc[schedule.scheduleid]) {
            acc[schedule.scheduleid] = [];
        }
        acc[schedule.scheduleid].push(schedule);
        return acc;
    }, {});

    return (
        <div className="container">
            <h2>Available Schedules</h2>
            {message && <p className="message">{message}</p>}
            {Object.keys(groupedSchedules).length === 0 ? (
                <p>No upcoming schedules available.</p>
            ) : (
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Child Name(s)</th>
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
                        {Object.values(groupedSchedules).map((scheduleGroup) => {
                            const firstSchedule = scheduleGroup[0]; // First entry in the group
                            return (
                                <tr key={firstSchedule.scheduleid}>
                                    <td>{scheduleGroup.map(s => s.childName).join(", ")}</td>
                                    <td>{firstSchedule.supplementType}</td>
                                    <td>{firstSchedule.supplementName}</td>
                                    <td>{firstSchedule.description}</td>
                                    <td>{firstSchedule.date}</td>
                                    <td>{firstSchedule.time}</td>
                                    <td>{firstSchedule.location}</td>
                                    <td>
                                    {bookedSchedules.has(firstSchedule.scheduleid) ? (
                                        <button className="booked-btn" disabled>Booked</button>
                                    ) : (
                                        <button 
                                            onClick={() => handleBook(firstSchedule.scheduleid)} 
                                            disabled={loading === firstSchedule.scheduleid || new Date(`${firstSchedule.date}T${firstSchedule.time}`) < new Date()}
                                            className="book-btn"
                                        >
                                            {loading === firstSchedule.scheduleid ? "Booking..." : "Book"}
                                        </button>
                                    )}
                                </td>

                                </tr>
                            );
                        })}
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

export default ParentSchedules;
