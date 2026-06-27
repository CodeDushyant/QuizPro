const mongoose = require("mongoose");

const submissionSchema =
  new mongoose.Schema(
    {
      examId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Exam",
        required: true
      },

      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
      },

      answers: [
        {
          questionId: {
            type:
              mongoose.Schema.Types.ObjectId,
            ref: "Question"
          },

          selectedOption: Number
        }
      ],

      score: {
        type: Number,
        default: 0
      },

      totalMarks: {
        type: Number,
        default: 0
      },

      submitted: {
        type: Boolean,
        default: false
      },

      submittedAt: Date
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model(
  "Submission",
  submissionSchema
);