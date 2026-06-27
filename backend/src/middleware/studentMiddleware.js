const Student = require("../models/Student");

const studentMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Student token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const student = await Student.findOne({
      studentToken: token,
    });

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid student token",
      });
    }

    req.student = student;

    next();
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = studentMiddleware;
