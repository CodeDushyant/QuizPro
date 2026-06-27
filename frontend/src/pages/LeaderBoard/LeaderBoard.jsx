import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./LeaderBoard.css";

const Leaderboard = () => {
  const navigate = useNavigate();
  const examId = localStorage.getItem("examId");
  console.log(examId);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [examId]);

  const fetchResults = async () => {
    try {
      const res = await api.get(`/submission/leaderboard/${examId}`);
      console.log(res.data.leaderboard);

      setResults(res.data.leaderboard || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false); // ✅ Important
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      <button
        type="button"
        className="close-btnL"
        onClick={() => navigate("/")}
      >
        ✕
      </button>
      {results.length === 0 ? (
        <p className="no-data">No submissions yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student Name</th>
                <th>Score</th>
                <th>Total Marks</th>
                <th>Submitted At</th>
              </tr>
            </thead>

            <tbody>
              {results.map((r, i) => (
                <tr key={i} className={`rank-${i + 1}`}>
                  <td>
                    <span className="rank-badge">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                    </span>
                  </td>
                  <td className="student-name">
                    {r.studentId?.name || "Unknown"}
                  </td>
                  <td className="score-highlight">{r.score}</td>
                  <td>{r.totalMarks}</td>
                  <td className="date-text">
                    {/* Assuming you have a date field like createdAt or submittedAt */}
                    {r.submittedAt
                      ? new Date(r.submittedAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
