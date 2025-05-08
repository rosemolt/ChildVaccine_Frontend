import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Upload, message, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";

const { Title, Text } = Typography;

const AshaWorkerRegistration = () => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (info) => {
        if (info.file.status === "done" || info.file.status === "uploading") {
            setFile(info.file.originFileObj);
        }
    };

    const onFinish = async (values) => {
        const formDataToSend = new FormData();
        Object.keys(values).forEach((key) => {
            formDataToSend.append(key, values[key]);
        });
        if (file) {
            formDataToSend.append("verification_doc", file);
        }

        try {
            const response = await axios.post("http://localhost:8080/registerAsha", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            message.success(response.data.status);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            message.error(err.response?.data?.status || "Registration failed. Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
            <Navbar />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <Title level={2} className="text-center">Asha Worker Registration</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter your name" }]}> 
                        <Input placeholder="Enter your name" />
                    </Form.Item>

                    <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please enter your address" }]}> 
                        <Input placeholder="Enter your address" />
                    </Form.Item>

                    <Form.Item 
                        name="phoneno" 
                        label="Phone Number" 
                        rules={[
                            { 
                                required: true, 
                                pattern: /^\+?[1-9]\d{9,14}$/, 
                                message: "Enter a valid phone number with country code (e.g., +919876543210)" 
                            }
                        ]}
                    > 
                        <Input placeholder="Enter your phone number (e.g., +919876543210)" />
                    </Form.Item>


                    <Form.Item name="ward" label="Ward" rules={[{ required: true, message: "Please enter your ward" }]}> 
                        <Input placeholder="Enter your ward" />
                    </Form.Item>

                    <Form.Item name="email" label="Email" 
                        rules={[{ required: true, type: "email", message: "Enter a valid email" }]}> 
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item name="password" label="Password" 
                        rules={[{ required: true, pattern: /(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/, message: "Password must contain at least 8 characters, a letter, a number, and a symbol" }]}> 
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item label="Upload Verification Document" rules={[{ required: true, message: "Verification document is required" }]}> 
                        <Upload beforeUpload={() => false} onChange={handleFileChange} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Register</Button>
                    </Form.Item>
                </Form>
                <Text className="block text-center mt-4">Already registered? <a href="/login" className="text-blue-500">Login here</a></Text>
            </div>
        </div>
    );
};

export default AshaWorkerRegistration;