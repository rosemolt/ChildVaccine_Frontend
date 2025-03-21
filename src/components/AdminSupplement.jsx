import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSupplement = () => {
  const [supplements, setSupplements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Vaccine"); // Default to Vaccine
  const [editData, setEditData] = useState(null);
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

  useEffect(() => {
    fetchSupplements(selectedCategory);
  }, [selectedCategory]);

  const handleEditClick = (supplement) => {
    setEditData(supplement);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/editSupplement/${editData.supplementid}`, editData, {
        headers: { Authorization: `${token}` },
      });
      alert("Supplement updated successfully");
      setEditData(null);
      fetchSupplements(selectedCategory);
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
    <div className="admin-container">
      <h2>Admin - Manage Supplements</h2>

      <label className="category-label">Select Category:</label>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="category-select">
        <option value="Vaccine">Vaccine</option>
        <option value="Polio">Polio</option>
        <option value="Vitamins">Vitamins</option>
      </select>

      <table className="supplement-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Age Group</th>
            <th>Dosage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplements.map((supplement) => (
            <tr key={supplement.supplementid}>
              {editData && editData.supplementid === supplement.supplementid ? (
                <>
                  <td><input type="text" name="name" value={editData.name} onChange={handleChange} /></td>
                  <td>
                    <select name="category" value={editData.category} onChange={handleChange}>
                      <option value="Vaccine">Vaccine</option>
                      <option value="Polio">Polio</option>
                      <option value="Vitamins">Vitamins</option>
                    </select>
                  </td>
                  <td><input type="text" name="agegroup" value={editData.agegroup} onChange={handleChange} /></td>
                  <td><input type="text" name="dosage" value={editData.dosage} onChange={handleChange} /></td>
                  <td>
                    <button className="save-btn" onClick={handleEditSubmit}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditData(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{supplement.name}</td>
                  <td>{supplement.category}</td>
                  <td>{supplement.agegroup}</td>
                  <td>{supplement.dosage}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditClick(supplement)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(supplement.supplementid)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .admin-container {
          max-width: 900px;
          margin: auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
          font-size: 24px;
        }

        .category-label {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 5px;
          display: block;
        }

        .category-select {
          width: 100%;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
          margin-bottom: 15px;
        }

        .supplement-table {
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
        }

        .supplement-table th, .supplement-table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: center;
        }

        .supplement-table th {
          background-color: #007bff;
          color: white;
        }

        .supplement-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .edit-btn, .delete-btn, .save-btn, .cancel-btn {
          padding: 8px 12px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          color: white;
          font-size: 14px;
          margin: 2px;
        }

        .edit-btn {
          background-color: #007bff;
        }

        .delete-btn {
          background-color: #dc3545;
        }

        .save-btn {
          background-color: #28a745;
        }

        .cancel-btn {
          background-color: #6c757d;
        }

        input, select {
          width: 100%;
          padding: 6px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default AdminSupplement;
