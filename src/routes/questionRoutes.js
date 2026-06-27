const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  addQuestion,
  getQuestionsByExam,
  deleteQuestion,
  bulkAddQuestions,
} = require(
  "../controllers/questionController"
);

router.post(
  "/add",
  authMiddleware,
  addQuestion
);
router.delete(
  "/delete",
  authMiddleware,
  deleteQuestion
)
router.post(
  "/bulk",
  authMiddleware,
  bulkAddQuestions
);

router.get(
  "/exam/:examId",
  getQuestionsByExam
);

router.delete(
  "/:id",
  authMiddleware,
  deleteQuestion
);

module.exports = router;