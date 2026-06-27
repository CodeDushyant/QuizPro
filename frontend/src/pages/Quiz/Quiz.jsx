import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Quiz.css";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  // Full screen state and ref
  const [isFullScreen, setIsFullScreen] = useState(false);
  const examRef = useRef(null);

  useEffect(() => {
    fetchQuestions();

    // Full screen change listener update karne ke liye
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get(`/question/exam/${id}`);
      setQuestions(res.data.questions);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOption = (index) => {
    const questionId = questions[current]._id;

    setAnswers((prev) => {
      const updated = { ...prev };

      if (updated[questionId] === index) {
        // Same option clicked again -> unselect
        delete updated[questionId];
      } else {
        // Select new option
        updated[questionId] = index;
      }

      return updated;
    });
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // FULL SCREEN HANDLER
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      examRef.current.requestFullscreen().catch((err) => {
        alert(`Error enabling full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const submitExam = async () => {
    try {
      const token = localStorage.getItem("studentToken");
      const formattedAnswers = Object.keys(answers).map((qid) => ({
        questionId: qid,
        selectedOption: answers[qid],
      }));

      await api.post(
        "/submission/submit",
        { studentToken: token, answers: formattedAnswers },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Agar submit karne pe full screen me hai toh exit kar do
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }

      alert("Exam Submitted Successfully");
      navigate(`/result/${token}`);
    } catch (err) {
      console.log(err);
      alert("Submission Failed");
    }
  };

  if (loading)
    return (
      <div className="loading-screen">
        <h2>Loading Exam...</h2>
      </div>
    );
  if (questions.length === 0)
    return (
      <div className="loading-screen">
        <h2>No Questions Found</h2>
      </div>
    );

  const q = questions[current];
  const total = questions.length;
  const attempted = Object.keys(answers).length;
  const left = total - attempted;
  const progressPercent = (attempted / total) * 100;

  return (
    // Yeh div full screen hoga
    <div className="exam-wrapper" ref={examRef}>
      {/* TOP HEADER FOR FULL SCREEN BUTTON */}
      <div className="exam-top-bar">
        <h2 className="exam-title">Online Examination</h2>
        <button className="fullscreen-btn" onClick={toggleFullScreen}>
          {isFullScreen ? "✖ Exit Full Screen" : "⛶ Full Screen"}
        </button>
      </div>

      <div className="quiz-container">
        {/* LEFT SIDE: QUESTION CARD (70%) */}
        <div className="quiz-card">
          <div className="question-headerT">
            <h2 className="Total-question">
              Question {current + 1} of {total}
            </h2>
          </div>

          <h3 className="question-text">{q.question}</h3>

          <div className="options-container">
            {q.options.map((option, index) => (
              <label
                key={index}
                className={`option-label ${answers[q._id] === index ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name={q._id}
                  checked={answers[q._id] === index}
                  onClick={() => handleOption(index)}
                  readOnly
                />
                <span className="custom-radio"></span>
                {option}
              </label>
            ))}
          </div>

          <div className="btn-group">
            <button
              className="btn-prev"
              onClick={prevQuestion}
              disabled={current === 0}
            >
              Previous
            </button>

            {current < questions.length - 1 ? (
              <button className="btn-next" onClick={nextQuestion}>
                Next
              </button>
            ) : (
              <button className="btn-submit" onClick={submitExam}>
                Submit
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: STATUS SIDEBAR (30%) */}
        <div className="exam-status-sidebar">
          <h3>Exam Summary</h3>

          <div className="stats-column">
            <div className="stat-row">
              <span>Total</span>
              <strong className="total-text">{total}</strong>
            </div>

            <div className="stat-row">
              <span>Attempted</span>
              <strong className="attempted-text">{attempted}</strong>
            </div>

            <div className="stat-row">
              <span>Left</span>
              <strong className="left-text">{left}</strong>
            </div>
          </div>

          <div className="progress-section">
            <p>
              Progress <span>{Math.round(progressPercent)}%</span>
            </p>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
