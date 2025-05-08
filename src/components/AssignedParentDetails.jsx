import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin, Alert, Typography } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AssignedParentDetails = () => {
  const [parent, setParent] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParentDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // token stored after login
        const response = await axios.get("http://localhost:8080/caregiver/assigned-parent", {
          headers: {
            token: token
          }
        });

        setStatus(response.data.status);
        setParent(response.data.parent);
      } catch (error) {
        console.error("Error fetching parent details:", error);
        setStatus("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchParentDetails();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <Spin size="large" tip="Loading parent details..." />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 20 }}>
      <Title level={2} style={{ textAlign: 'center' }}>Assigned Parent Details</Title>

      {parent ? (
        <Card
          bordered
          hoverable
          style={{ borderRadius: 16, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
        >
          <p><UserOutlined /> <Text strong>Name:</Text> {parent.name}</p>
          <p><MailOutlined /> <Text strong>Email:</Text> {parent.email}</p>
          <p><PhoneOutlined /> <Text strong>Phone:</Text> {parent.phoneno}</p>
          <p><HomeOutlined /> <Text strong>Address:</Text> {parent.address}</p>
          <p><EnvironmentOutlined /> <Text strong>Ward:</Text> {parent.ward}</p>
        </Card>
      ) : (
        <Alert
          message={status}
          type={status.includes("Error") ? "error" : "info"}
          showIcon
          style={{ marginTop: 20 }}
        />
      )}
    </div>
  );
};

export default AssignedParentDetails;
