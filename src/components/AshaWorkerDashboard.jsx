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
import AshaWorkerProfile from "./AshaWorkerProfile";
import AshaEligibleChildren from "./AshaEligibleChildren";
import AshaMessageForm from "./AshaMessageForm";
import AshaSchedules from "./AshaSchedules";
import AshaWorkerBookings from "./AshaWorkerBookings";
import CaregiverApproval from "./CaregiverApproval";
import AssignCaregiver from "./AssignCaregiver";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const AshaWorkerDashboard = () => {
    const [selectedOption, setSelectedOption] = useState("welcome");

    const renderContent = () => {
        switch (selectedOption) {
            case "ashaprofile":
                return <AshaWorkerProfile />;
            case "asha-eligible-children":
                return <AshaEligibleChildren />;
            case "asha-message":
                return <AshaMessageForm />;
            case "asha-schedules":
                return <AshaSchedules />;
            case "asha-bookedchild":
                return <AshaWorkerBookings />;
            case "asha-caregiverapproval":
                return <CaregiverApproval />;
            case "asha-assigncaregiver":
                return <AssignCaregiver />;
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
                <Title level={4} style={{ color: "white", textAlign: "center", padding: "10px 0" }}>Asha Worker Dashboard</Title>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["welcome"]}
                    onClick={({ key }) => setSelectedOption(key)}
                >
                    <Menu.Item key="ashaprofile" icon={<UserOutlined />}>Profile</Menu.Item>
                    <Menu.Item key="asha-eligible-children" icon={<ProfileOutlined />}>Pending Children</Menu.Item>
                    <Menu.Item key="asha-message" icon={<MessageOutlined />}>Send Message</Menu.Item>
                    <Menu.Item key="asha-schedules" icon={<ScheduleOutlined />}>Schedules</Menu.Item>
                    <Menu.Item key="asha-bookedchild" icon={<FileDoneOutlined />}>Booked Child</Menu.Item>
                    <Menu.Item key="asha-caregiverapproval" icon={<FileDoneOutlined />}>Caregivers</Menu.Item>
                    <Menu.Item key="asha-assigncaregiver" icon={<FileDoneOutlined />}>Caregiver Request</Menu.Item>
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

export default AshaWorkerDashboard;
