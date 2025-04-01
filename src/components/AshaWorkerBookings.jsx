import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Input, message } from "antd";

const AshaWorkerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [nextDoseDate, setNextDoseDate] = useState("");
    const [supplementProvider, setSupplementProvider] = useState("");
    const ashaWorkerToken = localStorage.getItem("token");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8080/asha/bookings", {
                headers: { token: `${ashaWorkerToken}` }
            });
            setBookings(response.data.bookings);
            setLoading(false);
        } catch (err) {
            setError("Error fetching bookings");
            setLoading(false);
        }
    };

    const handleMarkAsCompleted = async () => {
        if (!nextDoseDate || !supplementProvider) {
            message.error("Next Dose Date and Supplement Provider are required!");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/asha/update-booking/${selectedBookingId}`, 
                { nextDoseDate, supplementProvider },
                { headers: { token: `${ashaWorkerToken}` } }
            );

            if (response.data.status === "Success") {
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking.bookingid === selectedBookingId ? { ...booking, status: "Completed" } : booking
                    )
                );
                message.success("Booking marked as Completed. Email sent with updated PDF.");
                setIsModalOpen(false);
            } else {
                message.error("Failed to update booking. " + response.data.message);
            }
        } catch (err) {
            message.error("Failed to mark as Completed.");
        }
    };

    const showModal = (bookingid) => {
        setSelectedBookingId(bookingid);
        setIsModalOpen(true);
    };

    const columns = [
        { title: "Child Name", dataIndex: "childName", key: "childName" },
        { title: "DOB", dataIndex: "childDOB", key: "childDOB" },
        { title: "Gender", dataIndex: "gender", key: "gender" },
        { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
        { title: "Parent Name", dataIndex: "parentName", key: "parentName" },
        { title: "Parent Phone", dataIndex: "parentPhone", key: "parentPhone" },
        { title: "Supplement Type", dataIndex: "supplementType", key: "supplementType" },
        { title: "Supplement Name", dataIndex: "supplementName", key: "supplementName" },
        { title: "Booked Date", dataIndex: "bookedDate", key: "bookedDate", render: (text) => new Date(text).toLocaleDateString() },
        { title: "Time", dataIndex: "time", key: "time" },
        { 
            title: "Status", 
            dataIndex: "status", 
            key: "status", 
            render: (status) => (<span style={{ color: status === "Completed" ? "green" : "red" }}>{status}</span>)
        },
        // {
        //     title: "Actions",
        //     key: "actions",
        //     render: (_, record) => (
        //         record.status === "Booked" && (
        //             <Button type="primary" onClick={() => showModal(record.bookingid)}>Mark Completed</Button>
        //         )
        //     )
        // }
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h2>Asha Worker - Child Supplement Records</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Table columns={columns} dataSource={bookings} loading={loading} rowKey="bookingid" bordered />
            
            {/* <Modal
                title="Mark as Completed"
                visible={isModalOpen}
                onOk={handleMarkAsCompleted}
                onCancel={() => setIsModalOpen(false)}
            >
                <p>Enter Next Dose Date (YYYY-MM-DD):</p>
                <Input value={nextDoseDate} onChange={(e) => setNextDoseDate(e.target.value)} placeholder="YYYY-MM-DD" />
                <p style={{ marginTop: "10px" }}>Enter Supplement Provider:</p>
                <Input value={supplementProvider} onChange={(e) => setSupplementProvider(e.target.value)} placeholder="Enter Provider" />
            </Modal> */}
        </div>
    );
};

export default AshaWorkerBookings;
