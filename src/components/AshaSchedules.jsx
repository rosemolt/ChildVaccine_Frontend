import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Card, Typography, Spin, Alert } from "antd";

const { Title, Text } = Typography;

const AshaSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:8080/asha/schedules", {
          headers: { token: `${localStorage.getItem("token")}` },
        });
        setSchedules(response.data);
      } catch (err) {
        setError("Failed to fetch schedules. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  if (loading) return <Spin tip="Loading schedules..." size="large" style={{ display: "block", textAlign: "center", marginTop: 20 }} />;
  if (error) return <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />;

  const columns = [
    {
      title: "Supplement",
      dataIndex: "supplement",
      key: "supplement",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Eligible Children",
      key: "eligibleChildren",
      render: (_, record) => (
        record.eligibleChildren.length > 0 ? (
          <ul>
            {record.eligibleChildren.map((child, index) => (
              <li key={index}>
                <Text strong>{child.childName}</Text> (Age: {child.age}) - Parent: {child.parentName}, Ward: {child.ward}
              </li>
            ))}
          </ul>
        ) : (
          <Text type="secondary">No eligible children</Text>
        )
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>Asha Worker Schedules</Title>
      {schedules.length === 0 ? (
        <Alert message="No schedules available." type="info" showIcon style={{ marginBottom: 20 }} />
      ) : (
        <Table 
          dataSource={schedules} 
          columns={columns} 
          rowKey="scheduleId" 
          bordered
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default AshaSchedules;
