const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../../mws/validatorMiddleware");

const School = require("../models/schoolModel");
const ApiError = require("../../api/apiError/apiError");

exports.getSchoolValidator = [
  check("id").isMongoId().withMessage("Invalid school id format"),
  validatorMiddleware,
];

exports.createSchoolValidator = [
  check("name")
    .notEmpty()
    .withMessage("School name required")
    .isLength({ min: 3 })
    .withMessage("Too short school name")
    .isLength({ max: 32 })
    .withMessage("Too long school name")
    .custom(async (value, { req }) => {
      const existingSchool = await School.findOne({ name: value });
      if (existingSchool) {
        throw new ApiError("This school is already registered.", 403);
      }
      // Generate a slug from the classroom name and add it to the request body
      req.body.slug = slugify(value);
    }),
  validatorMiddleware,
];

exports.updateSchoolValidator = [
  check("id").isMongoId().withMessage("Invalid school id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteSchoolValidator = [
  check("id").isMongoId().withMessage("Invalid school id format"),
  validatorMiddleware,
];
