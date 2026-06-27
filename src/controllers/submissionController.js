const Submission = require("../models/Submission");
const Student = require("../models/Student");
const Exam = require("../models/Exam");
const calculateScore = require("../utils/calculateScore");

const submitExam = async (req, res) => {
  try {
    const { studentToken, answers } = req.body;

    const student = await Student.findOne({
      studentToken,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    const exam = await Exam.findById(student.examId);

    const submissions = await Submission.find({
      examId: exam._id,
    })
      .populate("studentId", "name")
      .sort({ score: -1 });

    console.log(submissions);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
    }

    const existingSubmission = await Submission.findOne({
      studentId: student._id,
      examId: exam._id,
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "Already Submitted",
      });
    }

    const result = await calculateScore(exam._id, answers);

    const submission = await Submission.create({
      examId: exam._id,
      studentId: student._id,
      answers,
      score: result.score,
      totalMarks: result.totalMarks,
      submitted: true,
      submittedAt: new Date(),
    });

    const io = req.app.get("io");

    if (io) {
      io.to(exam.code).emit("submissionReceived", {
        studentId: student._id,
        score: submission.score,
      });
    }

    return res.status(201).json({
      success: true,
      submission,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getResult = async (req, res) => {
  try {
    const { token } = req.params;

    const student = await Student.findOne({
      studentToken: token,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    const exam = await Exam.findById(student.examId);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
    }

    if (!exam.resultPublished) {
      return res.status(403).json({
        success: false,
        message: "Result Not Published Yet",
      });
    }

    const result = await Submission.findOne({
      studentId: student._id,
      examId: exam._id,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Submission Not Found",
      });
    }

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const leaderboard = async (req, res) => {
  try {
    const { examId } = req.params;
    console.log(examId);

    const submissions = await Submission.find({
      examId,
    })
      .populate("studentId", "name")
      .sort({
        score: -1,
      });
    console.log(submissions);

    return res.json({
      success: true,
      count: submissions.length,
      leaderboard: submissions,
      examId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  submitExam,
  getResult,
  leaderboard,
};
