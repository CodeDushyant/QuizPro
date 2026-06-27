const express =
  require("express");

const router =
  express.Router();

const {
  joinExam,
  restoreSession,
  getStudents
} = require(
  "../controllers/studentController"
);

router.post(
  "/join",
  joinExam
);

router.get(
  "/session/:token",
  restoreSession
);

router.get(
  "/exam/:examId",
  getStudents
);

module.exports = router;