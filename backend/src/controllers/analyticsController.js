const Exam = require("../models/Exam");
const Student = require("../models/Student");
const Submission = require("../models/Submission");

const dashboardStats =
async (req, res) => {

  try {

    const teacherId =
      req.teacherId;

    const exams =
      await Exam.find({
        teacherId
      });

    const examIds =
      exams.map(
        (e) => e._id
      );

    const students =
      await Student.countDocuments({
        examId: {
          $in: examIds
        }
      });

    const submissions =
      await Submission.countDocuments({
        examId: {
          $in: examIds
        }
      });

    return res.json({
      success: true,

      totalExams:
        exams.length,

      totalStudents:
        students,

      totalSubmissions:
        submissions
    });

  } catch (error) {

    return res.status(500)
      .json({
        success: false,
        message:
          error.message
      });

  }

};

module.exports = {
  dashboardStats
};