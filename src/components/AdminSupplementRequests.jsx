import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Select, Input, message, Spin, Tabs } from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const AdminSupplementRequests = () => {
    const [requests, setRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [status, setStatus] = useState("");
    const [adminMessage, setAdminMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get("http://localhost:8080/admin/supplement-requests", {
                    headers: { Authorization: token }
                });
                const filteredRequests = response.data.requests.filter(
                    (request) => request.status !== "Approved" && request.status !== "Change Requested"
                );
                setRequests(filteredRequests);
            } catch (error) {
                console.error("Error fetching requests:", error);
                message.error("Failed to fetch supplement requests.");
            }
        };

        const fetchApprovedRequests = async () => {
            try {
                const response = await axios.get("http://localhost:8080/approved-supplement-requests", {
                    headers: { Authorization: token }
                });
                setApprovedRequests(response.data.requests);
            } catch (error) {
                console.error("Error fetching approved requests:", error);
                message.error("Failed to fetch approved supplement requests.");
            }
        };

        fetchRequests();
        fetchApprovedRequests();
    }, [token]);

    const openModal = (record) => {
        setSelectedRequest(record);
        setStatus(record.status);
        setAdminMessage("");
        setModalVisible(true);
    };

    const handleUpdateStatus = async () => {
        if (!selectedRequest || !status) {
            message.warning("Please select a status.");
            return;
        }

        try {
            setLoading(true);
            await axios.put(
                `http://localhost:8080/admin/supplement-requests/${selectedRequest.requestid}`,
                { status, adminMessage },
                { headers: { Authorization: token } }
            );

            setRequests((prev) =>
                prev
                    .map((req) =>
                        req.requestid === selectedRequest.requestid ? { ...req, status, adminMessage } : req
                    )
                    .filter((req) => req.status !== "Approved" && req.status !== "Change Requested")
            );

            message.success(`Request updated to ${status}`);
            setModalVisible(false);
            setSelectedRequest(null);
            setStatus("");
            setAdminMessage("");
        } catch (error) {
            console.error("Error updating request:", error);
            message.error("Failed to update request.");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: "Request ID", dataIndex: "requestid", key: "requestid" },
        { title: "Date", dataIndex: "date", key: "date", render: (date) => new Date(date).toLocaleDateString() },
        { title: "Place", dataIndex: "place", key: "place" },
        { title: "Ward", dataIndex: "ward", key: "ward" },
        { title: "Status", dataIndex: "status", key: "status" },
        {
            title: "Supplements",
            dataIndex: "supplements",
            key: "supplements",
            render: (supplements) =>
                supplements?.map((sup, index) => (
                    <div key={index}>
                        <strong>{sup.name}</strong>: {sup.quantity}
                    </div>
                )) || "No supplements",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button type="primary" onClick={() => openModal(record)}>
                    Update
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Supplement Requests</h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Pending Requests" key="1">
                    <Table dataSource={requests} columns={columns} rowKey="requestid" bordered />
                </TabPane>
                <TabPane tab="Approved Requests" key="2">
                    <Table dataSource={approvedRequests} columns={columns} rowKey="requestid" bordered />
                </TabPane>
            </Tabs>

            <Modal
                title="Update Supplement Request"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleUpdateStatus}>
                        Submit
                    </Button>,
                ]}
            >
                {selectedRequest && (
                    <>
                        <p>
                            <strong>Request ID:</strong> {selectedRequest.requestid}
                        </p>
                        <p>
                            <strong>Asha Worker ID:</strong> {selectedRequest.ashaid}
                        </p>

                        <label>
                            <strong>Supplements:</strong>
                        </label>
                        <ul>
                            {selectedRequest.supplements?.map((sup, index) => (
                                <li key={index}>
                                    <strong>{sup.name}</strong>: {sup.quantity}
                                </li>
                            )) || <li>No supplements</li>}
                        </ul>

                        <label>Status:</label>
                        <Select
                            value={status}
                            onChange={(value) => setStatus(value)}
                            style={{ width: "100%", marginBottom: "10px" }}
                        >
                            <Option value="Approved">Approved</Option>
                            <Option value="Rejected">Rejected</Option>
                            <Option value="Change Requested">Change Requested</Option>
                        </Select>

                        <label>Admin Message (Optional):</label>
                        <TextArea value={adminMessage} onChange={(e) => setAdminMessage(e.target.value)} rows={3} />
                    </>
                )}
            </Modal>
        </div>
    );
};

export default AdminSupplementRequests;