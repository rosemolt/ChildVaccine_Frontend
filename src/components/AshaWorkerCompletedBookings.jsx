import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Input, message, Spin, Tag } from "antd";

const AshaWorkerCompletedBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [nextDoseDate, setNextDoseDate] = useState("");
    const [supplementProvider, setSupplementProvider] = useState("");
    const ashaWorkerToken = localStorage.getItem("token");

    useEffect(() => {
        fetchCompletedBookings();
    }, []);

    const fetchCompletedBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8080/asha/completed-bookings", {
                headers: { token: `${ashaWorkerToken}` }
            });
    
            // Filter out bookings with recordStatus "Generated"
            const filteredBookings = response.data.bookings.filter(booking => booking.recordStatus !== "Generated");
            setBookings(filteredBookings);
        } catch (error) {
            message.error("Error fetching completed bookings");
        } finally {
            setLoading(false);
        }
    };
    

    const handleUpdateBooking = async () => {
        if (!nextDoseDate || !supplementProvider) {
            message.error("Next Dose Date and Supplement Provider are required!");
            return;
        }
    
        try {
            const response = await axios.put(
                `http://localhost:8080/asha/update-booking/${selectedBooking.bookingid}`,
                { nextDoseDate, supplementProvider },
                { headers: { token: `${ashaWorkerToken}` } }
            );
    
            if (response.data.status === "Success") {
                message.success("Vaccination record updated. Email sent with updated PDF.");
                
                // Remove the updated booking from the state
                setBookings((prevBookings) => 
                    prevBookings.filter((booking) => booking.bookingid !== selectedBooking.bookingid)
                );
    
                setIsModalOpen(false);
                setNextDoseDate("");
                setSupplementProvider("");
            } else {
                message.error("Failed to update booking.");
            }
        } catch (error) {
            message.error("Failed to mark as Completed.");
        }
    };    

    const showModal = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const columns = [
        { title: "Child Name", dataIndex: "childName", key: "childName" },
        { title: "DOB", dataIndex: "childDOB", key: "childDOB", render: (dob) => new Date(dob).toLocaleDateString() },
        { title: "Gender", dataIndex: "gender", key: "gender" },
        { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
        { title: "Parent Name", dataIndex: "parentName", key: "parentName" },
        { title: "Parent Phone", dataIndex: "parentPhone", key: "parentPhone" },
        { title: "Supplement Type", dataIndex: "supplementType", key: "supplementType" },
        { title: "Supplement Name", dataIndex: "supplementName", key: "supplementName" },
        { title: "Booked Date", dataIndex: "bookedDate", key: "bookedDate", render: (date) => new Date(date).toLocaleDateString() },
        { 
            title: "Status", 
            dataIndex: "status", 
            key: "status", 
            render: (status) => <Tag color="green">{status}</Tag> 
        },
        { title: "Time", dataIndex: "time", key: "time" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button type="primary" onClick={() => showModal(record)}>
                    Update Record
                </Button>
            ),
        },
    ];

    return (
        <div>
            <h2>Completed Bookings</h2>
            {loading ? <Spin size="large" /> : <Table dataSource={bookings} columns={columns} rowKey="bookingid" />}
            <Modal title="Update Vaccination Record" open={isModalOpen} onOk={handleUpdateBooking} onCancel={() => setIsModalOpen(false)}>
                <p>Updating record for {selectedBooking?.childName}</p>
                <Input placeholder="Next Dose Date" type="date" value={nextDoseDate} onChange={(e) => setNextDoseDate(e.target.value)} />
                <Input placeholder="Supplement Provider" value={supplementProvider} onChange={(e) => setSupplementProvider(e.target.value)} style={{ marginTop: 10 }} />
            </Modal>
        </div>
    );
};

export default AshaWorkerCompletedBookings;
