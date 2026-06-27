const { v4: uuidv4 } = require("uuid");

const Student = require("../models/Student");
const Exam = require("../models/Exam");

const joinExam = async (req, res) => {
  try {
    const { name, code } = req.body;

    const exam = await Exam.findOne({
      code
    });

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam Not Found"
      });
    }

    if (exam.status === "ended") {
      return res.status(400).json({
        success: false,
        message: "Exam Already Ended"
      });
    }

    const studentToken =
      uuidv4();

    const student =
      await Student.create({
        name,
        examId: exam._id,
        studentToken
      });

    return res.status(201).json({
      success: true,
      token: studentToken,
      student,
      exam
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};

const restoreSession =
  async (req, res) => {
    try {
      const student =
        await Student.findOne({
          studentToken:
            req.params.token
        }).populate("examId");

      if (!student) {
        return res.status(404).json({
          success: false,
          message:
            "Session Not Found"
        });
      }

      return res.json({
        success: true,
        student
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

const getStudents =
  async (req, res) => {
    try {
      const students =
        await Student.find({
          examId:
            req.params.examId
        });

      return res.json({
        success: true,
        students
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

module.exports = {
  joinExam,
  restoreSession,
  getStudents
};