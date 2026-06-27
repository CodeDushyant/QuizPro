import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./StudentJoin.css";

const StudentJoin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
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
      const response = await api.post("/student/join", formData);

      // student token save
      localStorage.setItem("studentToken", response.data.token);

      localStorage.setItem("studentName", formData.name);

      localStorage.setItem("examCode", formData.code);
      localStorage.setItem("examId", response.data.exam._id);

      alert("Joined Successfully");

      // waiting room or exam page
      navigate(`/waiting/${response.data.exam._id}`);
    } catch (error) {
      alert(error.response?.data?.message || "Join Failed");
    }
  };

  return (
    <div className="join-container">
     <form className="join-form" onSubmit={handleSubmit}>
  <button
    type="button"
    className="close-btn"
    onClick={() => navigate("/")}
  >
    ✕
  </button>

  <h2>Join Exam 🎓</h2>

  <p className="subtitle">
    Enter your details to join the exam
  </p>

  <input
    type="text"
    name="name"
    placeholder="Enter Your Name"
    value={formData.name}
    onChange={handleChange}
    required
  />

  <input
    type="text"
    name="code"
    placeholder="Enter Exam Code"
    value={formData.code}
    onChange={handleChange}
    required
  />

  <button type="submit" className="join-btnT">
    Join Exam
  </button>
</form>
    </div>
  );
};

export default StudentJoin;
