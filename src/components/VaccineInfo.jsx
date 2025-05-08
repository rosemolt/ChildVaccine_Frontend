import React from "react";
import { Table, Card, Typography, Button, Divider, Tag } from "antd";
import { Link } from "react-router-dom";
import { SafetyCertificateOutlined } from "@ant-design/icons";

const { Title } = Typography;

const VaccineInfo = () => {
  const data = [
    { key: 1, name: "BCG", type: "Vaccine", age: "At birth" },
    { key: 2, name: "OPV-0", type: "Polio", age: "At birth" },
    { key: 3, name: "Hepatitis B-1", type: "Vaccine", age: "At birth" },
    { key: 4, name: "DPT", type: "Vaccine", age: "6, 10, 14 weeks" },
    { key: 5, name: "Vitamin A", type: "Vitamin", age: "9 months" },
    { key: 6, name: "Measles", type: "Vaccine", age: "9 months" },
    { key: 7, name: "Polio Booster", type: "Polio", age: "16-24 months" },
    { key: 8, name: "DPT Booster", type: "Vaccine", age: "16-24 months" },
    { key: 9, name: "Vitamin A Booster", type: "Vitamin", age: "Every 6 months till age 5" },
    { key: 14, name: "DPT Booster-1", type: "Vaccine", age: "16-24 months" },
    { key: 15, name: "OPV Booster", type: "Polio", age: "16-24 months" },
    { key: 16, name: "MR-2", type: "Vaccine", age: "16-24 months" },
    { key: 17, name: "JE-2", type: "Vaccine", age: "16-24 months" },
    { key: 18, name: "DPT Booster-2", type: "Vaccine", age: "5-6 years" },
    { key: 19, name: "Tdap (Tetanus, diphtheria, pertussis)", type: "Vaccine", age: "10 years" },
    { key: 20, name: "Td Booster", type: "Vaccine", age: "15 years" },
  ];

  const getTypeTagColor = (type) => {
    switch (type) {
      case "Vaccine":
        return "green";
      case "Polio":
        return "blue";
      case "Vitamin":
        return "orange";
      default:
        return "default";
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color={getTypeTagColor(type)}>{type}</Tag>,
    },
    { title: "Recommended Age", dataIndex: "age", key: "age" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 16px",
        background: "linear-gradient(to right, #e0f7fa, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 1000,
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "transform 0.3s",
        }}
        bordered={false}
        hoverable
      >
        <div className="text-center mb-3">
          <SafetyCertificateOutlined style={{ fontSize: 40, color: "#1890ff" }} />
          <Title level={2} style={{ color: "#1890ff", marginTop: 10 }}>
            Complete Guide to Your Child's Vaccinations
          </Title>
        </div>
        <Divider />
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          size="middle"
          style={{ marginBottom: "24px" }}
        />
        <div className="text-center">
          <Link to="/">
            <Button type="primary" size="large" style={{ backgroundColor: "#1890ff" }}>
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default VaccineInfo;
