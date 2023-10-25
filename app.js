const path = require("path");

// Dependancies
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });

const ApiError = require("./managers/api/apiError/apiError");
const globalError = require("./mws/errorMiddleware");

const dbConnection = require("./connect/mongo");

const schoolRoute = require("./loaders/schoolLoader");
const userRoute = require("./loaders/userLoader");
const studentRoute = require("./loaders/studentLoader");
const classroomRoute = require("./loaders/classroomLoader");
const authRoute = require("./loaders/authRoute")

// connect to the DB
dbConnection();

// Express App
const app = express();

// Middlewares
app.use(express.json()); // parsing to json
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/schools", schoolRoute);
app.use("/api/v1/students", studentRoute);
app.use("/api/v1/classrooms", classroomRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);


app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global Errors Handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 1234;
const server = app.listen(PORT, () => {
  console.log(`App Running on PORT ${PORT}`);
});

// @desc    Handling rejection outside Express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting Down Server......");
    process.exit(1);
  });
});

module.exports = server;
