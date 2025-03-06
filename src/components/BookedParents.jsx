import React, { useState, useEffect } from "react";
import axios from "axios";

const BookedParents = () => {
    const [bookedParents, setBookedParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookedParents = async () => {
            try {
                // Get the admin token from localStorage
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Unauthorized: No token provided");
                    setLoading(false);
                    return;
                }

                // API call with Authorization header
                const response = await axios.get("http://localhost:8080/admin/booked-parents", {
                    headers: {
                        Authorization: `${token}`,
                    },
                });

                setBookedParents(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchBookedParents();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Booked Parent Details</h2>

            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && bookedParents.length === 0 && (
                <p className="text-gray-500">No booked schedules found.</p>
            )}

            {!loading && !error && bookedParents.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">Booking ID</th>
                                <th className="border px-4 py-2">Booked Date</th>
                                <th className="border px-4 py-2">Parent Name</th>
                                <th className="border px-4 py-2">Phone</th>
                                <th className="border px-4 py-2">Child Name</th>
                                <th className="border px-4 py-2">DOB</th>
                                <th className="border px-4 py-2">Gender</th>
                                <th className="border px-4 py-2">Schedule Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookedParents.map((item, index) => (
                                <tr key={index} className="border">
                                    <td className="border px-4 py-2">{item.bookingid}</td>
                                    <td className="border px-4 py-2">{item.bookedDate}</td>
                                    <td className="border px-4 py-2">{item.parent?.name || "N/A"}</td>
                                    <td className="border px-4 py-2">{item.parent?.phoneno || "N/A"}</td>
                                    <td className="border px-4 py-2">{item.child?.name || "N/A"}</td>
                                    <td className="border px-4 py-2">{item.child?.dob || "N/A"}</td>
                                    <td className="border px-4 py-2">{item.child?.gender || "N/A"}</td>
                                    <td className="border px-4 py-2">{item.schedule?.date || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookedParents;
