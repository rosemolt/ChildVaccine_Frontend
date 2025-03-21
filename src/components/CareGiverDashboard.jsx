import React, { useState } from "react";
import { Layout, Menu, Card, Typography } from "antd";
import {
    UserOutlined,
    ScheduleOutlined,
    MessageOutlined,
    LogoutOutlined,
    ProfileOutlined,
    FileDoneOutlined,
} from "@ant-design/icons";
import CaregiverProfile from "./CaregiverProfile";
import CaregiverRequests from "./CaregiverRequests";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const CareGiverDashboard = () => {
    const [selectedOption, setSelectedOption] = useState("welcome");

    const renderContent = () => {
        switch (selectedOption) {
            case "caregiverprofile":
                return <CaregiverProfile />;
            case "request":
                return <CaregiverRequests />;
            // case "asha-message":
            //     return <AshaMessageForm />;
            // case "asha-schedules":
            //     return <AshaSchedules />;
            // case "asha-bookedchild":
            //     return <AshaWorkerBookings />;
            // case "asha-caregiverapproval":
            //     return <CaregiverApproval />;
            default:
                return (
                    <Card style={{ textAlign: "center", margin: "20px" }}>
                        <Title level={3}>Welcome to Your Dashboard</Title>
                        <p>Manage your profile and booked child details efficiently.</p>
                    </Card>
                );
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
                <Title level={4} style={{ color: "white", textAlign: "center", padding: "10px 0" }}>Caregiver Dashboard</Title>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["welcome"]}
                    onClick={({ key }) => setSelectedOption(key)}
                >
                    <Menu.Item key="caregiverprofile" icon={<UserOutlined />}>Profile</Menu.Item>
                    <Menu.Item key="request" icon={<ProfileOutlined />}>Requests</Menu.Item>
                    {/* <Menu.Item key="asha-message" icon={<MessageOutlined />}>Send Message</Menu.Item>
                    <Menu.Item key="asha-schedules" icon={<ScheduleOutlined />}>Schedules</Menu.Item>
                    <Menu.Item key="asha-bookedchild" icon={<FileDoneOutlined />}>Booked Child</Menu.Item>
                    <Menu.Item key="asha-caregiverapproval" icon={<FileDoneOutlined />}>Caregivers</Menu.Item> */}
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        <a href="/">Logout</a>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: "#fff", padding: "0 20px" }}>
                    {/* <Title level={3} style={{ margin: 0 }}>Asha Worker Dashboard</Title> */}
                </Header>
                <Content style={{ margin: "20px" }}>{renderContent()}</Content>
            </Layout>
        </Layout>
    );
};

export default CareGiverDashboard;
