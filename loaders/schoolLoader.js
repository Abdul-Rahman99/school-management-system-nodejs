const express = require("express");

const {
  getSchoolValidator,
  createSchoolValidator,
  updateSchoolValidator,
  deleteSchoolValidator,
} = require("../managers/_common/validators/schoolValidator");

const {
  getSchools,
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool,
} = require("../managers/services/schoolService");

const authService = require("../managers/services/authService");
const role = require("../libs/roleUtility");
const classroomRoute = require("./classroomLoader");

const router = express.Router({ mergeParams: true });

router.use(authService.protect);
// SuperAdmin only can do all these operations
router.use(role.allowedTo("SuperAdmin"));

//@desc    Nested Route
//GET      /schools/schoolId/classrooms
router.use("/:schoolId/classrooms", classroomRoute);

router.route("/").get(getSchools).post(createSchoolValidator, createSchool);

router
  .route("/:id")
  .get(getSchoolValidator, getSchool)
  .put(updateSchoolValidator, updateSchool)
  .delete(deleteSchoolValidator, deleteSchool);

module.exports = router;
