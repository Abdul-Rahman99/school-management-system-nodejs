const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Classroom name required"],
      unique: [true, "Classroom name must be unique"],
      minlength: [3, "Too short Classroom name"],
      maxlength: [10, "Too long Classroom name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
  },
  { timestamps: true, toJSON: Number, default: 0 }
);


const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;
