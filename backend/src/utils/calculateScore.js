const Question = require(
  "../models/Question"
);

const Exam = require(
  "../models/Exam"
);

const calculateScore =
  async (
    examId,
    answers
  ) => {

    const exam =
      await Exam.findById(
        examId
      );

    if (!exam) {
      throw new Error(
        "Exam Not Found"
      );
    }

    const questions =
      await Question.find({
        examId
      });

    let score = 0;

    const marksPerQuestion =
      exam.maxNumberPerQuestion || 1;

    const totalMarks =
      questions.length *
      marksPerQuestion;

    const questionMap = {};

    questions.forEach((q) => {
      questionMap[
        q._id.toString()
      ] = q;
    });

    answers.forEach(
      (answer) => {

        const question =
          questionMap[
            answer.questionId
          ];

        if (!question)
          return;

        // Correct Answer
        if (
          answer.selectedOption ===
          question.correctOption
        ) {

          score +=
            marksPerQuestion;

        }

        // Wrong Answer
        else if (
          exam.negativeMarkingEnabled
        ) {

          score -=
            exam.negativeMarks || 0;

        }

      }
    );

        // Score negative na ho
    // if (score < 0) {
    //   score = 0;
    // }

    return {
      score,
      totalMarks
    };

  };

module.exports =
  calculateScore;