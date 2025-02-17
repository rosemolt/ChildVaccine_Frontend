import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ParentHome from "./ParentHome";
import ParentSidebar from "./ParentSidebar";

const ParentDashboard = () => {
    const [parent, setParent] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ name: "", address: "", phoneno: "", email: "" });
    const [loading, setLoading] = useState(true);
    const [viewProfile, setViewProfile] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/viewParentProfile", {
                    headers: { token }
                });
                setParent(response.data.parent);
                setFormData(response.data.parent);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error.response?.data || error.message);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8080/updateParentProfile", formData, {
                headers: { token }
            });
            setParent(formData);
            setEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message);
        }
    };

    const onLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={dashboardContainerStyle}>
            <ParentSidebar setViewProfile={setViewProfile} />  {/* Pass setViewProfile here */}
            <div style={dashboardContentStyle}>
                <Navbar parent={parent} onLogout={onLogout} />

                {!viewProfile ? (
                    <>
                        <ParentHome />
                    </>
                ) : (
                    <div style={profileContainerStyle}>
                        <h2 style={profileHeadingStyle}>Parent Profile</h2>
                        <div style={profileCardStyle}>
                            {editing ? (
                                <div style={formContainerStyle}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="form-control mb-2"
                                        style={inputStyle}
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="form-control mb-2"
                                        style={inputStyle}
                                    />
                                    <input
                                        type="text"
                                        name="phoneno"
                                        value={formData.phoneno}
                                        onChange={handleChange}
                                        className="form-control mb-2"
                                        style={inputStyle}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-control mb-2"
                                        style={inputStyle}
                                    />
                                    <div style={buttonContainerStyle}>
                                        <button className="btn btn-success" onClick={handleSave} style={saveButtonStyle}>
                                            Save
                                        </button>
                                        <button className="btn btn-secondary ms-2" onClick={() => setEditing(false)} style={cancelButtonStyle}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p><strong>Name:</strong> {parent.name}</p>
                                    <p><strong>Address:</strong> {parent.address}</p>
                                    <p><strong>Phone:</strong> {parent.phoneno}</p>
                                    <p><strong>Email:</strong> {parent.email}</p>
                                    <div style={buttonContainerStyle}>
                                        <button className="btn btn-warning" onClick={handleEdit} style={editButtonStyle}>
                                            Edit Profile
                                        </button>
                                        <button className="btn btn-secondary ms-2" onClick={() => setViewProfile(false)} style={backButtonStyle}>
                                            Back to Home
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Styles
const dashboardContainerStyle = {
    display: "flex",
    backgroundColor: "#f8f9fa",
    height: "100vh",
};

const dashboardContentStyle = {
    marginLeft: "250px",
    padding: "30px",
    flexGrow: 1,
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const profileContainerStyle = {
    padding: "20px",
    textAlign: "center",
};

const profileHeadingStyle = {
    fontSize: "2rem",
    color: "#00796b",
    marginBottom: "20px",
};

const profileCardStyle = {
    backgroundColor: "#f1f8e9",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const formContainerStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    width: "100%",
    boxSizing: "border-box",
};

const buttonContainerStyle = {
    marginTop: "20px",
};

const saveButtonStyle = {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
};

const cancelButtonStyle = {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
};

const editButtonStyle = {
    backgroundColor: "#ff9800",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
};

const backButtonStyle = {
    backgroundColor: "#607d8b",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
};

export default ParentDashboard;
