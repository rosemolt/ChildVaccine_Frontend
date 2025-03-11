import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSupplement = () => {
  const [supplements, setSupplements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Vaccine"); // Default to Vaccine
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [editData, setEditData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Function to fetch supplements based on selected category
  const fetchSupplements = async (category) => {
    try {
      const response = await axios.get(`http://localhost:8080/supplements/${category}`, {
        headers: { Authorization: `${token}` },
      });
      setSupplements(response.data);
    } catch (error) {
      console.error("Error fetching supplements:", error);
    }
  };

  // Fetch supplements when category changes
  useEffect(() => {
    fetchSupplements(selectedCategory);
  }, [selectedCategory]);

  const handleEditClick = (supplement) => {
    setSelectedSupplement(supplement);
    setEditData(supplement);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/editSupplement/${selectedSupplement.supplementid}`, editData, {
        headers: { Authorization: `${token}` },
      });
      alert("Supplement updated successfully");
      setModalOpen(false);
      fetchSupplements(selectedCategory); // Refresh the list after update
    } catch (error) {
      console.error("Error updating supplement:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplement?")) return;

    try {
      await axios.delete(`http://localhost:8080/deleteSupplement/${id}`, {
        headers: { Authorization: `${token}` },
      });
      alert("Supplement deleted successfully");
      setSupplements(supplements.filter((s) => s.supplementid !== id));
    } catch (error) {
      console.error("Error deleting supplement:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Back to Dashboard Button */}
      {/* <button 
        className="bg-gray-600 hover:bg-gray-700 text-black px-4 py-2 mb-4 rounded transition duration-200"
        onClick={() => navigate("/admindashboard")}
      >
        ⬅ Back to Dashboard
      </button> */}

      <h2 className="text-2xl font-bold mb-4">Admin - Manage Supplements</h2>

      {/* Category Selection Dropdown */}
      <label className="block mb-2 text-lg font-semibold">Select Category:</label>
      <select 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 mb-4 rounded"
      >
        <option value="Vaccine">Vaccine</option>
        <option value="Polio">Polio</option>
        <option value="Vitamins">Vitamins</option>
      </select>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Age Group</th>
            <th className="p-2 border">Dosage</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplements.map((supplement) => (
            <tr key={supplement.supplementid} className="border">
              <td className="p-2 border">{supplement.name}</td>
              <td className="p-2 border">{supplement.category}</td>
              <td className="p-2 border">{supplement.agegroup}</td>
              <td className="p-2 border">{supplement.dosage}</td>
              <td className="p-2 border">
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-200 mr-2" 
                  onClick={() => handleEditClick(supplement)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200" 
                  onClick={() => handleDelete(supplement.supplementid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-3">Edit Supplement</h3>
            <label className="block mb-2">
              Name:
              <input 
                type="text" 
                name="name" 
                value={editData.name} 
                onChange={handleChange} 
                className="border p-2 w-full rounded"
              />
            </label>
            <label className="block mb-2">
              Category:
              <select 
                name="category" 
                value={editData.category} 
                onChange={handleChange} 
                className="border p-2 w-full rounded"
              >
                <option value="Vaccine">Vaccine</option>
                <option value="Polio">Polio</option>
                <option value="Vitamins">Vitamins</option>
              </select>
            </label>
            <label className="block mb-2">
              Age Group:
              <input 
                type="text" 
                name="agegroup" 
                value={editData.agegroup} 
                onChange={handleChange} 
                className="border p-2 w-full rounded"
              />
            </label>
            <label className="block mb-2">
              Dosage:
              <input 
                type="text" 
                name="dosage" 
                value={editData.dosage} 
                onChange={handleChange} 
                className="border p-2 w-full rounded"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200 mr-2"
                onClick={handleEditSubmit}
              >
                Save
              </button>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupplement;
