import React, { useState } from "react";
import { Layout, Menu, Button, Typography, Card } from "antd";
import { FaUserCircle,FaPlusCircle, FaRegEye, FaCalendarPlus, FaCalendarCheck, FaHandsHelping, FaUserCheck, FaCheckCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import ParentProfile from "./ParentProfile";
import AddChild from "./AddChild";
import ViewChildren from "./ViewChildren";
import ParentSchedules from "./ParentSchedules";
import ParentBookings from "./ParentBookings";
import RequestCaregiver from "./RequestCaregiver";
import AssignedCaregiver from "./AssignedCaregiver";
import ConfirmVaccination from "./ConfirmVaccination";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const ParentDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedOption, setSelectedOption] = useState("welcome");

    const renderContent = () => {
        switch (selectedOption) {
            case "profile":
                return <ParentProfile />;
            case "add-child":
                return <AddChild />;
            case "view-child":
                return <ViewChildren />;
            case "booking":
                return <ParentSchedules />;
            case "view-booking":
                return <ParentBookings />;
            case "request-caregiver":
                return <RequestCaregiver />;
            case "caregiver":
                    return <AssignedCaregiver />;
            case "confirm":
                return <ConfirmVaccination />;
            default:
                return (
                    <Card style={{ textAlign: "center", padding: "40px" }}>
                        <Title level={2}>Welcome to Your Parent Dashboard</Title>
                        <Text type="secondary">
                            Manage your child's vaccination appointments, schedules, and records effortlessly.
                            Use the menu on the left to navigate.
                        </Text>
                    </Card>
                );
        }
    };

    const handleLogout = () => {
        console.log("Logging out...");
        window.location.href = "/";
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{ background: "#6A4C93" }}>
                <div style={{ color: "white", textAlign: "center", padding: "16px", fontSize: "18px", fontWeight: "bold" }}>
                    {collapsed ? "PD" : "Parent Dashboard"}
                </div>
                <Menu theme="dark" mode="vertical" defaultSelectedKeys={["welcome"]} style={{ background: "#6A4C93" }}>
                    <Menu.Item key="profile" icon={<FaUserCircle />} onClick={() => setSelectedOption("profile")}>
                        Profile
                    </Menu.Item>
                    <Menu.Item key="add-child" icon={<FaPlusCircle />} onClick={() => setSelectedOption("add-child")}>
                        Add Child
                    </Menu.Item>
                    <Menu.Item key="view-child" icon={<FaRegEye />} onClick={() => setSelectedOption("view-child")}>
                        View Child
                    </Menu.Item>
                    <Menu.Item key="booking" icon={<FaCalendarPlus />} onClick={() => setSelectedOption("booking")}>
                        Booking
                    </Menu.Item>
                    <Menu.Item key="view-booking" icon={<FaCalendarCheck />} onClick={() => setSelectedOption("view-booking")}>
                        Your Bookings
                    </Menu.Item>
                    <Menu.Item key="request-caregiver" icon={<FaHandsHelping />} onClick={() => setSelectedOption("request-caregiver")}>
                        Request Caregiver
                    </Menu.Item>
                    <Menu.Item key="caregiver" icon={<FaUserCheck />} onClick={() => setSelectedOption("caregiver")}>
                        Assigned Caregiver
                    </Menu.Item>
                    <Menu.Item key="confirm" icon={<FaCheckCircle />} onClick={() => setSelectedOption("confirm")}>
                        Confirm Vaccinated
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<FaSignOutAlt />} onClick={handleLogout} danger>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* Main Content */}
            <Layout>
                <Header style={{ background: "#fff", padding: "0 20px", display: "flex", alignItems: "center" }}>
                    <Button type="primary" onClick={() => setCollapsed(!collapsed)} icon={<FaBars />} />
                    <Title level={3} style={{ marginLeft: "20px" }}>Parent Dashboard</Title>
                </Header>
                <Content style={{ margin: "20px", padding: "20px", background: "#fff", borderRadius: "8px" }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ParentDashboard;
