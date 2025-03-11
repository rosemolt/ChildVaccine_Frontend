import { useState, useEffect } from "react";
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
    const [supplements, setSupplements] = useState([]);

    useEffect(() => {
        const fetchSupplements = async () => {
            try {
                const token = localStorage.getItem("token"); // Ensure token is stored in local storage
                const response = await axios.get("http://localhost:8080/getSupplements", {
                    headers: { Authorization: `${token}` }, // Send token
                });
                setSupplements(response.data); 
            } catch (error) {
                console.error("Error fetching supplements:", error);
            }
        };
        fetchSupplements();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Automatically set the description when supplement name changes
        if (name === "supplementName") {
            const selectedSupplement = supplements.find(sup => sup.name === value);
            setFormData(prev => ({
                ...prev,
                description: selectedSupplement ? selectedSupplement.description : ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
    
        // Get current date and time
        const currentDateTime = new Date();
        const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    
        if (selectedDateTime < currentDateTime) {
            setMessage("Cannot schedule a slot in the past. Please select a future date and time.");
            return;
        }
    
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:8080/schedule", formData, {
                headers: { Authorization: `${token}` },
            });
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 p-6">
            <div className="bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-gray-200 max-w-lg w-full transition-transform duration-300 hover:scale-105">
                <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-900 flex items-center justify-center gap-2">
                    <FaCalendarAlt className="text-blue-700 animate-bounce" /> Schedule Vaccination Slot
                </h2>

                {message && (
                    <div className="p-3 text-center bg-green-200 border border-green-500 text-green-900 rounded-md mb-4 font-semibold animate-fade-in">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Supplement Type */}
                    <div>
                        <label className="block font-semibold text-gray-700">Supplement Type</label>
                        <select
                            name="supplementType"
                            value={formData.supplementType}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 bg-white transition-all duration-300 hover:bg-blue-100"
                        >
                            <option value="">🔽 Select Type</option>
                            <option value="Vaccine">💉 Vaccine</option>
                            <option value="Polio">🦠 Polio</option>
                            <option value="Vitamins">🍊 Vitamins</option>
                        </select>
                    </div>

                    {/* Supplement Name */}
                    <div>
                        <label className="block font-semibold text-gray-700">Supplement Name</label>
                        <select
                            name="supplementName"
                            value={formData.supplementName}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 bg-white transition-all duration-300 hover:bg-blue-100"
                        >
                            <option value="">🔽 Select Supplement</option>
                            {supplements
                                .filter(sup => sup.category === formData.supplementType) // Filter based on type
                                .map(sup => (
                                    <option key={sup.supplementid} value={sup.name}>
                                        {sup.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Description (Auto-filled) */}
                    <div>
                        <label className="block font-semibold text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 bg-gray-200 transition-all duration-300"
                            placeholder="Auto-filled description..."
                        ></textarea>
                    </div>

                    {/* Date & Time */}
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
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 transition-all duration-300 hover:bg-blue-100"
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
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 transition-all duration-300 hover:bg-blue-100"
                            />
                        </div>
                    </div>

                    {/* Location */}
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 transition-all duration-300 hover:bg-blue-100"
                            placeholder="Enter location..."
                        />
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <label className="block font-semibold text-gray-700 flex items-center gap-1">
                            <FaNotesMedical /> Additional Notes
                        </label>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 transition-all duration-300 hover:bg-blue-100"
                            placeholder="Enter additional notes..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
                    >
                        ✅ Schedule Slot
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ScheduleForm;
