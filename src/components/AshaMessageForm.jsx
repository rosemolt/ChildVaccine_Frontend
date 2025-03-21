import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, message as antdMessage, Card, List, Tag, Spin } from "antd";

const AshaMessageForm = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch Asha Worker's Messages
    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/asha/messages", {
                headers: { token: localStorage.getItem("token") }
            });
            setMessages(response.data.messages);
        } catch (error) {
            antdMessage.error("Error fetching messages");
        }
        setLoading(false);
    };

    // ✅ Send Message to Admin
    const sendMessage = async () => {
        try {
            if (!message.trim()) {
                antdMessage.warning("Message cannot be empty!");
                return;
            }

            await axios.post("http://localhost:8080/asha/send-message", { message }, {
                headers: { token: localStorage.getItem("token") }
            });

            antdMessage.success("Message sent to Admin!");
            setMessage("");
            fetchMessages(); // Refresh messages after sending
        } catch (error) {
            antdMessage.error("Error sending message");
        }
    };

    useEffect(() => {
        fetchMessages(); // Load messages when component mounts
    }, []);

    return (
        <Card title="Send Message to Head">
            <Input.TextArea
                rows={4}
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="primary" style={{ marginTop: "10px" }} onClick={sendMessage}>
                Send
            </Button>

            <Card title="Your Messages" style={{ marginTop: "20px" }}>
                {loading ? <Spin size="large" /> : (
                    <List
                        dataSource={messages}
                        renderItem={(msg) => (
                            <List.Item>
                                <List.Item.Meta title={msg.message} description={new Date(msg.createdAt).toLocaleString()} />
                                <Tag color={msg.status === "pending" ? "orange" : msg.status === "reviewed" ? "blue" : "green"}>
                                    {msg.status.toUpperCase()}
                                </Tag>
                            </List.Item>
                        )}
                    />
                )}
            </Card>
        </Card>
    );
};

export default AshaMessageForm;
