import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"

function Login() {
  const [user, setUser] = useState({ email: "eve.holt@reqres.in", password: "cityslicka" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!user.email || !user.password) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(user.email)) {
      setError("Invalid email format");
      return;
    }

   

    try {
      const res = await axios.post("https://reqres.in/api/login", user);
      localStorage.setItem("token", res.data.token);
      navigate("/users");
    } catch (error) {
      if (error.res) {
        setError(error.res.data.error || "Invalid credentials");
      } else {
        setError("Network Error");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
