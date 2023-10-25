const express = require("express");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../managers/_common/validators/userValidator");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../managers/services/userService");

const authService = require("../managers/services/authService");
const role = require("../libs/roleUtility");

const router = express.Router();

router.use(authService.protect);

// UserAdmin only can do all these operations
router.use(role.allowedTo("UserAdmin"));

router.get("/getMe", getLoggedUserData, getUser);
router.put("/changeMyPassword", updateLoggedUserPassword);
router.put("/updateMe", updateLoggedUserValidator, updateLoggedUserData);
router.delete("/deleteMe", deleteLoggedUserData);

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);
router.route("/").get(getUsers).post(createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
