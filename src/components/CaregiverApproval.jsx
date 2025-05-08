import { useEffect, useState } from "react";
import { Table, Button, Typography, message, Spin, Tabs } from "antd";
import axios from "axios";

const { Title } = Typography;
const { TabPane } = Tabs;

const CaregiverApproval = () => {
    const [pendingCaregivers, setPendingCaregivers] = useState([]);
    const [approvedCaregivers, setApprovedCaregivers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCaregivers();
        fetchApprovedCaregivers();
    }, []);

    const fetchCaregivers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/caregivers", {
                headers: { token: `${localStorage.getItem("token")}` },
            });
            const filteredCaregivers = response.data.caregivers.filter(cg => cg.status !== "Approved");
            setPendingCaregivers(filteredCaregivers);
        } catch (error) {
            message.error("Failed to fetch caregivers");
        } finally {
            setLoading(false);
        }
    };

    const fetchApprovedCaregivers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/approved-caregivers", {
                headers: { token: `${localStorage.getItem("token")}` },
            });
            setApprovedCaregivers(response.data.caregivers);
        } catch (error) {
            message.error("Failed to fetch approved caregivers");
        }
    };

    const updateCaregiverStatus = async (id, status) => {
        try {
            await axios.post(
                "http://localhost:8080/caregiver/status",
                { infantCaregiverId: id, status },
                { headers: { token: `${localStorage.getItem("token")}` } }
            );

            if (status === "Approved") {
                const caregiver = pendingCaregivers.find(cg => cg.infantCaregiverId === id);
                setApprovedCaregivers([...approvedCaregivers, { ...caregiver, status }]);
                setPendingCaregivers(pendingCaregivers.filter(cg => cg.infantCaregiverId !== id));
            } else {
                setPendingCaregivers(pendingCaregivers.filter(cg => cg.infantCaregiverId !== id));
                setApprovedCaregivers(approvedCaregivers.filter(cg => cg.infantCaregiverId !== id));
            }

            message.success(`Caregiver ${status} successfully`);
        } catch (error) {
            message.error("Failed to update status");
        }
    };

    const columns = [
        { title: "Name", dataIndex: "fullName", key: "fullName" },
        { title: "Age", dataIndex: "age", key: "age" },
        { title: "Gender", dataIndex: "gender", key: "gender" },
        { title: "Contact", dataIndex: "contactNumber", key: "contactNumber" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: "Experience", dataIndex: "experience", key: "experience" },
        { title: "Languages", dataIndex: "languages", key: "languages" },
        { title: "Preferred Locations", dataIndex: "preferredLocations", key: "preferredLocations" },
        { title: "Ward", dataIndex: "ward", key: "ward" },
        { 
            title: "ID Proof", 
            dataIndex: "idProof", 
            key: "idProof", 
            render: text => text ? <a href={`http://localhost:8080/${text}`} target="_blank" rel="noopener noreferrer">View</a> : "Not Uploaded" 
        },
    ];

    const pendingColumns = [
        ...columns,
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <>
                    <Button 
                        type="primary" 
                        onClick={() => updateCaregiverStatus(record.infantCaregiverId, "Approved")} 
                        style={{ marginRight: 8 }}
                    >
                        Approve
                    </Button>
                    <Button 
                        type="primary" 
                        danger 
                        onClick={() => updateCaregiverStatus(record.infantCaregiverId, "Rejected")}
                    >
                        Reject
                    </Button>
                </>
            ),
        }
    ];

    const approvedColumns = [
        ...columns,
        { 
            title: "Available", 
            dataIndex: "available", 
            key: "available", 
            render: text => text ? "Yes" : "No" 
        },
        { 
            title: "Assigned Parent", 
            dataIndex: "assignedParent", 
            key: "assignedParent", 
            render: text => text || "Not Assigned" 
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Button 
                    type="primary" 
                    danger 
                    onClick={() => updateCaregiverStatus(record.infantCaregiverId, "Rejected")}
                >
                    Reject
                </Button>
            ),
        }
    ];

    return (
        <div style={{ padding: "20px" }}>
            <Title level={2}>Caregivers Management</Title>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Pending Caregivers" key="1">
                    {loading ? <Spin size="large" /> : <Table dataSource={pendingCaregivers} columns={pendingColumns} rowKey="infantCaregiverId" />}
                </TabPane>

                <TabPane tab="Approved Caregivers" key="2">
                    {loading ? <Spin size="large" /> : <Table dataSource={approvedCaregivers} columns={approvedColumns} rowKey="infantCaregiverId" />}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default CaregiverApproval;
