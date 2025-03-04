import React, { useEffect, useState } from "react";
import axios from "axios";

const ParentBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8080/view-bookings", {
                headers: { token: `${localStorage.getItem("token")}` }
            });
            setBookings(response.data.bookings);
        } catch (err) {
            setError(err.response?.data?.status || "Error fetching bookings");
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (bookingid) => {
        try {
            await axios.put(`http://localhost:8080/cancel-booking/${bookingid}`, {}, {
                headers: { token: `${localStorage.getItem("token")}` }
            });
            alert("Booking canceled successfully");
            fetchBookings(); // Refresh booking list
        } catch (err) {
            alert(err.response?.data?.status || "Error canceling booking");
        }
    };

    if (loading) return <p className="loading">Loading bookings...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="bookings-container">
            <h2 className="title">My Bookings</h2>
            {bookings.length === 0 ? (
                <p className="no-bookings">No bookings found</p>
            ) : (
                <table className="bookings-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Child Name</th>
                            <th>Supplement Type</th>
                            <th>Supplement Name</th>
                            <th>Schedule Date</th>
                            <th>Booked Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.bookingid}>
                                <td>{booking.bookingid}</td>
                                <td>{booking.childName}</td>
                                <td>{booking.supplementType}</td>
                                <td>{booking.supplementName}</td>
                                <td>{booking.scheduleDate}</td>
                                <td>{new Date(booking.bookedDate).toLocaleDateString()}</td>
                                <td>{booking.time}</td>
                                <td className={booking.status === "Cancelled" ? "cancelled-status" : "booked-status"}>
                                    {booking.status}
                                </td>
                                <td>
                                    {booking.status === "Booked" ? (
                                        <button 
                                            onClick={() => cancelBooking(booking.bookingid)} 
                                            className="cancel-btn"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <span className="cancelled-text">Cancelled</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <style jsx>{`
                .bookings-container {
    max-width: 90%;
    margin: auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

.bookings-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.bookings-table th, .bookings-table td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.bookings-table th {
    background-color: #007bff;
    color: white;
    font-weight: bold;
}

.bookings-table tr:nth-child(even) {
    background-color: #f2f2f2;
}

.booked-status {
    color: green;
    font-weight: bold;
}

.cancelled-status {
    color: red;
    font-weight: bold;
}

.cancel-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.cancel-btn:hover {
    background-color: #c82333;
}

.cancelled-text {
    color: gray;
    font-weight: bold;
}

.loading, .error-message, .no-bookings {
    text-align: center;
    font-size: 18px;
    color: #333;
    font-weight: bold;
}

            `}</style>
        </div>
    );
};

export default ParentBookings;
