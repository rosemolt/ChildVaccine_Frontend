import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8080/login", {
                username,
                password
            });

            const { token, role } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                if (role === "admin") {
                    navigate("/admindashboard");
                } else if (role === "doctor") {
                    navigate("/doctordashboard");
                } else if (role === "parent") {
                    navigate("/parentdashboard");
                }
            }
        } catch (err) {
            setError(err.response?.data?.status || "Login failed. Try again.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4">
            <Navbar />
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
                className="login-container"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back 👋</h2>
                
                {error && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-center mb-4 font-semibold"
                    >
                        {error}
                    </motion.p>
                )}

                <form onSubmit={handleLogin} className="w-full flex flex-col items-center space-y-4">
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                {/* Register Link for Parents */}
                <div className="text-center mt-4 w-full flex flex-col items-center">
                    <p className="text-gray-700">
                        New to the system?  
                    </p>
                    <button 
                        onClick={() => navigate("/register")}
                        className="register-link"
                    >
                        Register as a Parent
                    </button>
                </div>
            </motion.div>
            <style jsx>{`
                /* Apply a background image */
                body {
                    margin: 0;
                    padding-top: 60px; /* Add padding to avoid overlapping with navbar */
                    font-family: 'Poppins', sans-serif;
                    background-image: url('https://www.unicef.org/sites/default/files/styles/media_large_image/public/UNI408835.jpg.webp?itok=gqrnI2qJ'); /* Replace with your actual image path */
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }

                /* Login container */
                .login-container {
                    background: rgba(255, 255, 255, 0.9); /* Semi-transparent background for better visibility */
                    padding: 2rem;
                    border-radius: 16px;
                    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
                    max-width: 400px;
                    width: 100%;
                    text-align: center;
                    animation: fadeIn 0.5s ease-in-out;
                }

                /* Input fields */
                .input-field {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    margin-bottom: 16px; /* Add space below input fields */
                }

                .input-field:focus {
                    border-color: #4f46e5;
                    box-shadow: 0 0 10px rgba(79, 70, 229, 0.3);
                    outline: none;
                }

                /* Button styling */
                .login-button {
                    width: 100%;
                    background: linear-gradient(to right, #4f46e5, #9333ea);
                    color: white;
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 18px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    margin-top: 10px; /* Add space between password field and login button */
                }

                .login-button:hover {
                    background: linear-gradient(to right, #4338ca, #7e22ce);
                    box-shadow: 0px 5px 15px rgba(79, 70, 229, 0.3);
                }

                /* Register link */
                .register-link {
                    margin-top: 1rem;
                    color: #4f46e5;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .register-link:hover {
                    text-decoration: underline;
                    color: #312e81;
                }

                /* Fade-in animation */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Ensure navbar is properly spaced */
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 15px 0;
                    z-index: 1000; /* Ensure it stays on top */
                }

            `}</style>
        </div>
    );
};

export default Login;
