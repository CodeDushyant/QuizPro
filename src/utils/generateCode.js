const Exam = require("../models/Exam");

const generateCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    exists = await Exam.findOne({
      code
    });
  }

  return code;
};

module.exports = generateCode;