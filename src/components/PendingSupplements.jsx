import { useEffect, useState } from "react";
import axios from "axios";

const PendingSupplements = ({ setSelectedOption, setScheduleData }) => {
    const [pendingSupplements, setPendingSupplements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingSupplements = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/pending-supplements", {
                    headers: { Authorization: `${token}` }
                });
                setPendingSupplements(response.data);
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchPendingSupplements();
    }, []);

    const handleSchedule = (childid, name) => {
        setScheduleData({ childid, name });
        setSelectedOption("schedule");
    };

    if (loading) return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-700">Loading...</div>;
    if (error) return <div className="text-center text-red-600 font-semibold mt-5">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold text-center text-blue-700 mb-8 uppercase tracking-wide drop-shadow-lg">
                    Pending Supplements
                </h1>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-2xl rounded-lg border border-gray-200">
                        <thead>
                            <tr className="bg-blue-700 text-Black text-lg">
                                <th className="p-4 text-left border border-gray-300">Child Name</th>
                                <th className="p-4 text-left border border-gray-300">Age Group</th>
                                <th className="p-4 text-left border border-gray-300">Pending Supplements</th>
                                <th className="p-4 text-center border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingSupplements.map((child) => (
                                <tr key={child.childid} className="border-b bg-gray-50 hover:bg-blue-100 transition-all">
                                    <td className="p-4 border border-gray-300 text-gray-800 font-medium">{child.name}</td>
                                    <td className="p-4 border border-gray-300 text-gray-800 font-medium">{child.agegroup}</td>
                                    <td className="p-4 border border-gray-300">
                                        {child.pendingSupplements.map((supp, index) => (
                                            <span
                                                key={index}
                                                className="text-sm font-semibold text-gray-700 bg-blue-200 px-2 py-1 rounded-lg inline-block m-1 shadow-sm"
                                            >
                                                {supp.name} ({supp.category})
                                            </span>
                                        ))}
                                    </td>
                                    <td className="p-4 text-center border border-gray-300">
                                        <button
                                            onClick={() => handleSchedule(child.childid, child.name)}
                                            className="bg-green-600 hover:bg-green-700 text-Black text-lg px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105 font-semibold"
                                        >
                                            Schedule
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PendingSupplements;
