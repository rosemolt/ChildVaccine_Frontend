import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, message, Modal, Card, Tabs } from "antd";

const { TabPane } = Tabs;

const AssignCaregiver = () => {
    const [requests, setRequests] = useState([]);
    const [caregivers, setCaregivers] = useState([]);
    const [parentCaregiverDetails, setParentCaregiverDetails] = useState([]);
    const [selectedCaregiver, setSelectedCaregiver] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchRequests();
        fetchCaregivers();
        fetchParentCaregiverDetails();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get("http://localhost:8080/view-requests", {
                headers: { token },
            });
            setRequests(response.data);
        } catch (error) {
            message.error("Failed to load requests.");
        }
    };

    const fetchCaregivers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/available-caregivers", {
                headers: { token },
            });
            setCaregivers(response.data);
        } catch (error) {
            message.error("Failed to load caregivers.");
        }
    };

    const fetchParentCaregiverDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8080/parents-with-caregiver", {
                headers: { token },
            });
            setParentCaregiverDetails(response.data.data);
        } catch (error) {
            message.error("Failed to load parent-caregiver details.");
        }
    };

    const handleAssignCaregiver = async () => {
        if (!selectedCaregiver) {
            message.warning("Please select a caregiver.");
            return;
        }

        try {
            await axios.post("http://localhost:8080/assign-caregiver", {
                requestId: selectedRequest,
                infantCaregiverId: selectedCaregiver,
            }, {
                headers: { token },
            });

            message.success("Caregiver assigned successfully!");
            setModalVisible(false);
            fetchRequests();
            fetchCaregivers();
            fetchParentCaregiverDetails();
        } catch (error) {
            message.error(error.response?.data?.error || "Failed to assign caregiver.");
        }
    };

    const requestColumns = [
        { title: "Parent Name", dataIndex: "parentName", key: "parentName" },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: "Requirement", dataIndex: "requirements", key: "requirements" },
        { title: "Child Name", dataIndex: "childName", key: "childName" },
        { title: "Child Age", dataIndex: "childAge", key: "childAge" },
        { title: "Status", dataIndex: "status", key: "status" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button type="primary" onClick={() => {
                    setSelectedRequest(record.requestId);
                    setModalVisible(true);
                }}>
                    Assign Caregiver
                </Button>
            ),
        },
    ];

    const parentCaregiverColumns = [
        { title: "Parent Name", dataIndex: ["parentDetails", "name"], key: "name" },
        { title: "Address", dataIndex: ["parentDetails", "address"], key: "address" },
        { title: "Phone", dataIndex: ["parentDetails", "phoneno"], key: "phoneno" },
        { title: "Email", dataIndex: ["parentDetails", "email"], key: "email" },
        { title: "Assigned Caregiver", dataIndex: ["assignedCaregiver", "fullName"], key: "caregiverName", render: name => name || "Not Assigned" },
    ];

    return (
        <div>
            <h2>Caregiver Management</h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Assign Caregiver" key="1">
                    <Table dataSource={requests} columns={requestColumns} rowKey="requestId" />
                </TabPane>
                <TabPane tab="Parents & Assigned Caregivers" key="2">
                    <Table dataSource={parentCaregiverDetails} columns={parentCaregiverColumns} rowKey="parentid" />
                </TabPane>
            </Tabs>

            <Modal
                title="Assign Caregiver"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleAssignCaregiver}
                width={700}
            >
                <h3>Select a Caregiver</h3>
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {caregivers.map(caregiver => (
                        <Card
                            key={caregiver.infantCaregiverId}
                            style={{
                                marginBottom: 10,
                                cursor: "pointer",
                                border: selectedCaregiver === caregiver.infantCaregiverId ? "2px solid #1890ff" : "1px solid #ddd",
                            }}
                            onClick={() => setSelectedCaregiver(caregiver.infantCaregiverId)}
                        >
                            <p><strong>Name:</strong> {caregiver.fullName}</p>
                            <p><strong>Age:</strong> {caregiver.age}</p>
                            <p><strong>Contact:</strong> {caregiver.contactNumber}</p>
                            <p><strong>Address:</strong> {caregiver.address}</p>
                            <p><strong>Languages known:</strong> {caregiver.languages}</p>
                            <p><strong>Preffered locations:</strong> {caregiver.prefferedLocations}</p>
                            <p><strong>Email:</strong> {caregiver.email}</p>
                            <p><strong>Experience:</strong> {caregiver.experience}</p>
                        </Card>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default AssignCaregiver;
