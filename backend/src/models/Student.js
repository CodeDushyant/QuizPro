const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    studentToken: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Student",
  studentSchema
);