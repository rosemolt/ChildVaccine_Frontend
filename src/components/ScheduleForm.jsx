import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Select, Button, DatePicker, TimePicker, message } from "antd";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaNotesMedical } from "react-icons/fa";
import dayjs from "dayjs";

const { Option } = Select;

const ScheduleForm = () => {
    const [form] = Form.useForm();
    const [supplements, setSupplements] = useState([]);

    useEffect(() => {
        const fetchSupplements = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/getSupplements", {
                    headers: { Authorization: `${token}` },
                });
                setSupplements(response.data);
            } catch (error) {
                console.error("Error fetching supplements:", error);
            }
        };
        fetchSupplements();
    }, []);

    const handleSubmit = async (values) => {
        const { supplementType, supplementName, date, time, location, additionalNotes } = values;
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const formattedTime = dayjs(time).format("HH:mm");

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:8080/schedule", {
                supplementType,
                supplementName,
                date: formattedDate,
                time: formattedTime,
                location,
                additionalNotes,
            }, {
                headers: { Authorization: `${token}` },
            });
            message.success(response.data.status);
            form.resetFields();
        } catch (error) {
            message.error(error.response?.data?.status || "Something went wrong.");
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: "auto", padding: 20, background: "#f9f9f9", borderRadius: 10, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Schedule Vaccination Slot</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="supplementType" label="Supplement Type" rules={[{ required: true }]}>  
                    <Select placeholder="Select Type">
                        <Option value="Vaccine">Vaccine</Option>
                        <Option value="Polio">Polio</Option>
                        <Option value="Vitamins">Vitamins</Option>
                    </Select>
                </Form.Item>
                
                <Form.Item name="supplementName" label="Supplement Name" rules={[{ required: true }]}>  
                    <Select placeholder="Select Supplement">
                        {supplements.map(sup => (
                            <Option key={sup.supplementid} value={sup.name}>{sup.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                
                <Form.Item name="date" label={<><FaCalendarAlt /> Date</>} rules={[{ required: true }]}>  
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                
                <Form.Item name="time" label={<><FaClock /> Time</>} rules={[{ required: true }]}>  
                    <TimePicker style={{ width: "100%" }} format="HH:mm" />
                </Form.Item>
                
                <Form.Item name="location" label={<><FaMapMarkerAlt /> Location</>} rules={[{ required: true }]}>  
                    <Input placeholder="Enter location..." />
                </Form.Item>
                
                <Form.Item name="additionalNotes" label={<><FaNotesMedical /> Additional Notes</>}>  
                    <Input.TextArea placeholder="Enter additional notes..." />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>✅ Schedule Slot</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ScheduleForm;
