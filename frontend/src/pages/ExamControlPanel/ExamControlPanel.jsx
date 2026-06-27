import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import Navbar from "../../components/Navbar/Navbar";
import "./ExamControlPanel.css";

const ExamControlPanel = () => {
  const { id } = useParams();

  const [exam, setExam] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(""); // Track loading errors

  // 1. Wrapped in useCallback and added error handling + tokens
  const fetchExam = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/exam/code/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExam(res.data.exam);
    } catch (err) {
      console.error(err);
      setError("Failed to load exam details. Please check if the exam exists.");
    }
  }, [id]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/submission/leaderboard/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaderboard(res.data.results || []);
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
      // Not setting error state here so the page still loads even if the leaderboard fails
    }
  }, [id]);

  useEffect(() => {
    fetchExam();
    fetchLeaderboard();
  }, [fetchExam, fetchLeaderboard]);

  // ---------------- START EXAM ----------------
  const startExam = async () => {
    try {
      const token = localStorage.getItem("token");
      // Added empty {} for the body since axios expects (url, data, config) for POST
      await api.post(
        `/exam/start/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert("Exam Started Successfully");
      fetchExam(); // Refresh UI
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to start exam.");
    }
  };

  // ---------------- PUBLISH RESULT ----------------
  const publishResult = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        `/exam/publish/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert("Result Published Successfully");
      fetchExam(); // Refresh UI
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to publish result.");
    }
  };

  // Handle error and loading states
  if (error)
    return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>{error}</h2>;
  if (!exam)
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</h2>
    );

  return (
    <>
      <h1 style={{ color: "blue" }}>ExamControlPanel Page</h1>
      <Navbar />

      <div className="control">
        {/* EXAM INFO */}
        <div className="box">
          <h2>{exam.title}</h2>

          <p>
            <b>Code:</b> {exam.code}
          </p>
          <p>
            <b>Status:</b>{" "}
            <span style={{ textTransform: "capitalize" }}>{exam.status}</span>
          </p>
          <p>
            <b>Duration:</b> {exam.duration} min
          </p>

          {/* BUTTONS */}
          <div className="btns">
            {/* START BUTTON */}
            <button
              onClick={startExam}
              disabled={exam.status !== "waiting"}
              className={exam.status !== "waiting" ? "disabled" : "start"}
            >
              Start Exam
            </button>

            {/* PUBLISH BUTTON */}
            <button
              onClick={publishResult}
              disabled={exam.status !== "ended"}
              className={exam.status !== "ended" ? "disabled" : "publish"}
            >
              Publish Result
            </button>
          </div>
        </div>

        {/* LEADERBOARD */}
        <div className="box">
          <h3>Leaderboard</h3>

          {leaderboard.length === 0 ? (
            <p>No Results Yet</p>
          ) : (
            leaderboard.map((s, i) => (
              <div key={i} className="row">
                <span>{i + 1}</span>
                <div>
                  <p>{s.studentName}</p>
                  <p>
                    {s.score} / {s.totalMarks}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ExamControlPanel;
