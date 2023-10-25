const mongoose = require("mongoose");
// 1- Create Schema
const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "School name required"],
      unique: [true, "School name must be unique"],
      minlength: [3, "Too short School name"],
      maxlength: [32, "Too long School name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    location: {
      type: String,
      required: [true, "School location required"],
    },
    administrators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        //required: [true, "User Role is required"],
      },
    ],
  },

  {
    timestamps: true,
    // to enable virtual populate
    toJSON: Number,
    default: 0,
  }
);


// 2- Create model
const ScoolModel = mongoose.model("School", schoolSchema);

module.exports = ScoolModel;
