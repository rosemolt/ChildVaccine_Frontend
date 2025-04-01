import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Select, Button, DatePicker, TimePicker, message, Tabs, Table } from "antd";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaNotesMedical, FaFileAlt } from "react-icons/fa";
import dayjs from "dayjs";

const { Option } = Select;
const { TabPane } = Tabs;

const ScheduleForm = () => {
    const [form] = Form.useForm();
    const [supplements, setSupplements] = useState([]);
    const [filteredSupplements, setFilteredSupplements] = useState([]);  // State to store filtered supplements
    const [selectedDescription, setSelectedDescription] = useState(""); // State to store selected supplement's description
    const [selectedType, setSelectedType] = useState(""); // State to store selected supplement type
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch supplements for displaying in the second tab
    useEffect(() => {
        const fetchSupplements = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/asha-view-supplements", {
                    headers: { token: `${token}` },
                });
                setSupplements(response.data);
                setFilteredSupplements(response.data); // Initially set all supplements
            } catch (error) {
                setError("Error fetching supplements.");
            } finally {
                setLoading(false);
            }
        };
        fetchSupplements();
    }, []);

    // Filter supplements based on selected type
    const handleTypeChange = (value) => {
        setSelectedType(value);
        if (value) {
            setFilteredSupplements(supplements.filter(sup => sup.category === value));
        } else {
            setFilteredSupplements(supplements); // If no category selected, show all supplements
        }
    };

    const handleSupplementChange = (value) => {
        // Find the selected supplement's description
        const selectedSupplement = filteredSupplements.find(sup => sup.name === value);
        setSelectedDescription(selectedSupplement ? selectedSupplement.description : "");
        form.setFieldsValue({ description: selectedSupplement ? selectedSupplement.description : "" }); // Auto-fill description
    };

    const handleSubmit = async (values) => {
        const { supplementType, supplementName, date, time, location, additionalNotes } = values;
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        const formattedTime = dayjs(time).format("HH:mm");

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:8080/schedule", {
                supplementType,
                supplementName,
                description: selectedDescription, // Send selected description
                date: formattedDate,
                time: formattedTime,
                location,
                additionalNotes,
            }, {
                headers: { token: `${token}` },
            });
            message.success(response.data.status);
            form.resetFields();
            setSelectedDescription(""); // Clear description after submitting
        } catch (error) {
            message.error(error.response?.data?.status || "Something went wrong.");
        }
    };

    // Table columns for displaying supplements
    const columns = [
        { title: "Supplement Name", dataIndex: "name", key: "name" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Age Group", dataIndex: "agegroup", key: "agegroup" },
        { title: "Dosage", dataIndex: "dosage", key: "dosage" },
        { title: "Description", dataIndex: "description", key: "description" },
    ];

    return (
        <div style={{ maxWidth: 1000, margin: "auto", padding: 20, background: "#f9f9f9", borderRadius: 10, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Manage Vaccinations & Supplements</h2>

            {/* Tabs Component */}
            <Tabs defaultActiveKey="1">
                {/* Tab 1: Schedule Vaccination Slot */}
                <TabPane tab="Schedule Vaccination Slot" key="1">
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item name="supplementType" label="Supplement Type" rules={[{ required: true }]}>
                            <Select placeholder="Select Type" onChange={handleTypeChange}>
                                <Option value="Vaccine">Vaccine</Option>
                                <Option value="Polio">Polio</Option>
                                <Option value="Vitamins">Vitamins</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="supplementName" label="Supplement Name" rules={[{ required: true }]}>
                            <Select placeholder="Select Supplement" onChange={handleSupplementChange}>
                                {filteredSupplements.map(sup => (
                                    <Option key={sup.supplementid} value={sup.name}>{sup.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        {/* Auto-filled description field */}
                        <Form.Item name="description" label={<><FaFileAlt /> Description</>}>
                            <Input.TextArea value={selectedDescription} readOnly placeholder="Description will be displayed here..." />
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
                </TabPane>

                {/* Tab 2: View Supplements */}
                <TabPane tab="View Supplements" key="2">
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <message.loading>Loading supplements...</message.loading>
                        </div>
                    ) : error ? (
                        <message.error>{error}</message.error>
                    ) : (
                        <Table dataSource={supplements} columns={columns} rowKey="_id" bordered pagination={{ pageSize: 5 }} />
                    )}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ScheduleForm;
