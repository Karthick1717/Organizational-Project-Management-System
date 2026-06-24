const Task = require("../models/Task");
const ProjectAssignment = require(
  "../models/ProjectAssignment"
);


// CREATE TASK
const createTask = async (
  req,
  res
) => {
  try {
    const {
      project,
      assignment,
      title,
      description,
      estimatedHours,
      priority,
      deadline,
    } = req.body;

    const assignmentDoc =
      await ProjectAssignment.findById(
        assignment
      );

    if (!assignmentDoc) {
      return res.status(404).json({
        message:
          "Assignment Not Found",
      });
    }

    const existingTasks =
      await Task.find({
        assignment,
      });

    const usedHours =
      existingTasks.reduce(
        (sum, task) =>
          sum + task.estimatedHours,
        0
      );

    const totalHours =
      usedHours + estimatedHours;

    if (
      totalHours >
      assignmentDoc.allocatedHours
    ) {
      return res.status(400).json({
        message:
          "Task hours exceed allocated member hours",
      });
    }

    const task =
      await Task.create({
        project,
        assignment,
        title,
        description,
        estimatedHours,
        priority,
        deadline,
      });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET TASKS BY PROJECT
const getTasksByProject =
  async (req, res) => {
    try {
      const tasks =
        await Task.find({
          project:
            req.params.projectId,
        })
          .populate({
            path: "assignment",
            populate: {
              path: "member",
              select:
                "name email role",
            },
          });

      res.json(tasks);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// GET SINGLE TASK
const getTaskById = async (
  req,
  res
) => {
  try {
    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {
      return res.status(404).json({
        message:
          "Task Not Found",
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE TASK STATUS
const updateTaskStatus =
  async (req, res) => {
    try {
      const { status } =
        req.body;

      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {
        return res.status(404).json({
          message:
            "Task Not Found",
        });
      }

      task.status = status;

      await task.save();

      res.json(task);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// DELETE TASK
const deleteTask = async (
  req,
  res
) => {
  try {
    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {
      return res.status(404).json({
        message:
          "Task Not Found",
      });
    }

    await task.deleteOne();

    res.json({
      message:
        "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTaskStatus,
  deleteTask,
};