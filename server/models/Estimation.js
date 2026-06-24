const mongoose = require("mongoose");

const estimationSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      unique: true,
    },

    estimatedHours: {
      type: Number,
      required: true,
      min: 1,
    },

    hourlyRate: {
      type: Number,
      required: true,
      min: 1,
    },

    quotedPrice: {
      type: Number,
      required: true,
    },

    approvalStatus: {
      type: String,
      enum: [
        "Draft",
        "Under Review",
        "Approved",
        "Rejected",
      ],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Estimation",
  estimationSchema
);