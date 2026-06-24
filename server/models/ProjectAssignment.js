const mongoose = require("mongoose");

const projectAssignmentSchema =
  new mongoose.Schema(
    {
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },

      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
        required: true,
      },

      allocatedHours: {
        type: Number,
        required: true,
      },

      hoursUsed: {
        type: Number,
        default: 0,
      },

      startDate: {
        type: Date,
        required: true,
      },

      role: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "ProjectAssignment",
  projectAssignmentSchema
);