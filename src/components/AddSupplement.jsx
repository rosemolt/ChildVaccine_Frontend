import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select, Button, message, Modal, Card } from "antd";

const { Option } = Select;

const AddSupplement = () => {
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Admin not logged in");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/addSupplement",
        values,
        { headers: { Authorization: `${token}` } }
      );
      setPopupMessage(response.data.message);
      setShowPopup(true);
      form.resetFields();
    } catch (err) {
      message.error(err.response ? err.response.data.message : "Error adding supplement");
    }
  };

  return (
    <Card title="Add Supplement" style={{ width: 600, margin: "auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter the supplement name" }]}>
          <Input placeholder="Enter supplement name" />
        </Form.Item>

        <Form.Item label="Category" name="category" initialValue="Vaccine" rules={[{ required: true }]}>
          <Select>
            <Option value="Vaccine">Vaccine</Option>
            <Option value="Polio">Polio</Option>
            <Option value="Vitamins">Vitamins</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter a description" }]}>
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>

        <Form.Item label="Age Group" name="agegroup" rules={[{ required: true, message: "Please enter the age group" }]}>
          <Input placeholder="Enter age group" />
        </Form.Item>

        <Form.Item label="Dosage" name="dosage" rules={[{ required: true, message: "Please enter the dosage" }]}>
          <Input placeholder="Enter dosage" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Supplement
          </Button>
        </Form.Item>
      </Form>

      <Modal visible={showPopup} onOk={() => setShowPopup(false)} onCancel={() => setShowPopup(false)}>
        <p>{popupMessage}</p>
      </Modal>
    </Card>
  );
};

export default AddSupplement;