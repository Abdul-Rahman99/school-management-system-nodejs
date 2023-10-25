const factory = require("../handlerFactory/handlersFactory");

const School = require("../_common/models/schoolModel");

// Build query
exports.getSchools = factory.getAll(School);

// @desc    Get specific school by id
// @route   GET /api/v1/schools/:id
// @access  Public
exports.getSchool = factory.getOne(School, "classrooms");

// @desc    Create school
// @route   POST  /api/v1/schools
// @access  Protected/Superadmins
exports.createSchool = factory.createOne(School);

// @desc    Update specific school
// @route   PUT /api/v1/schools/:id
// @access  Private
exports.updateSchool = factory.updateOne(School);

// @desc    Delete specific school
// @route   DELETE /api/v1/school/:id
// @access  Private
exports.deleteSchool = factory.deleteOne(School);
