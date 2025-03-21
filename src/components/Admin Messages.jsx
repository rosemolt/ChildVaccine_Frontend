import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag, Button, message as antdMessage, Card } from "antd";

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/view-messages", {
                headers: { authorization: localStorage.getItem("token") }
            });
            setMessages(response.data);
        } catch (error) {
            antdMessage.error("Error fetching messages");
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(`http://localhost:8080/admin/update-message/${id}`, { status }, {
                headers: { authorization: localStorage.getItem("token") }
            });

            antdMessage.success(`Message marked as ${status}`);
            fetchMessages();
        } catch (error) {
            antdMessage.error("Error updating status");
        }
    };

    const columns = [
        {
            title: "Asha Worker",
            dataIndex: ["ashaId", "name"],
            key: "ashaWorker"
        },
        {
            title: "Email",
            dataIndex: ["ashaId", "email"],
            key: "email"
        },
        {
            title: "Ward",
            dataIndex: ["ashaId", "ward"],
            key: "ward"
        },
        {
            title: "Message",
            dataIndex: "message",
            key: "message"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "pending" ? "red" : status === "reviewed" ? "orange" : "green"}>
                    {status.toUpperCase()}
                </Tag>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    {record.status !== "reviewed" && (
                        <Button onClick={() => updateStatus(record._id, "reviewed")} style={{ marginRight: 8 }}>
                            Mark as Reviewed
                        </Button>
                    )}
                    {record.status !== "resolved" && (
                        <Button onClick={() => updateStatus(record._id, "resolved")} type="primary">
                            Mark as Resolved
                        </Button>
                    )}
                </>
            )
        }
    ];

    return (
        <Card title="Messages from Asha Workers">
            <Table dataSource={messages} columns={columns} rowKey="_id" />
        </Card>
    );
};

export default AdminMessages;
