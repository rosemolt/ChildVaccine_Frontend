import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Navbar from "./Navbar";

const { Option } = Select;

const CaregiverRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Handle Form Submission
  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    
    for (let key in values) {
      if (key === "idProof") {
        formData.append(key, values.idProof.file); // Append file
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      const response = await axios.post("http://localhost:8080/registerCaregiver", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success(response.data.message);
      form.resetFields();
    } catch (error) {
      message.error("Error registering caregiver");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <Navbar />
      <div className="container mt-4">
      <h2 className="text-center">Infant Caregiver Registration</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: "Name is required" }]}>
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item name="age" label="Age" rules={[{ required: true, message: "Age is required" }]}>
          <Input type="number" placeholder="Enter age" />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Select gender" }]}>
          <Select placeholder="Select gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true, message: "Enter contact number" }]}>
          <Input placeholder="Enter contact number" />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Enter valid email" }]}>
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item name="address" label="Address" rules={[{ required: true, message: "Enter address" }]}>
          <Input.TextArea placeholder="Enter address" />
        </Form.Item>

        <Form.Item name="experience" label="Experience" rules={[{ required: true, message: "Enter experience details" }]}>
          <Input.TextArea placeholder="Describe your experience" />
        </Form.Item>

        <Form.Item name="languages" label="Languages Known" rules={[{ required: true, message: "Enter known languages" }]}>
          <Input placeholder="E.g., English, Hindi, Malayalam" />
        </Form.Item>

        <Form.Item name="preferredLocations" label="Preferred Locations" rules={[{ required: true, message: "Enter preferred locations" }]}>
          <Input placeholder="Enter preferred locations" />
        </Form.Item>

        <Form.Item name="ward" label="Ward/Locality" rules={[{ required: true, message: "Enter ward/locality" }]}>
          <Input placeholder="Enter ward/locality" />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Enter password" }]}>
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item name="idProof" label="Upload ID Proof" rules={[{ required: true, message: "Upload ID Proof" }]}>
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload ID Proof</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default CaregiverRegistration;
