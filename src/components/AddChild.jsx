import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaTint, FaVenusMars, FaArrowLeft } from "react-icons/fa";

const AddChild = () => {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        gender: "",
        bloodgroup: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const validateDOB = (dob) => {
        const birthYear = new Date(dob).getFullYear();
        return birthYear >= 2010;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "dob") {
            if (!validateDOB(value)) {
                setError("Child's birth year must be from 2010 onwards.");
            } else {
                setError("");
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!validateDOB(formData.dob)) {
            setError("Child's birth year must be from 2010 onwards.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post("http://localhost:8080/add-child", formData, {
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
            });

            setMessage(response.data.status);
            setFormData({ name: "", dob: "", gender: "", bloodgroup: "" });
        } catch (err) {
            setError(err.response?.data?.status || "Error adding child");
        }
    };

    return (
        <div className="add-child-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="add-child-form"
            >
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">👶 Add Child</h2>

                {message && <p className="text-green-600 text-center font-semibold">{message}</p>}
                {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Child's Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FaVenusMars className="absolute left-3 top-3 text-gray-400" />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="input-field"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="relative">
                        <FaTint className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            name="bloodgroup"
                            placeholder="Blood Group (e.g., O+)"
                            value={formData.bloodgroup}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="submit-button"
                    >
                        ➕ Add Child
                    </motion.button>
                    <Link to="/parentdashboard" className="absolute bottom-6 left-6">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="back-button"
                >
                    <FaArrowLeft /> Back to Home
                </motion.button>
            </Link>
                </form>
            </motion.div>

            <style jsx>{`
                /* Background style */
                .add-child-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-image: url('https://www.cdc.gov/child-development/media/images/infant-with-yellow-shirt-smiling.png');
                    background-size: cover;
                    background-position: center;
                    padding: 2rem;
                }

                /* Add Child form container */
                .add-child-form {
                    background: rgba(255, 255, 255, 0.9);
                    padding: 2rem;
                    border-radius: 16px;
                    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                }

                /* Input fields */
                .input-field {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    margin-bottom: 16px;
                }

                .input-field:focus {
                    border-color: #4f46e5;
                    box-shadow: 0 0 10px rgba(79, 70, 229, 0.3);
                    outline: none;
                }

                /* Submit button */
                .submit-button {
                    width: 100%;
                    background: linear-gradient(to right, #4f46e5, #9333ea);
                    color: white;
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 18px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                }

                .submit-button:hover {
                    background: linear-gradient(to right, #4338ca, #7e22ce);
                    box-shadow: 0px 5px 15px rgba(79, 70, 229, 0.3);
                }

                /* Back button */
                .back-button {
                    background-color: #4f46e5;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 1rem;
                }

                .back-button:hover {
                    background-color: #4338ca;
                }
            `}</style>
        </div>
    );
};

export default AddChild;
