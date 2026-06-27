import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await api.post("/auth/signup", formData);

      alert("Signup Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-btn"
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        <h2>Create Account 🚀</h2>

        <p className="subtitle">Join ExamPro as a Teacher</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit" className="signup-btnT">
          Sign Up
        </button>

        <p>
          Already have an account?
          <Link to="/teacher"> Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
