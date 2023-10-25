const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student first name required"],
      minlength: [3, "Too short student name"],
      maxlength: [12, "Too long student name"],
    },
    lastName: {
      type: String,
      required: [true, "Student last name required"],
      minlength: [3, "Too short name"],
      maxlength: [12, "Too long name"],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Student data of birth required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Student gender required"],
    },
    contact: {
      email: {
        type: String,
        required: [true, "Email required"],
        minlength: [3, "Too short Email"],
        maxlength: [52, "Too long Email"],
      },
      phone: {
        type: String,
        required: [true, "Phone required"],
        min: [11, "Too short phone number"],
        maxlength: [11, "Too long phone number"],
      },
    },
    address: {
      street: String,
      city: String,                  
      state: String,
      zipCode: String,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: [true, "Add classroom please"],
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Add school please"],
    },
  },
  { timestamps: true, toJSON: Number, default: 0 }
);


studentSchema.virtual("studentClassroom", {
  ref: "Classroom",
  localField: "classroom",
  foreignField: "_id",
  justOne: true,
});

studentSchema.virtual("studentSchool", {
  ref: "School",
  localField: "school",
  foreignField: "_id",
  justOne: true,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
