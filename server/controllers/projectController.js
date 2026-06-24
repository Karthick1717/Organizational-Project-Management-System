const Project = require("../models/Projects");

const createProject = async (
  req,
  res
) => {
  try {
    const {
      name,
      client,
      type,
      priority,
      scope,
      startDate,
      endDate,
    } = req.body;

    if (
      !name ||
      !client ||
      !type ||
      !scope ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const projectId =
      "PRJ-" + Date.now();

    const project =
      await Project.create({
        projectId,
        name,
        client,
        type,
        priority,
        scope,
        startDate,
        endDate,
        createdBy: req.user._id,
      });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjectById = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      ).populate(
        "createdBy",
        "name email"
      );

    if (!project) {
      return res.status(404).json({
        message:
          "Project Not Found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        message:
          "Project Not Found",
      });
    }

    const updatedProject =
      await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json(
      updatedProject
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        message:
          "Project Not Found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      message:
        "Project Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};