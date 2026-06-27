const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    code: {
      type: String,
      required: true,
      unique: true
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true
    },

    duration: {
      type: Number,
      required: true
    },

    negativeMarkingEnabled: {
      type: Boolean,
      default: false
    },

    maxNumberPerQuestion : {
        type : Number,
        required : true,
        default : 1
    },
    negativeMarks: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "draft",
        "waiting",
        "started",
        "ended"
      ],
      default: "draft"
    },

    resultPublished: {
      type: Boolean,
      default: false
    },

    expiryDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Exam",
  examSchema
);