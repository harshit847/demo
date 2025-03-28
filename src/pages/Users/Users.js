import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditUser from "../EditUser/EditUser";
import "./User.css"

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(res.data.data);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      setSuccessMessage("User deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h2 className="users-title">Users List</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        {successMessage && <p className="success-message">{successMessage}</p>}

      </div>

      <div className="users-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img className="user-avatar" src={user.avatar} alt={user.first_name} />
            <p className="user-name">{user.first_name} {user.last_name}</p>
            <div className="user-actions">
              <button className="edit-button" onClick={() => setEditingUser(user)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-button" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button className="pagination-button" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {editingUser && (
        <EditUser
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default Users;
