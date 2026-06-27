const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true
    },

    question: {
      type: String,
      required: true
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length === 4;
        },
        message:
          "Exactly 4 options required"
      }
    },

    correctOption: {
      type: Number,
      required: true
    },

    marks: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Question",
  questionSchema
);