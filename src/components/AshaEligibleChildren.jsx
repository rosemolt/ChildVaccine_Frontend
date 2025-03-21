import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Typography, Card, Button, Modal, message, Tabs } from "antd";

const { Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

const AshaEligibleChildren = () => {
  const [categorizedChildren, setCategorizedChildren] = useState({});
  const [search, setSearch] = useState("");
  const [searchedChildren, setSearchedChildren] = useState([]);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [customMessage, setCustomMessage] = useState("");
  const [ashaMessages, setAshaMessages] = useState([]);

  useEffect(() => {
    const fetchEligibleChildren = async () => {
      try {
        const response = await axios.get("http://localhost:8080/asha/eligible-children", {
          headers: { token: localStorage.getItem("token") },
        });

        if (response.data && response.data.categorizedChildren) {
          setCategorizedChildren(response.data.categorizedChildren);
        }
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    const fetchAshaMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8080/ashaworker/messages", {
          headers: { token: localStorage.getItem("token") },
        });
        if (response.data.success) {
          setAshaMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching Asha messages:", error);
      }
    };

    fetchEligibleChildren();
    fetchAshaMessages();
  }, []);

  const searchChildDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/asha/search-child?childName=${search}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setSearchedChildren(response.data.matchingChildren || []);
    } catch (error) {
      console.error("Error searching child:", error);
      setSearchedChildren([]);
    }
  };

  const sendMessage = async () => {
    if (!selectedParent || !customMessage) {
      message.error("Parent and message are required.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/asha/send-messages",
        {
          parentid: selectedParent.parentId,
          messages: customMessage,
        },
        { headers: { token: localStorage.getItem("token") } }
      );

      message.success("Message sent successfully.");
      setMessageModalVisible(false);
      setCustomMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      message.error("Failed to send message.");
    }
  };

  const renderTable = (category, data) => {
    const filteredData = data.filter((child) =>
      child.childName.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
      { title: "Child Name", dataIndex: "childName", key: "childName" },
      { title: "Child ID", dataIndex: "childId", key: "childId" },
      { title: "Age Group", dataIndex: "ageGroup", key: "ageGroup" },
      { title: "Supplement Name", dataIndex: "supplementName", key: "supplementName" },
      { title: "Supplement Type", dataIndex: "supplementType", key: "supplementType" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <strong style={{ color: status === "Completed" ? "green" : "red" }}>{status}</strong>
        ),
      },
    ];

    return (
      <Card key={category} style={{ marginBottom: "20px" }}>
        <Title level={3}>{category}</Title>
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey={(record) => record.childId}
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Card>
    );
  };

  return (
    <div style={{ margin: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Asha Worker Dashboard
      </Title>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Eligible Children" key="1">
          <Search
            placeholder="Search by child name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={searchChildDetails}
            style={{ marginBottom: 20, width: "100%" }}
          />

          {searchedChildren.length > 0 && (
            <Card title="Searched Children" style={{ marginBottom: "20px" }}>
              <Table
                dataSource={searchedChildren}
                columns={[
                  { title: "Child Name", dataIndex: "childName", key: "childName" },
                  { title: "Parent Name", dataIndex: "parentName", key: "parentName" },
                  { title: "Parent Phone", dataIndex: "parentPhone", key: "parentPhone" },
                  {
                    title: "Not Completed Supplements",
                    dataIndex: "notCompletedSupplements",
                    key: "notCompletedSupplements",
                    render: (supplements) =>
                      supplements.length > 0 ? supplements.join(", ") : "None",
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (_, record) => (
                      <Button
                        type="primary"
                        onClick={() => {
                          setSelectedParent(record);
                          setMessageModalVisible(true);
                        }}
                      >
                        Send Message
                      </Button>
                    ),
                  },
                ]}
                rowKey={(record) => record.childId}
                pagination={{ pageSize: 5 }}
                bordered
              />
            </Card>
          )}

          {Object.entries(categorizedChildren).map(([category, data]) => (
            <div key={category}>{renderTable(category, [...data.completed, ...data.notCompleted])}</div>
          ))}
        </TabPane>

        <TabPane tab="Messages sent to Parents" key="2">
          <Card title="Sent Messages">
            <Table
              dataSource={ashaMessages}
              columns={[
                { title: "Parent Name", dataIndex: "parentName", key: "parentName" },
                { title: "Phone", dataIndex: "parentPhone", key: "parentPhone" },
                { title: "Message", dataIndex: "messages", key: "messages" },
                { title: "Sent At", dataIndex: "sentAt", key: "sentAt" },
              ]}
              rowKey={(record) => record._id}
              pagination={{ pageSize: 5 }}
              bordered
            />
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title="Send Messages to Parent"
        visible={messageModalVisible}
        onCancel={() => setMessageModalVisible(false)}
        onOk={sendMessage}
      >
        <p>
          Sending message to: <strong>{selectedParent?.parentName}</strong>
        </p>
        <Input.TextArea
          rows={4}
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Type your message..."
        />
      </Modal>
    </div>
  );
};

export default AshaEligibleChildren;
