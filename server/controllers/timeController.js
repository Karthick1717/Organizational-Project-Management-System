const TimeLog = require("../models/TimeLog");
const Task = require("../models/Task");
const ProjectAssignment = require("../models/ProjectAssignment");

const createTimeLog = async (
  req,
  res
) => {
  try {
    const {
      task,
      assignment,
      hoursWorked,
      remarks,
    } = req.body;

    const taskDoc =
      await Task.findById(task);

    if (!taskDoc) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

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

    const log =
      await TimeLog.create({
        task,
        assignment,
        hoursWorked,
        remarks,
      });

    assignmentDoc.hoursUsed +=
      hoursWorked;

    await assignmentDoc.save();

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLogsByTask =
  async (req, res) => {
    try {
      const logs =
        await TimeLog.find({
          task: req.params.taskId,
        });

      res.json(logs);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  createTimeLog,
  getLogsByTask,
};