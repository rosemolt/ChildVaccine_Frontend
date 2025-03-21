import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AshaWorkerRegistration = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phoneno: "",
        ward: "",
        email: "",
        password: "",
        verification_doc: null
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        if (!formData.name.trim() || !formData.address.trim() || !formData.ward.trim()) {
            setError("All fields are required");
            return false;
        }
        if (!/^[0-9]{10}$/.test(formData.phoneno)) {
            setError("Phone number must be 10 digits");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Invalid email format");
            return false;
        }
        if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(formData.password)) {
            setError("Password must contain at least 8 characters, including a letter, a number, and a symbol");
            return false;
        }
        if (!formData.verification_doc) {
            setError("Verification document is required");
            return false;
        }
        setError("");
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, verification_doc: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        
        if (!validateForm()) return;
        
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await axios.post("http://localhost:8080/registerAsha", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            
            setSuccess(response.data.status);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.status || "Registration failed. Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
            <Navbar />
            <div className="container">
                <h2>Asha Worker Registration</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                    
                    <label>Phone Number:</label>
                    <input type="text" name="phoneno" value={formData.phoneno} onChange={handleChange} required />
                    
                    <label>Ward:</label>
                    <input type="text" name="ward" value={formData.ward} onChange={handleChange} required />
                    
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    
                    <label>Upload Verification Document:</label>
                    <input type="file" name="verification_doc" onChange={handleFileChange} required />
                    
                    <button type="submit">Register</button>
                </form>
                <p className="text-center mt-4">Already registered? <a href="/login" className="text-blue-500">Login here</a></p>
            </div>
        </div>
    );
};

export default AshaWorkerRegistration;