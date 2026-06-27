import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-btn"
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue</p>

        <div className="input-box">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-btnT">
          Login
        </button>

        <p>
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
