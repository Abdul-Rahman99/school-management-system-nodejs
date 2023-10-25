const slugify = require("slugify");
const { check, body } = require("express-validator");

const validatorMiddleware = require("../../../mws/validatorMiddleware");
const ApiError = require("../../api/apiError/apiError");

const Student = require("../models/studentModel");

exports.getStudentValidator = [
  check("id").isMongoId().withMessage("Invalid Student id format"),
  validatorMiddleware,
];

exports.createStudentValidator = [
  check("name")
    .notEmpty()
    .withMessage("Student name required")
    .isLength({ min: 3 })
    .withMessage("Too short Student name")
    .isLength({ max: 32 })
    .withMessage("Too long Student name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("contact.email")
    .notEmpty()
    .withMessage("Email is required")
    .custom(async (value, { req }) => {
      const existingStudent = await Student.findOne({ "contact.email": value });
      if (existingStudent) {
        throw new ApiError("This email is already registered.", 403);
      }
    }),

  validatorMiddleware,
];

exports.updateStudentValidator = [
  check("id").isMongoId().withMessage("Invalid Student id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteStudentValidator = [
  check("id").isMongoId().withMessage("Invalid Student id format"),
  validatorMiddleware,
];
