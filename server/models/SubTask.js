const mongoose = require("mongoose");

const subTaskSchema =
  new mongoose.Schema(
    {
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Not Started",
          "In Progress",
          "Completed",
        ],
        default: "Not Started",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "SubTask",
  subTaskSchema
);