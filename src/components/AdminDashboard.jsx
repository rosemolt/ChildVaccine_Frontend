import React, { useState, useEffect } from "react";
import { FaClipboardList, FaPlusCircle, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Layout, Menu, Button, Typography, Card } from "antd";
import AddSupplement from "./AddSupplement";
import AdminSupplement from "./AdminSupplement";
import ScheduleForm from "./ScheduleForm";
import BookedParents from "./BookedParents";
import PendingSupplements from "./PendingSupplements";
import AdminUpcomingSchedules from "./AdminUpcomingSchedules";
import ApproveAshaWorkers from "./ApproveAshaWorkers";
import AdminMessages from "./Admin Messages";
import AdminSupplementRequests from "./AdminSupplementRequests";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
    const [selectedOption, setSelectedOption] = useState("welcome");
    const [scheduleData, setScheduleData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const renderContent = () => {
        switch (selectedOption) {
            case "addSupplement":
                return <AddSupplement />;
            case "adminsupplement":
                return <AdminSupplement />;
            case "approveasha":
                return <ApproveAshaWorkers />;
            case "supplement-request":
                return <AdminSupplementRequests />;
            case "pendingchild":
                return <PendingSupplements setSelectedOption={setSelectedOption} setScheduleData={setScheduleData} />;
            case "upcomingschedules":
                return <AdminUpcomingSchedules />;
            case "messages":
                return <AdminMessages />;
            case "bookedParents":
                return <BookedParents />;
            default:
                return (
                    <Card style={{ textAlign: "center", padding: "20px" }}>
                        <Title level={2}>Welcome Back, Admin!</Title>
                        <Text strong>Today is {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}</Text>
                        <p>Manage schedules, approve Asha workers, and keep track of vaccinations efficiently.</p>
                    </Card>
                );
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider theme="dark" style={{ backgroundColor: "#2d6a4f" }}>
                <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
                    <FaUserCircle size={50} />
                    <h3>Admin</h3>
                </div>
                <Menu theme="dark" mode="vertical" selectedKeys={[selectedOption]} style={{ backgroundColor: "#2d6a4f" }}> 
                    <Menu.Item key="addSupplement" onClick={() => setSelectedOption("addSupplement")} icon={<FaPlusCircle />}>Add Supplement</Menu.Item>
                    <Menu.Item key="adminsupplement" onClick={() => setSelectedOption("adminsupplement")} icon={<FaClipboardList />}>View Supplements</Menu.Item>
                    <Menu.Item key="approveasha" onClick={() => setSelectedOption("approveasha")} icon={<FaClipboardList />}>Approve Asha Workers</Menu.Item>
                    <Menu.Item key="supplement-request" onClick={() => setSelectedOption("supplement-request")} icon={<FaClipboardList />}>Supplement Request</Menu.Item>
                    <Menu.Item key="pendingchild" onClick={() => setSelectedOption("pendingchild")} icon={<FaClipboardList />}>Children List</Menu.Item>
                    <Menu.Item key="upcomingschedules" onClick={() => setSelectedOption("upcomingschedules")} icon={<FaClipboardList />}>Upcoming Schedules</Menu.Item>
                    <Menu.Item key="messages" onClick={() => setSelectedOption("messages")} icon={<FaClipboardList />}>Messages</Menu.Item>
                    <Menu.Item key="bookedParents" onClick={() => setSelectedOption("bookedParents")} icon={<FaClipboardList />}>Booked Parents</Menu.Item>
                </Menu>
                <Button type="primary" danger block href="/" style={{ marginTop: "20px" }} icon={<FaSignOutAlt />}>Logout</Button>
            </Sider>
            <Layout>
                <Content style={{ margin: "20px", padding: "20px", background: "#fff", borderRadius: "10px" }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;