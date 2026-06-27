import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* --- NAVBAR --- */}
      <nav className="landing-navbar">
        <div className="logo">
          Exam<span>Pro</span>
        </div>
        <div className="nav-links">
          <button className="login-btn" onClick={() => navigate("/teacher")}>
            Login
          </button>
          <button className="signup-btn" onClick={() => navigate("/join")}>
            join the exam
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="badge">✨ The #1 Platform for Online Exams</div>
          <h1 className="hero-title">
            Seamless Online Assessments, <br />
            <span className="gradient-text">Built for the Future.</span>
          </h1>
          <p className="hero-subtitle">
            Create, manage, and take exams securely from anywhere. Experience
            lightning-fast performance, real-time analytics, and a pro-level
            interface.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/signup")}>
              Signup as Teacher
            </button>
          </div>
        </div>
      </header>

      {/* --- FEATURES SECTION --- */}
      <section className="features-section">
        <h2>Why Choose ExamPro?</h2>
        <p className="section-desc">
          Everything you need to conduct flawless online examinations.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-box blue">📝</div>
            <h3>Easy Exam Creation</h3>
            <p>
              Draft multiple-choice questions, set timers, and organize exams in
              just a few clicks with our intuitive dashboard.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box green">🔒</div>
            <h3>Secure Testing</h3>
            <p>
              Full-screen mode, randomized questions, and secure submission
              protocols to prevent cheating and maintain integrity.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon-box purple">📊</div>
            <h3>Real-time Analytics</h3>
            <p>
              Get instant leaderboards, detailed student performance reports,
              and actionable insights right after the exam ends.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="landing-footer">
        <p>© 2026 ExamPro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
