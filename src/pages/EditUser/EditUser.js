import { useState } from "react";
import axios from "axios";
import "./Edituser.css"

function EditUser({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState(user);
  const [successMessage, setSuccessMessage] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, formData);
      onUpdate(formData);
      setSuccessMessage("User updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="edit-user-modal">
      <div className="edit-user-container">
        <h3 className="edit-user-title">Edit User</h3>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="edit-user-form" onSubmit={handleSubmit}>
          <input className="edit-user-input" type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          <input className="edit-user-input" type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          <input className="edit-user-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <div className="edit-user-actions">
            <button className="update-button" type="submit">Update</button>
            <button className="cancel-button" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
