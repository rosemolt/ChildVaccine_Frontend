import { useEffect, useState } from "react";
import { Table, Button, Spin, Alert, Card } from "antd";
import axios from "axios";

const PendingSupplements = ({ setSelectedOption, setScheduleData }) => {
    const [eligibleChildren, setEligibleChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEligibleChildren = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/eligible-children", {
                    headers: { Authorization: `${token}` },
                });
                setEligibleChildren(response.data.eligibleChildren);
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchEligibleChildren();
    }, []);

    const handleSchedule = (childId, childName, supplementName) => {
        setScheduleData({ childId, childName, supplementName });
        setSelectedOption("schedule");
    };

    const columns = [
        { title: "Child Name", dataIndex: "childName", key: "childName" },
        { title: "Age Group", dataIndex: "ageGroup", key: "ageGroup" },
        { title: "Supplement", dataIndex: "supplementName", key: "supplementName" },
        { title: "Category", dataIndex: "supplementType", key: "supplementType" },
        { 
            title: "Booking Status", 
            dataIndex: "bookingStatus", 
            key: "bookingStatus",
            render: (status) => (
                <span style={{ fontWeight: "bold", color: status === "Booked" ? "#27ae60" : "#e67e22" }}>
                    {status}
                </span>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (record) =>
                record.bookingStatus !== "Booked" && record.bookingStatus !== "Completed" ? (
                    <Button type="primary" onClick={() => handleSchedule(record.childId, record.childName, record.supplementName)}>
                        Schedule
                    </Button>
                ) : null,
        },
    ];

    return (
        <Card title="Eligible Children for Supplements" style={{ maxWidth: "1000px", margin: "auto", marginTop: "20px" }}>
            {loading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <Spin size="large" />
                </div>
            ) : error ? (
                <Alert message={error} type="error" showIcon />
            ) : (
                <Table dataSource={eligibleChildren} columns={columns} rowKey="childId" bordered pagination={{ pageSize: 5 }} />
            )}
        </Card>
    );
};

export default PendingSupplements;
