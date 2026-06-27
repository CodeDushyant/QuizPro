const Question = require("../models/Question");
const Exam = require("../models/Exam");

const addQuestion = async (req, res) => {
  try {
    const {
      examId,
      question,
      options,
      correctOption,
      marks
    } = req.body;

    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam Not Found"
      });
    }

    if (
      exam.teacherId.toString() !==
      req.teacherId
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const newQuestion =
      await Question.create({
        examId,
        question,
        options,
        correctOption,
        marks
      });

    res.status(201).json({
      success: true,
      question: newQuestion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getQuestionsByExam =
  async (req, res) => {
    try {
      const questions =
        await Question.find({
          examId:
            req.params.examId
        });

      res.json({
        success: true,
        questions
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

const deleteQuestion =
  async (req, res) => {
    try {
      const question =
        await Question.findById(
          req.params.id
        );

      if (!question) {
        return res.status(404).json({
          success: false,
          message:
            "Question Not Found"
        });
      }

      await Question.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Question Deleted"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

const bulkAddQuestions =
  async (req, res) => {
    try {
      const {
        examId,
        questions
      } = req.body;

      const exam =
        await Exam.findById(
          examId
        );

      if (!exam) {
        return res.status(404).json({
          success: false,
          message:
            "Exam Not Found"
        });
      }

      const docs =
        questions.map((q) => ({
          examId,
          question:
            q.question,
          options:
            q.options,
          correctOption:
            q.correctOption,
          marks:
            q.marks || 1
        }));

      const inserted =
        await Question.insertMany(
          docs
        );

      res.status(201).json({
        success: true,
        count:
          inserted.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

module.exports = {
  addQuestion,
  getQuestionsByExam,
  deleteQuestion,
  bulkAddQuestions
};