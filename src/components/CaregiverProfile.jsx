import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Card, Spin } from "antd";
import axios from "axios";

const CaregiverProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCaregiverProfile();
  }, []);

  const fetchCaregiverProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // Fetch token from storage
      if (!token) {
        message.error("Unauthorized. Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:8080/profilecaregiver", {
        headers: { token },
      });

      form.setFieldsValue(response.data); // Populate form with profile data
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch profile.");
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      await axios.put("http://localhost:8080/profilecaregiver", values, {
        headers: { token },
      });

      message.success("Profile updated successfully!");
      fetchCaregiverProfile(); // Refresh profile
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Infant Caregiver Profile" style={{ maxWidth: 600, margin: "auto" }}>
      {loading ? (
        <Spin tip="Loading profile..." />
      ) : (
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item label="Full Name" name="fullName">
            <Input />
          </Form.Item>

          <Form.Item label="Age" name="age">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Input />
          </Form.Item>

          <Form.Item label="Contact Number" name="contactNumber">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item label="Experience" name="experience">
            <Input />
          </Form.Item>

          <Form.Item label="Languages" name="languages">
            <Input />
          </Form.Item>

          <Form.Item label="Preferred Locations" name="preferredLocations">
            <Input />
          </Form.Item>

          <Form.Item label="Ward" name="ward">
            <Input />
          </Form.Item>

          <Form.Item label="Availability" name="available">
            <Input />
          </Form.Item>

          <Form.Item label="New Password" name="password">
            <Input.Password placeholder="Enter new password (optional)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={saving}>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default CaregiverProfile;
