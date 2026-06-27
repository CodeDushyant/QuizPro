import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/api";
import Navbar from "../../components/Navbar/Navbar";

import "./Dashboard.css";

const Dashboard = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadExams = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/exam/teacher", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Exam Response:", response.data);

        setExams(response.data.exams || []);
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    loadExams();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard">
          <h2>Loading Exams...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Teacher Dashboard</h1>

          <button
            className="create-btn"
            onClick={() => navigate("/create-exam")}
          >
            Create Exam
          </button>
        </div>

        {exams.length === 0 ? (
          <div className="no-exams">
            <h3>No Exams Found</h3>
          </div>
        ) : (
          <div className="exam-grid">
            {exams.map((exam) => (
              <div key={exam._id} className="exam-card">
                <h3>{exam.title}</h3>

                <p>
                  <strong>Code:</strong> {exam.code}
                </p>

                <p>
                  <strong>Status:</strong> {exam.status}
                </p>

                <p>
                  <strong>Duration:</strong> {exam.duration} min
                </p>

                <button
                  className="manage-btn"
                  onClick={() => {
                    localStorage.setItem("examId", exam._id);
                    navigate(`/exam/${exam._id}`);
                  }}
                >
                  Manage Exam
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
