const express = require("express");

const {
  getClassroomValidator,
  createClassroomValidator,
  updateClassroomValidator,
  deleteClassroomValidator,
} = require("../managers/_common/validators/classroomValidator");

const {
  getClassroom,
  getClassrooms,
  createClassroom,
  updateClassroom,
  deleteClassroom,
  
} = require("../managers/services/classroomService");

const authService = require("../managers/services/authService");
const role = require("../libs/roleUtility");
const studentRoute = require("./studentLoader");

const router = express.Router({ mergeParams: true });

router.use(authService.protect);
// SchoolAdmin only can do all these operations
router.use(role.allowedTo("SchoolAdmin"));

//@desc    Nested Route
//GET      /classrooms/classroomId/students
router.use("/:classroomId/students", studentRoute);

router
  .route("/")
  .get(getClassrooms)
  .post(createClassroomValidator, createClassroom);

router
  .route("/:id")
  .get(getClassroomValidator, getClassroom)
  .put(updateClassroomValidator, updateClassroom)
  .delete(deleteClassroomValidator, deleteClassroom);

module.exports = router;
