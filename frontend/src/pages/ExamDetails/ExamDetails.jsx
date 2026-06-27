import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Navbar from "../../components/Navbar/Navbar";
import "./ExamDetails.css";
import { Navigate } from "react-router-dom";
const ExamDetails = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  //   const [leaderboard,setLeaderboard] = useState([]);
  //   const fetchResults = async () => {
  //   const res = await api.get(`/submission/leaderboard/${id}`);
  //   setLeaderboard(res.data.leaderboard);
  // };
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOption: 0,
    marks: 1,
  });

  function leaderboardHandler() {
    navigate("/leaderboard/:examId");
  }
  // ---------------- FETCH EXAM ----------------
  const fetchExam = async () => {
    try {
      // const token = localStorage.getItem("token");
      const res = await api.get(`/exam/code/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExam(res.data.exam);
      console.log("Response:", res.data);
      setExam(res.data.exam);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- FETCH QUESTIONS ----------------
  const fetchQuestions = async () => {
    const res = await api.get(`/question/exam/${id}`);
    setQuestions(res.data.questions || []);
  };

  // ---------------- FETCH RESULTS ----------------
  const fetchResults = async () => {
    try {
      const res = await api.get(`/submission/leaderboard/${id}`);
      console.log(res.data.leaderboard);
      console.log(res.data.leaderboard[0].studentId.name);
      setResults(res.data.leaderboard ?? []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchExam();
    fetchQuestions();
    fetchResults();
  }, [id]);

  // ---------------- ADD QUESTION ----------------
  const addQuestion = async (e) => {
    e.preventDefault();
    await api.post(
      "/question/add",
      {
        examId: id,
        ...formData,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctOption: 0,
      marks: 1,
    });

    fetchQuestions();
  };

  // ---------------- DELETE QUESTION ----------------
  const deleteQuestion = async (qid) => {
    // const token = localStorage.getItem("token");

    await api.delete(`/question/${qid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchQuestions();
  };

  // ---------------- START EXAM ----------------
  const startExam = async () => {
    // const token = localStorage.getItem("token");

    await api.post(
      `/exam/start/${id}`,
      {}, // body (empty)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchExam();
  };

  // ---------------- END EXAM ----------------
  const endExam = async () => {
    await api.post(
      `/exam/end/${id}`,
      {}, // body (empty)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    fetchExam();
  };

  // ---------------- PUBLISH RESULT ----------------
  const publishResult = async () => {
    await api.post(
      `/exam/publish/${id}`,
      {}, // body (empty)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    alert("Result Published");
    fetchExam();
  };

  return (
    <>
      <Navbar />

      <div className="exam-details">
        {/* EXAM INFO */}
        {exam && (
          <div className="exam-info">
            <h2>{exam.title}</h2>

            <p>
              <b>Code:</b> {exam.code}
            </p>
            <p>
              <b>Status:</b> {exam.status}
            </p>

            <div className="btn-group">
              <button onClick={startExam}>Start</button>
              <button onClick={endExam}>End</button>
              <button onClick={publishResult}>Publish Result</button>
            </div>
          </div>
        )}

        {/* ADD QUESTION */}
        <div className="question-form">
          <h3>Add Question</h3>

          <form onSubmit={addQuestion}>
            <input
              placeholder="Question"
              value={formData.question}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  question: e.target.value,
                })
              }
              required
            />

            {formData.options.map((opt, i) => (
              <input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOpt = [...formData.options];
                  newOpt[i] = e.target.value;

                  setFormData({
                    ...formData,
                    options: newOpt,
                  });
                }}
                required
              />
            ))}

            <input
              type="number"
              placeholder="Correct Option (0-3)"
              value={formData.correctOption}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  correctOption: e.target.value,
                })
              }
            />

            <button>Add Question</button>
          </form>
        </div>

        {/* QUESTIONS */}
        <div className="question-list">
          <h3>Questions</h3>

          {questions.map((q) => (
            <div key={q._id} className="question-card">
              <p>
                <b>{q.question}</b>
              </p>

              <ul>
                {q.options.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>

              <button
                className="delete-btn"
                onClick={() => deleteQuestion(q._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* RESULTS DASHBOARD */}
        <div className="result-dashboard">
          <h3>Results</h3>
          <button onClick={leaderboardHandler}>Check LeaderBoard</button>
        </div>
      </div>
    </>
  );
};

export default ExamDetails;
