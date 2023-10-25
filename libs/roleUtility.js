const asyncHandler = require("express-async-handler");
const ApiError = require("../managers/api/apiError/apiError");

// @desc    Authorization (User Permissions)
// ["SuperAdmin", "Admin"]
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });
