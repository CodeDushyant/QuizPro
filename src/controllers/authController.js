const bcrypt = require("bcryptjs");

const Teacher = require(
  "../models/Teacher"
);

const generateToken = require(
  "../utils/generateToken"
);

const signup = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const existingTeacher =
      await Teacher.findOne({
        email
      });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message:
          "Email already registered"
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const teacher =
      await Teacher.create({
        name,
        email,
        password:
          hashedPassword
      });

    const token =
      generateToken(
        teacher._id
      );

    return res.status(201).json({
      success: true,
      token,
      teacher
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password
    } = req.body;

    const teacher =
      await Teacher.findOne({
        email
      });

    if (!teacher) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid Credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        teacher.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid Credentials"
      });
    }

    const token =
      generateToken(
        teacher._id
      );

    return res.status(200).json({
      success: true,
      token,
      teacher
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  signup,
  login
};