import React, { useState } from "react";
import axios from "axios";

const AddSupplement = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vaccine");
  const [description, setDescription] = useState("");
  const [agegroup, setAgegroup] = useState("");
  const [dosage, setDosage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Admin not logged in");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/addSupplement", 
        { name, category, description, agegroup, dosage },
        { headers: { Authorization: `${token}` } }
      );
      setMessage(response.data.message);
      setShowPopup(true);
      setName("");
      setCategory("Vaccine");
      setDescription("");
      setAgegroup("");
      setDosage("");
    } catch (err) {
      setError(err.response ? err.response.data.message : "Error adding supplement");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setMessage("");
  };

  return (
    <div className="add-supplement">
      <button className="back-button" onClick={() => window.history.back()}>Back to Admin Dashboard</button>
      <h2>Add Supplement</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="Vaccine">Vaccine</option>
            <option value="Polio">Polio</option>
            <option value="Vitamins">Vitamins</option>
          </select>
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Age Group</label>
          <input type="text" value={agegroup} onChange={(e) => setAgegroup(e.target.value)} required />
        </div>
        <div>
          <label>Dosage</label>
          <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} required />
        </div>
        <button type="submit">Add Supplement</button>
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{message}</p>
            <button onClick={closePopup}>OK</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .add-supplement {
          width: 60%;
          margin: 0 auto;
          padding: 30px;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          background-color: #fafafa;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .back-button, button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .back-button { background-color: #007bff; color: white; }
        .back-button:hover { background-color: #0056b3; }
        .add-supplement h2 { text-align: center; }
        .add-supplement div { margin-bottom: 20px; }
        .add-supplement label { display: block; font-weight: bold; margin-bottom: 8px; }
        .add-supplement input, .add-supplement select, .add-supplement textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .add-supplement button { background-color: #4caf50; color: white; }
        .add-supplement button:hover { background-color: #45a049; }
        .popup {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .popup-content button {
          background: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          margin-top: 10px;
        }
        .popup-content button:hover { background: #0056b3; }
      `}</style>
    </div>
  );
};

export default AddSupplement;
