import React, { useState, useEffect } from "react";
import axios from "axios";

const BookedParents = () => {
    const [bookedParents, setBookedParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookedParents = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Unauthorized: No token provided");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:8080/admin/booked-parents", {
                    headers: { Authorization: `${token}` },
                });

                setBookedParents(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || "No Bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchBookedParents();
    }, []);

    return (
        <div className="container">
            <h2>Booked Parent Details</h2>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && bookedParents.length === 0 && (
                <p className="no-data">No booked schedules found.</p>
            )}

            {!loading && !error && bookedParents.length > 0 && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Booked Date</th>
                                <th>Parent Name</th>
                                <th>Phone</th>
                                <th>Child Name</th>
                                <th>DOB</th>
                                <th>Gender</th>
                                <th>Schedule Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookedParents.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.bookingid}</td>
                                    <td>{item.bookedDate}</td>
                                    <td>{item.parent?.name || "N/A"}</td>
                                    <td>{item.parent?.phoneno || "N/A"}</td>
                                    <td>{item.child?.name || "N/A"}</td>
                                    <td>{item.child?.dob || "N/A"}</td>
                                    <td>{item.child?.gender || "N/A"}</td>
                                    <td>{item.schedule?.date || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
                .container {
                    min-height: 100vh;
                    background: #f9f9f9;
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    width: 100%;
                    max-width: 1000px;
                    margin: auto;
                }

                h2 {
                    font-size: 2rem;
                    color: #333;
                    margin-bottom: 20px;
                    font-weight: 600;
                }

                .loading, .error, .no-data {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-top: 20px;
                }

                .error {
                    color: #d32f2f;
                    background: #ffebee;
                    padding: 10px;
                    border-radius: 5px;
                    display: inline-block;
                }

                .no-data {
                    color: #555;
                }

                .table-container {
                    overflow-x: auto;
                    margin-top: 20px;
                    background: #fff;
                    padding: 10px;
                    border-radius: 10px;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: left;
                }

                th, td {
                    padding: 12px;
                    border-bottom: 1px solid #ddd;
                }

                th {
                    background-color: #007bff;
                    color: white;
                    font-size: 1rem;
                    text-transform: uppercase;
                }

                tr:hover {
                    background: #f1f1f1;
                    transition: 0.3s ease-in-out;
                }

                td {
                    font-size: 1rem;
                    color: #333;
                }
            `}</style>
        </div>
    );
};

export default BookedParents;