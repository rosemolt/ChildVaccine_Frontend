import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Spin, Alert } from "antd";

const { Title, Text } = Typography;

const AssignedCaregiver = () => {
    const [caregiver, setCaregiver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCaregiver = async () => {
            try {
                const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
                const response = await axios.get("http://localhost:8080/assigned-caregiver", {
                    headers: { token: `${token}` },
                });

                setCaregiver(response.data.caregiver);
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching caregiver details");
            } finally {
                setLoading(false);
            }
        };

        fetchCaregiver();
    }, []);

    if (loading) return <Spin tip="Loading caregiver details..." style={{ display: "block", textAlign: "center", marginTop: "20px" }} />;
    if (error) return <Alert message={error} type="error" showIcon style={{ margin: "20px" }} />;

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
            <Title level={3} style={{ textAlign: "center" }}>Assigned Caregiver Details</Title>
            <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
                <Text strong>Name:</Text> <Text>{caregiver.fullName}</Text><br />
                <Text strong>Age:</Text> <Text>{caregiver.age} years</Text><br />
                <Text strong>Gender:</Text> <Text>{caregiver.gender}</Text><br />
                <Text strong>Contact:</Text> <Text>{caregiver.contactNumber || "Not provided"}</Text><br />
                <Text strong>Email:</Text> <Text>{caregiver.email}</Text><br />
                <Text strong>Address:</Text> <Text>{caregiver.address}</Text><br />
                <Text strong>Experience:</Text> <Text>{caregiver.experience} years</Text><br />
                <Text strong>Languages:</Text> <Text>{caregiver.languages}</Text><br />
                <Text strong>Ward:</Text> <Text>{caregiver.ward}</Text><br />
            </Card>
        </div>
    );
};

export default AssignedCaregiver;
