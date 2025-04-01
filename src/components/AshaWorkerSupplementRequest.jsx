import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message, Card, Row, Col, Tabs, Table, Tag, Spin } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;
const { TabPane } = Tabs;

const AshaWorkerSupplementRequest = () => {
  const [form] = Form.useForm();
  const [supplements, setSupplements] = useState([]);
  const [selectedSupplements, setSelectedSupplements] = useState([]);
  const [ashaid, setAshaId] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAshaId = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/ashaWorker/profile", { headers: { token } });
        setAshaId(response.data.ashaid);
      } catch (error) {
        message.error("Failed to fetch Asha ID");
      }
    };
    fetchAshaId();
  }, []);

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getSupplements");
        setSupplements(response.data);
      } catch (error) {
        message.error("Failed to load supplements.");
      }
    };
    fetchSupplements();
  }, []);

  useEffect(() => {
    if (ashaid) {
      fetchRequests();
    }
  }, [ashaid]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/asha/supplement-requests", { headers: { token } });
      setRequests(response.data.requests);
    } catch (error) {
      message.error("Failed to load supplement requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleSupplementChange = (selectedIds) => {
    const selected = selectedIds.map((id) => {
      const supplement = supplements.find((s) => s._id === id);
      return { supplementid: id, name: supplement?.name || "", quantity: 1 };
    });
    setSelectedSupplements(selected);
  };

  const handleQuantityChange = (id, quantity) => {
    setSelectedSupplements((prev) => prev.map((s) => (s.supplementid === id ? { ...s, quantity } : s)));
  };

  const onFinish = async (values) => {
    if (!ashaid) {
      message.error("Asha ID not found. Please try again.");
      return;
    }

    const requestData = {
      ashaid,
      supplements: selectedSupplements,
      date: values.date.format("YYYY-MM-DD"),
      place: values.place,
      ward: values.ward,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8080/asha/request-supplement", requestData, { headers: { token } });
      if (response.status === 201) {
        message.success("Supplement request sent successfully.");
        form.resetFields();
        setSelectedSupplements([]);
        fetchRequests();
      }
    } catch (error) {
      message.error("Failed to send request.");
    }
  };

  const statusColors = {
    Pending: "orange",
    Approved: "green",
    Rejected: "red",
    "Change Requested": "blue",
  };

  const columns = [
    { title: "Request ID", dataIndex: "requestid", key: "requestid" },
    { title: "Date", dataIndex: "date", key: "date", render: (date) => new Date(date).toLocaleDateString() },
    { title: "Place", dataIndex: "place", key: "place" },
    { title: "Ward", dataIndex: "ward", key: "ward" },
    { title: "Status", dataIndex: "status", key: "status", render: (status) => <Tag color={statusColors[status]}>{status}</Tag> },
    { title: "Admin Message", dataIndex: "adminMessage", key: "adminMessage", render: (message) => message || "No message" },
  ];

  return (
    <Card bordered style={{ width: "100%", maxWidth: 800, margin: "auto" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Request Supplement" key="1">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="date" label="Select Date" rules={[{ required: true, message: "Date is required" }]}>
              <DatePicker style={{ width: "100%" }} disabledDate={(current) => current && current < moment().startOf("day")} />
            </Form.Item>
            <Form.Item name="place" label="Place" rules={[{ required: true, message: "Place is required" }]}>
              <Input placeholder="Enter place" />
            </Form.Item>
            <Form.Item name="ward" label="Ward" rules={[{ required: true, message: "Ward is required" }]}>
              <Input placeholder="Enter ward" />
            </Form.Item>
            <Form.Item label="Select Supplements" rules={[{ required: true, message: "At least one supplement must be selected" }]}>  
              <Select mode="multiple" placeholder="Select supplements" onChange={handleSupplementChange}>
                {supplements.map((supplement) => (
                  <Option key={supplement._id} value={supplement._id}>{supplement.name}</Option>
                ))}
              </Select>
            </Form.Item>
            {selectedSupplements.length > 0 && selectedSupplements.map((item) => (
              <Row key={item.supplementid} gutter={16} style={{ marginBottom: 10 }}>
                <Col span={12}>{item.name}</Col>
                <Col span={12}><Input type="number" min={1} defaultValue={1} onChange={(e) => handleQuantityChange(item.supplementid, parseInt(e.target.value, 10))} /></Col>
              </Row>
            ))}
            <Form.Item><Button type="primary" htmlType="submit" block>Request Supplement</Button></Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="View Requests" key="2">
          {loading ? <Spin size="large" /> : <Table columns={columns} dataSource={requests} rowKey="requestid" pagination={{ pageSize: 5 }} bordered />}
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default AshaWorkerSupplementRequest;
