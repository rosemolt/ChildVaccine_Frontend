import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, message, Card, Typography, Spin } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

const RequestCaregiver = () => {
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Authentication required.");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/request-caregiver",
        { requirements },
        { headers: { token } }
      );

      message.success(response.data.message);
      setRequirements("");
    } catch (error) {
      message.error(error.response?.data?.error || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg shadow-lg rounded-lg p-6 bg-white">
        <Title level={3} className="text-center text-blue-600">
          Request Infant Caregiver
        </Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Caregiver Requirements"
            rules={[{ required: true, message: "Please enter your requirements!" }]}
          >
            <TextArea
              rows={4}
              placeholder="Enter your requirements..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-600 hover:bg-blue-700"
              loading={loading}
            >
              {loading ? <Spin /> : "Submit Request"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RequestCaregiver;
