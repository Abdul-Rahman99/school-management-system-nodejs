const factory = require("../handlerFactory/handlersFactory");

const Classroom = require("../_common/models/classroomModel");

// Build query
exports.getClassrooms = factory.getAll(Classroom);

// @desc    Get specific classroom by id
// @route   GET /api/v1/classrooms/:id
// @access  Protected/SchoolAdmins
exports.getClassroom = factory.getOne(Classroom, "students");

// @desc    Create classroom
// @route   POST  /api/v1/classrooms
// @access  Protected/SchoolAdmins
exports.createClassroom = factory.createOne(Classroom);

// @desc    Update specific classroom
// @route   PUT /api/v1/classrooms/:id
// @access  Protected/SchoolAdmins
exports.updateClassroom = factory.updateOne(Classroom);

// @desc    Delete specific classroom
// @route   DELETE /api/v1/classrooms/:id
// @access  Protected/SchoolAdmins
exports.deleteClassroom = factory.deleteOne(Classroom);
