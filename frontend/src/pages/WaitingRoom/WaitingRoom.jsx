import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./WaitingRoom.css";

const WaitingRoom = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExam();

    const interval = setInterval(() => {
      fetchExam();
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  const fetchExam = async () => {
    try {
      const res = await api.get(`/exam/code/${id}`);
      setExam(res.data.exam);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="waiting-room">
      <div className="waiting-card">
        <h1>{exam.title}</h1>

        <div className="exam-info">
          <p>
            <strong>Exam Code:</strong> {exam.code}
          </p>
          <p>
            <strong>Status:</strong> {exam.status.toUpperCase()}
          </p>
        </div>

        <div className="instructions">
          <h3>📋 Examination Instructions</h3>

          <ul>
            <li>Read every question carefully before answering.</li>
            <li>Do not refresh or close the browser during the exam.</li>
            <li>Ensure you have a stable internet connection.</li>
            <li>Each question should be answered before the exam ends.</li>
            <li>Once the exam is submitted, it cannot be reopened.</li>
            <li>Do not use unfair means or switch browser tabs.</li>
            <li>Keep sufficient battery backup if using a laptop.</li>
            <li>
              Click <strong>Attempt Exam</strong> only when instructed by your
              teacher.
            </li>
          </ul>
        </div>

        {exam.status === "waiting" && (
          <div className="status-box waiting">
            <h2>⏳ Waiting for Teacher</h2>
            <p>
              The exam has not started yet. This page will refresh
              automatically.
            </p>
          </div>
        )}

        {exam.status === "started" && (
          <div className="status-box started">
            <h2>✅ Exam Started</h2>

            <button
              className="attempt-btn"
              onClick={() => navigate(`/attempt/${id}`)}
            >
              Attempt Exam
            </button>
          </div>
        )}

        {exam.status === "ended" && (
          <div className="status-box ended">
            <h2>❌ Exam Ended</h2>
            <p>This examination is no longer available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitingRoom;
