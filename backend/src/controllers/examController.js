const { request } = require("express");
const Exam = require("../models/Exam");
const generateCode = require("../utils/generateCode");

const createExam = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      negativeMarkingEnabled,
      negativeMarks,
      maxNumberPerQuestion,
      expiryDate,
    } = req.body;

    const code = await generateCode();

    const exam = await Exam.create({
      title,
      description,
      code,
      duration,
      negativeMarkingEnabled,
      maxNumberPerQuestion,
      negativeMarks,
      expiryDate,
      teacherId: req.teacherId,
      status: "waiting",
    });

    return res.status(201).json({
      success: true,
      exam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getExamByCode = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam Not Found",
      });
    }

    return res.json({
      success: true,
      exam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTeacherExams = async (req, res) => {
  try {
    const exams = await Exam.find({
      teacherId: req.teacherId,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      exams,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const startExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        status: "started",
      },
      {
        new: true,
      },
    );

    const io = req.app.get("io");

    io.to(exam.code).emit("examStarted", {
      examId: exam._id,
    });

    return res.json({
      success: true,
      exam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const endExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        status: "ended",
      },
      {
        new: true,
      },
    );

    const io = req.app.get("io");

    io.to(exam.code).emit("examEnded");

    return res.json({
      success: true,
      exam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const publishResult = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        resultPublished: true,
      },
      {
        new: true,
      },
    );

    const io = req.app.get("io");

    io.to(exam.code).emit("resultPublished");

    return res.json({
      success: true,
      exam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    await Question.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createExam,
  getExamByCode,
  getTeacherExams,
  startExam,
  endExam,
  publishResult,
  deleteQuestion,
};
