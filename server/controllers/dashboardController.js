const Project = require("../models/Projects");
const Task = require("../models/Task");
const TeamMember = require("../models/TeamMember");
const ProjectAssignment = require("../models/ProjectAssignment");


const getProjectProgress = async (
  req,
  res
) => {
  try {
    const projectId =
      req.params.projectId;

    const tasks =
      await Task.find({
        project: projectId,
      });

    const totalTasks =
      tasks.length;

    const completedTasks =
      tasks.filter(
        task =>
          task.status ===
          "Completed"
      ).length;

    const progress =
      totalTasks === 0
        ? 0
        : (
            completedTasks /
            totalTasks
          ) * 100;

    res.json({
      totalTasks,
      completedTasks,
      progress:
        progress.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMemberPerformance =
  async (req, res) => {
    try {
      const memberId =
        req.params.memberId;

      const assignments =
        await ProjectAssignment.find({
          member: memberId,
        });

      const allocatedHours =
        assignments.reduce(
          (sum, item) =>
            sum +
            item.allocatedHours,
          0
        );

      const hoursUsed =
        assignments.reduce(
          (sum, item) =>
            sum +
            item.hoursUsed,
          0
        );

      const utilization =
        allocatedHours === 0
          ? 0
          : (
              hoursUsed /
              allocatedHours
            ) * 100;

      res.json({
        allocatedHours,
        hoursUsed,
        utilization:
          utilization.toFixed(
            2
          ),
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  const getDashboardSummary =
  async (req, res) => {
    try {
      const projects =
        await Project.countDocuments();

      const activeProjects =
        await Project.countDocuments(
          {
            status: "Active",
          }
        );

      const tasks =
        await Task.countDocuments();

      const completedTasks =
        await Task.countDocuments(
          {
            status:
              "Completed",
          }
        );

      const teamMembers =
        await TeamMember.countDocuments();

      res.json({
        projects,
        activeProjects,
        tasks,
        completedTasks,
        teamMembers,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  module.exports = {
  getProjectProgress,
  getMemberPerformance,
  getDashboardSummary,
};