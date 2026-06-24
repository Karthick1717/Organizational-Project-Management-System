const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },

    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectAssignment",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    hoursWorked: {
      type: Number,
      required: true,
      min: 0.5,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "TimeLog",
  timeLogSchema
);