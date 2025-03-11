import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const doctorToken = localStorage.getItem("token");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            console.log("Fetching bookings...");
            const response = await axios.get("http://localhost:8080/doctor/bookings", {
                headers: { token: `${doctorToken}` }
            });

            console.log("API Response:", response.data);
            setBookings(response.data.bookings);
            setLoading(false);
        } catch (err) {
            console.error("API Error:", err);
            setError("Error fetching bookings");
            setLoading(false);
        }
    };

    const markAsCompleted = async (bookingid) => {
        const nextDoseDate = prompt("Enter Next Dose Date (YYYY-MM-DD):");
        const supplementProvider = prompt("Enter Supplement Provider:");

        if (!nextDoseDate || !supplementProvider) {
            alert("Next Dose Date and Supplement Provider are required!");
            return;
        }

        try {
            await axios.put(`http://localhost:8080/doctor/update-booking/${bookingid}`, 
                { nextDoseDate, supplementProvider },
                { headers: { token: `${doctorToken}` } }
            );

            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.bookingid === bookingid ? { ...booking, status: "Completed" } : booking
                )
            );

            alert("Booking marked as Completed and Vaccination Record Created.");
        } catch (err) {
            console.error("Error updating booking:", err);
            alert("Failed to mark as Completed.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Doctor - Child Supplement Records</h2>
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Child Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Blood Group</th>
                        <th>Parent Name</th>
                        <th>Parent Phone</th>
                        <th>Supplement Type</th>
                        <th>Supplement Name</th>
                        <th>Booked Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.bookingid}>
                            <td>{booking.childName}</td>
                            <td>{booking.childDOB}</td>
                            <td>{booking.gender}</td>
                            <td>{booking.bloodGroup}</td>
                            <td>{booking.parentName}</td>
                            <td>{booking.parentPhone}</td>
                            <td>{booking.supplementType}</td>
                            <td>{booking.supplementName}</td>
                            <td>{new Date(booking.bookedDate).toLocaleDateString()}</td>
                            <td>{booking.time}</td>
                            <td style={{ color: booking.status === "Completed" ? "green" : "red" }}>
                                {booking.status}
                            </td>
                            <td>
                                {booking.status === "Booked" && (
                                    <button onClick={() => markAsCompleted(booking.bookingid)}
                                        style={{ backgroundColor: "green", color: "white", marginRight: "5px" }}>
                                        Mark Completed
                                    </button>
                                )}
                                {/* <button 
                                    style={{ backgroundColor: "blue", color: "white" }}
                                    disabled={booking.status !== "Completed"}
                                >
                                    Generate Record
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    );
};

export default DoctorBookings;
