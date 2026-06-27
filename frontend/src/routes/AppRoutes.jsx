import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

import Dashboard from "../pages/Dashboard/Dashboard";
import CreateExam from "../pages/CreateExam/CreateExam";

import ProtectedRoute from "./ProtectedRoute";
import StudentJoin from "../pages/Student/StudentJoin";
import ExamDetails from "../pages/ExamDetails/ExamDetails";
import ExamControlPanel from "../pages/ExamControlPanel/ExamControlPanel";
import WaitingRoom from "../pages/WaitingRoom/WaitingRoom";
import Quiz from "../pages/Quiz/Quiz";
import Result from "../pages/Result/Result";
import Leaderboard from "../pages/LeaderBoard/LeaderBoard";
import LandingPage from "../pages/LandingPage/LandingPage";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/exam/control/:id" element={<ExamControlPanel />} />
        <Route path="/teacher" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/join" element={<StudentJoin />} />
        <Route path="/waiting/:id" element={<WaitingRoom />} />
        <Route path="/attempt/:id" element={<Quiz />} />
        <Route path="/exam/:id" element={<ExamDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/leaderboard/:id" element={<Leaderboard />} />
        <Route path="/result/:token" element={<Result />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-exam"
          element={
            <ProtectedRoute>
              <CreateExam />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
