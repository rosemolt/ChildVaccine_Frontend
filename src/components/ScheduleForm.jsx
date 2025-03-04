import { useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaNotesMedical } from "react-icons/fa";

const ScheduleForm = () => {
    const [formData, setFormData] = useState({
        supplementType: "",
        supplementName: "",
        description: "",
        date: "",
        time: "",
        location: "",
        additionalNotes: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await axios.post("http://localhost:8080/schedule", formData);
            setMessage(response.data.status);
            setFormData({
                supplementType: "",
                supplementName: "",
                description: "",
                date: "",
                time: "",
                location: "",
                additionalNotes: "",
            });
        } catch (error) {
            setMessage(error.response?.data?.status || "Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 p-6">
            <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-200 max-w-lg w-full">
                <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-800 flex items-center justify-center gap-2 animate-fade-in">
                    <FaCalendarAlt /> Schedule Vaccination Slot
                </h2>

                {message && (
                    <div className="p-3 text-center bg-green-200 border border-green-500 text-green-900 rounded-md mb-4 font-semibold animate-fade-in">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-semibold text-gray-700">Supplement Type</label>
                        <select
                            name="supplementType"
                            value={formData.supplementType}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition duration-200 bg-white"
                        >
                            <option value="">Select Type</option>
                            <option value="Vaccine">💉 Vaccine</option>
                            <option value="Polio">🦠 Polio</option>
                            <option value="Vitamins">🍊 Vitamins</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Supplement Name</label>
                        <input
                            type="text"
                            name="supplementName"
                            value={formData.supplementName}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition duration-200"
                            placeholder="Enter supplement name..."
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition duration-200"
                            placeholder="Enter additional details..."
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 flex items-center gap-1">
                                <FaCalendarAlt /> Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition duration-200"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 flex items-center gap-1">
                                <FaClock /> Time
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition duration-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 flex items-center gap-1">
                            <FaMapMarkerAlt /> Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition duration-200"
                            placeholder="Enter location..."
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 flex items-center gap-1">
                            <FaNotesMedical /> Additional Notes
                        </label>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 transition duration-200"
                            placeholder="Enter additional notes..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                    >
                        ✅ Schedule Slot
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ScheduleForm;
