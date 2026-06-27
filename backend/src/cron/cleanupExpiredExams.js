const cron = require("node-cron");

const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Student = require("../models/Student");
const Submission = require("../models/Submission");

const startCleanupJob = () => {

  cron.schedule(
    "0 * * * *",
    async () => {

      try {

        console.log(
          "Running Expiry Cleanup..."
        );

        const expiredExams =
          await Exam.find({
            expiryDate: {
              $lte: new Date()
            }
          });

        for (const exam of expiredExams) {

          await Question.deleteMany({
            examId: exam._id
          });

          await Student.deleteMany({
            examId: exam._id
          });

          await Submission.deleteMany({
            examId: exam._id
          });

          await Exam.findByIdAndDelete(
            exam._id
          );

          console.log(
            `Deleted Exam ${exam.code}`
          );
        }

      } catch (error) {

        console.error(
          error.message
        );

      }

    }
  );

};

module.exports =
  startCleanupJob;