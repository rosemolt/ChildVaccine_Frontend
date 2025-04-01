import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, message } from "antd";

const ConfirmVaccination = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/parent/schedule", {
                headers: { token: `${token}` },
            });

            console.log("API Response:", response.data);

            // Extract `schedules` array and filter out confirmed bookings
            const filteredBookings = Array.isArray(response.data.schedules)
                ? response.data.schedules.filter(booking => booking.parentConfirmation !== "Yes")
                : [];

            setBookings(filteredBookings);
        } catch (error) {
            console.error("API Error:", error);
            message.error("Failed to fetch bookings.");
            setBookings([]); // Ensure state is reset on error
        } finally {
            setLoading(false);
        }
    };

    const showModal = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleConfirmation = async (response) => {
        if (!selectedBooking) return;

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:8080/confirm-vaccination",
                { scheduleid: selectedBooking.scheduleid, response },
                {
                    headers: { token: `${token}` },
                }
            );

            message.success("Response recorded successfully.");
            fetchBookings(); // Refresh table
            setIsModalOpen(false); // Close modal
        } catch (error) {
            console.error("Error confirming vaccination:", error);
            message.error("Failed to submit response.");
        }
    };

    const columns = [
        {
            title: "Child Name",
            dataIndex: "childName",
            key: "childName",
            render: (text) => text || "N/A",
        },
        {
            title: "Supplement Name",
            dataIndex: "supplementName",
            key: "supplementName",
            render: (text) => text || "N/A",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            render: (text) => text || "N/A",
        },
        {
            title: "Confirm",
            key: "confirm",
            render: (_, record) => (
                <Button type="primary" onClick={() => showModal(record)}>
                    Confirm Now
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            <h2>Confirm Vaccination</h2>
            <Table columns={columns} dataSource={bookings || []} loading={loading} rowKey="scheduleid" />

            {/* Confirmation Modal */}
            <Modal
                title="Confirm Vaccination"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="no" danger onClick={() => handleConfirmation("No")}>
                        ❌ No
                    </Button>,
                    <Button key="yes" type="primary" onClick={() => handleConfirmation("Yes")}>
                        ✅ Yes
                    </Button>,
                ]}
            >
                <p>Has your child completed the scheduled vaccination?</p>
            </Modal>
        </div>
    );
};

export default ConfirmVaccination;
