import { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Card, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

const AshaWorkerProfile = () => {
    const [worker, setWorker] = useState({});
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            message.error("Authentication required. Please log in.");
            return;
        }

        axios.get("http://localhost:8080/ashaWorker/profile", {
            headers: { token },
        })
            .then((response) => {
                setWorker(response.data);
                form.setFieldsValue(response.data);
            })
            .catch(() => {
                message.error("Failed to load profile. Please try again.");
            });
    }, [token, form]);

    const handleFileChange = ({ file }) => {
        setFile(file);
    };

    const handleSubmit = async (values) => {
        setLoading(true);

        const formData = new FormData();
        Object.keys(values).forEach((key) => formData.append(key, values[key]));
        if (file) formData.append("verification_doc", file);

        try {
            const response = await axios.put(
                "http://localhost:8080/update/profile",
                formData,
                { headers: { "Content-Type": "multipart/form-data", token } }
            );

            setWorker(response.data.asha);
            message.success("Profile updated successfully!");
        } catch (error) {
            message.error(error.response?.data?.error || "Profile update failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Asha Worker Profile" style={{ maxWidth: 500, margin: "auto" }}>
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter your address" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Phone Number" name="phoneno" rules={[{ required: true, message: "Please enter your phone number" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Ward" name="ward" rules={[{ required: true, message: "Please enter your ward" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Verification Document">
                    <Upload beforeUpload={() => false} onChange={handleFileChange} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                    {worker.verification_doc && (
                        <Typography.Text>
                            <a href={`http://localhost:8080/${worker.verification_doc}`} target="_blank" rel="noopener noreferrer">
                                View Current Document
                            </a>
                        </Typography.Text>
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        {loading ? "Updating..." : "Update Profile"}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AshaWorkerProfile;
