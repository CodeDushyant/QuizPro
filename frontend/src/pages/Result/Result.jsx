import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Result.css";

const Result = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [examId, setExamId] = useState("");
  const [loading, setLoading] = useState(true);

  const studentToken = localStorage.getItem("studentToken");

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      const res = await api.get(`/submission/result/${studentToken}`);

      setResult(res.data.result);
      setExamId(res.data.examId);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const leaderboardHandler = () => {
    navigate(`/leaderboard/${examId}`);
  };

  if (loading) return <h2>Loading Result...</h2>;

  if (!result) return <h2>No Result Found</h2>;

  return (
    <div className="result-container">
      <div className="result-card">
        <h1>🎯 Exam Result</h1>

        <p>
          <b>Score:</b> {result.score} / {result.totalMarks}
        </p>

        <p>
          <b>Status:</b>{" "}
          {result.score >= result.totalMarks / 2 ? "✅ Pass" : "❌ Fail"}
        </p>

        <p>
          <b>Submitted At:</b> {new Date(result.submittedAt).toLocaleString()}
        </p>

        <button onClick={leaderboardHandler}>Check Leaderboard</button>
      </div>
    </div>
  );
};

export default Result;
