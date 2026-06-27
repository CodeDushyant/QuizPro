const express =
  require("express");

const router =
  express.Router();
const studentMiddleware =
  require(
    "../middleware/studentMiddleware"
  );
const {
  submitExam,
  getResult,
  leaderboard
} = require(
  "../controllers/submissionController"
);

router.post(
  "/submit",
  studentMiddleware,
  submitExam
);

router.get(
  "/result/:token",
  getResult
);

router.get(
  "/leaderboard/:examId",
  leaderboard
);

module.exports =
  router;