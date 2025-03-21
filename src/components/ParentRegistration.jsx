import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const ParentRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneno: "",
    ward:"",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phoneno.trim()) {
      newErrors.phoneno = "Phone number is required";
    } else if (!/^\+?[1-9]\d{9,14}$/.test(formData.phoneno)) {
      newErrors.phoneno = "Enter a valid phone number with country code (e.g., +911234567890)";
    }
    if (!formData.ward.trim()) newErrors.address = "Ward is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(formData.password))
      newErrors.password = "Password must be at least 8 characters, start with a capital letter, contain at least one digit and one special symbol";
    
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8080/registerParent", formData);
      setSuccessMessage(response.data.status);
      setErrors({});
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setErrors({ submit: err.response?.data.status || "Registration failed. Try again." });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <Navbar />
      <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Parent Registration</h2>
        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input type="text" name="name" placeholder="Name" className="input" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div>
            <input type="text" name="address" placeholder="Address" className="input" value={formData.address} onChange={handleChange} />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>

          <div>
            <input type="text" name="phoneno" placeholder="Phone Number" className="input" value={formData.phoneno} onChange={handleChange} />
            {errors.phoneno && <p className="error-text">{errors.phoneno}</p>}
          </div>

          <div>
            <input type="text" name="ward" placeholder="Ward" className="input" value={formData.ward} onChange={handleChange} />
            {errors.ward && <p className="error-text">{errors.ward}</p>}
          </div>

          <div>
            <input type="email" name="email" placeholder="Email" className="input" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div>
            <input type="password" name="password" placeholder="Password" className="input" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="btn">Register</button>
          {errors.submit && <p className="error-text">{errors.submit}</p>}
        </form>
        <p className="text-center mt-4">Already registered? <a href="/login" className="text-blue-500">Login here</a></p>
      </div>
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-bottom: 8px;
        }
        .btn {
          width: 100%;
          background: #4f46e5;
          color: white;
          padding: 12px;
          border-radius: 6px;
          font-size: 18px;
          cursor: pointer;
        }
        .btn:hover {
          background: #4338ca;
        }
        .error-text {
          color: red;
          font-size: 14px;
          margin-top: -6px;
        }
      `}</style>
    </div>
  );
};

export default ParentRegistration;