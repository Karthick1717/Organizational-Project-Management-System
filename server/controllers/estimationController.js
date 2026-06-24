const Estimation = require("../models/Estimation");
const Project = require("../models/Projects");

const createEstimation = async (
  req,
  res
) => {
  try {
    const {
      projectId,
      estimatedHours,
      hourlyRate,
    } = req.body;

    const project =
      await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    const existing =
      await Estimation.findOne({
        project: projectId,
      });

    if (existing) {
      return res.status(400).json({
        message:
          "Estimation already exists",
      });
    }

    const quotedPrice =
      estimatedHours * hourlyRate;

    const estimation =
      await Estimation.create({
        project: projectId,
        estimatedHours,
        hourlyRate,
        quotedPrice,
      });

    project.totalHours =
      estimatedHours;

    project.budget =
      quotedPrice;

    project.status =
      "Pending Estimation";

    await project.save();

    res.status(201).json(
      estimation
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getEstimationByProject =
  async (req, res) => {
    try {
      const estimation =
        await Estimation.findOne({
          project: req.params.projectId,
        }).populate(
          "project",
          "projectId name"
        );

      if (!estimation) {
        return res.status(404).json({
          message:
            "Estimation Not Found",
        });
      }

      res.json(estimation);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  module.exports = {
  createEstimation,
  getEstimationByProject,
};