import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Modal, message, Tabs } from "antd";

const { TabPane } = Tabs;

const ApproveAshaWorkers = () => {
    const [pendingAshaWorkers, setPendingAshaWorkers] = useState([]);
    const [approvedAshaWorkers, setApprovedAshaWorkers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchAshaWorkers();
        fetchApprovedAshaWorkers();
    }, []);

    // Fetch Pending Asha Workers
    const fetchAshaWorkers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/pending-asha-workers", {
                headers: { Authorization: `${token}` },
            });
            setPendingAshaWorkers(response.data);
        } catch (error) {
            console.error("Error fetching Asha Workers:", error);
            message.error("Failed to fetch pending Asha Workers");
        }
    };

    // Fetch Approved Asha Workers
    const fetchApprovedAshaWorkers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/approved-asha-workers", {
                headers: { Authorization: `${token}` },
            });
            setApprovedAshaWorkers(response.data);
        } catch (error) {
            console.error("Error fetching approved Asha Workers:", error);
            message.error("Failed to fetch approved Asha Workers");
        }
    };

    // Approve or Reject Asha Worker
    const handleStatusChange = async (ashaid, status) => {
        setLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:8080/admin/approve-asha/${ashaid}`,
                { status },
                { headers: { Authorization: `${token}` } }
            );

            message.success(response.data.status);
            fetchAshaWorkers();
            fetchApprovedAshaWorkers();
        } catch (error) {
            console.error("Error updating status:", error);
            message.error(error.response?.data?.status || "Failed to update status");
        } finally {
            setLoading(false);
            setModalVisible(false);
        }
    };

    // Show Confirmation Modal
    const showModal = (worker, status) => {
        setSelectedWorker(worker);
        setModalVisible(true);
        worker.statusToUpdate = status;
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Asha Workers</h2>

            <Tabs defaultActiveKey="1">
                {/* Pending Asha Workers */}
                <TabPane tab="Pending Asha Workers" key="1">
                    <Table dataSource={pendingAshaWorkers} rowKey="ashaid" bordered>
                        <Table.Column title="Name" dataIndex="name" key="name" />
                        <Table.Column title="Phone" dataIndex="phoneno" key="phoneno" />
                        <Table.Column title="Ward" dataIndex="ward" key="ward" />
                        <Table.Column
                            title="Verification Document"
                            key="verification_doc"
                            render={(worker) =>
                                worker.verification_doc ? (
                                    worker.verification_doc.endsWith('.pdf') ? (
                                        <a href={`http://localhost:8080/${worker.verification_doc}`} target="_blank" rel="noopener noreferrer">
                                            View PDF
                                        </a>
                                    ) : (
                                        <img
                                            src={`http://localhost:8080/${worker.verification_doc}`}
                                            alt="Verification Document"
                                            style={{ width: 100, height: 100, objectFit: 'cover', cursor: 'pointer' }}
                                            onClick={() => window.open(`http://localhost:8080/${worker.verification_doc}`, "_blank")}
                                        />
                                    )
                                ) : (
                                    "No Document"
                                )
                            }
                        />

                        <Table.Column title="Status" dataIndex="status" key="status" />
                        <Table.Column
                            title="Actions"
                            key="actions"
                            render={(worker) => (
                                <div className="space-x-2">
                                    <Button type="primary" onClick={() => showModal(worker, "approved")}>
                                        Approve
                                    </Button>
                                    <Button type="danger" onClick={() => showModal(worker, "rejected")}>
                                        Reject
                                    </Button>
                                </div>
                            )}
                        />
                    </Table>
                </TabPane>

                {/* Approved Asha Workers */}
                <TabPane tab="Approved Asha Workers" key="2">
                    <Table dataSource={approvedAshaWorkers} rowKey="ashaid" bordered>
                        <Table.Column title="Name" dataIndex="name" key="name" />
                        <Table.Column title="Phone" dataIndex="phoneno" key="phoneno" />
                        <Table.Column title="Ward" dataIndex="ward" key="ward" />
                        <Table.Column
                            title="Verification Document"
                            key="verification_doc"
                            render={(worker) =>
                                worker.verification_doc ? (
                                    worker.verification_doc.endsWith('.pdf') ? (
                                        <a href={`http://localhost:8080/${worker.verification_doc}`} target="_blank" rel="noopener noreferrer">
                                            View PDF
                                        </a>
                                    ) : (
                                        <img
                                            src={`http://localhost:8080/${worker.verification_doc}`}
                                            alt="Verification Document"
                                            style={{ width: 100, height: 100, objectFit: 'cover', cursor: 'pointer' }}
                                            onClick={() => window.open(`http://localhost:8080/${worker.verification_doc}`, "_blank")}
                                        />
                                    )
                                ) : (
                                    "No Document"
                                )
                            }
                        />
                        <Table.Column title="Status" dataIndex="status" key="status" />
                        <Table.Column
                            title="Actions"
                            key="actions"
                            render={(worker) => (
                                <Button type="danger" onClick={() => showModal(worker, "rejected")}>
                                    Reject
                                </Button>
                            )}
                        />
                    </Table>
                </TabPane>
            </Tabs>

            {/* Confirmation Modal */}
            <Modal
                title="Confirm Action"
                open={modalVisible}
                onOk={() => handleStatusChange(selectedWorker.ashaid, selectedWorker.statusToUpdate)}
                onCancel={() => setModalVisible(false)}
                confirmLoading={loading}
            >
                <p>Are you sure you want to <strong>{selectedWorker?.statusToUpdate}</strong> {selectedWorker?.name}?</p>
            </Modal>
        </div>
    );
};

export default ApproveAshaWorkers;
