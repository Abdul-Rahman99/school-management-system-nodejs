const express = require("express");

const {
  getStudentValidator,
  createStudentValidator,
  updateStudentValidator,
  deleteStudentValidator,
} = require("../managers/_common/validators/studentValidator");

const {
  getStudent,
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  createFilterObj,
} = require("../managers/services/studentService");

const authService = require("../managers/services/authService");
const role = require("../libs/roleUtility");

const router = express.Router({ mergeParams: true });

router.use(authService.protect);
// SchoolAdmin only can do all these operations
router.use(role.allowedTo("SchoolAdmin"));

router
  .route("/")
  .get(createFilterObj, getStudents)
  .post(createStudentValidator, createStudent);

router
  .route("/:id")
  .get(getStudentValidator, getStudent)
  .put(updateStudentValidator, updateStudent)
  .delete(deleteStudentValidator, deleteStudent);

module.exports = router;
