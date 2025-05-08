import React, { useEffect, useState } from "react";
import { Table, Button, message, Tag, Space } from "antd";
import axios from "axios";

const CaregiverRequests = () => {
  const [requests, setRequests] = useState([]);
  const caregiverToken = localStorage.getItem("token"); // Assuming token is stored in localStorage

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
        const response = await axios.get("http://localhost:8080/caregiver-assigned-request", {
            headers: { token: `${caregiverToken}` },
        });

        console.log("API Response:", response.data); // Debugging line

        if (response.data.error) {
            message.error(response.data.error);
        }

        if (Array.isArray(response.data)) {
            setRequests(response.data);
        } else if (response.data) {
            setRequests([response.data]); // Convert to array if it's an object
        } else {
            setRequests([]);
        }
    } catch (error) {
        // console.error("Error fetching assigned requests:", error);
        // message.error("Error fetching assigned requests.");
    }
};


const handleResponse = async (requestId, response) => {
    try {
        const res = await axios.post(
            "http://localhost:8080/caregiver-response",
            { requestId, response },
            { headers: { token: `${caregiverToken}` } }
        );

        console.log("API Response:", res.data); // Debugging line

        // Instead of checking `success`, just proceed if status is 200
        if (res.status === 200) { 
            message.success(`Request ${response.toLowerCase()}ed successfully.`);
            fetchRequests(); // Refresh the list
        } else {
            message.error(res.data.error || "Unexpected error occurred.");
        }

    } catch (error) {
        console.error("Error processing request:", error);

        if (error.response) {
            console.error("Response Data:", error.response.data);
            message.error(error.response.data.error || "Error processing request.");
        } else {
            message.error("Error processing request.");
        }
    }
};

  const columns = [
    {
      title: "Parent Name",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ward",
      dataIndex: "ward",
      key: "ward",
    },
    {
      title: "Child Name",
      dataIndex: "childName",
      key: "childName",
    },
    {
      title: "Age",
      dataIndex: "childAge",
      key: "childAge",
    },
    {
      title: "Gender",
      dataIndex: "childGender",
      key: "childGender",
      render: (gender) => (
        <Tag color={gender === "Male" ? "blue" : gender === "Female" ? "pink" : "purple"}>
          {gender}
        </Tag>
      ),
    },
    {
      title: "Requirements",
      dataIndex: "requirements",
      key: "requirements",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => handleResponse(record.requestId, "Accepted")}>
            Accept
          </Button>
          <Button danger onClick={() => handleResponse(record.requestId, "Declined")}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Assigned Requests</h2>
      <Table columns={columns} dataSource={requests} rowKey="requestId" />
    </div>
  );
};

export default CaregiverRequests;
