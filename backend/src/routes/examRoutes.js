const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  createExam,
  getExamByCode,
  getTeacherExams,
  startExam,
  endExam,
  publishResult
} = require(
  "../controllers/examController"
);

router.post(
  "/create",
  authMiddleware,
  createExam
);



router.get(
  "/teacher",
  authMiddleware,
  getTeacherExams
);

router.get(
  "/code/:id",
  getExamByCode
);

router.post(
  "/start/:id",
  authMiddleware,
  startExam
);

router.post(
  "/end/:id",
  authMiddleware,
  endExam
);

router.post(
  "/publish/:id",
  authMiddleware,
  publishResult
);


module.exports = router;