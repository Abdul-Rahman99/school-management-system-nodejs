const factory = require("../handlerFactory/handlersFactory");

const Student = require("../_common/models/studentModel");

// Nested route
// GET /api/v1/classrooms/:classroomId/students
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.classroomId)
    filterObject = { classroom: req.params.classroomId };
  req.filterObj = filterObject;
  next();
};

// Build query
exports.getStudents = factory.getAll(Student);

// @desc    Get specific student by id
// @route   GET /api/v1/students/:id
// @access  Protected/SchoolAdmins
exports.getStudent = factory.getOne(Student, "classroom");

// @desc    Create student
// @route   POST  /api/v1/students
// @access  Protected/SchoolAdmins
exports.createStudent = factory.createOne(Student);

// @desc    Update specific Student
// @route   PUT /api/v1/students/:id
// @access  Protected/SchoolAdmins
exports.updateStudent = factory.updateOne(Student);

// @desc    Delete specific student
// @route   DELETE /api/v1/students/:id
// @access  Protected/SchoolAdmins
exports.deleteStudent = factory.deleteOne(Student);
