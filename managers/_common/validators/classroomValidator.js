const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../../mws/validatorMiddleware");

const Classroom = require("../models/classroomModel");
const ApiError = require("../../api/apiError/apiError");

exports.getClassroomValidator = [
  check("id").isMongoId().withMessage("Invalid Classroom id format"),
  validatorMiddleware,
];

exports.createClassroomValidator = [
  check("name")
    .notEmpty()
    .withMessage("Classroom name required")
    .isLength({ min: 3 })
    .withMessage("Too short Classroom name")
    .isLength({ max: 10 })
    .withMessage("Too long Classroom name")
    .custom(async (value, { req }) => {
      const existingClassroom = await Classroom.findOne({ name: value });
      if (existingClassroom) {
        throw new ApiError("This classroom is already registered.", 403);
      }
      // Generate a slug from the classroom name and add it to the request body
      req.body.slug = slugify(value);
    }),
  validatorMiddleware,
];

exports.updateClassroomValidator = [
  check("id").isMongoId().withMessage("Invalid Classroom id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteClassroomValidator = [
  check("id").isMongoId().withMessage("Invalid Classroom id format"),
  validatorMiddleware,
];
