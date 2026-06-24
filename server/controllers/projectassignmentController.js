const Project = require("../models/Projects");
const TeamMember = require("../models/TeamMember");
const ProjectAssignment = require("../models/ProjectAssignment");



const assignMember = async (
  req,
  res
) => {
  try {
    const {
      projectId,
      memberId,
      allocatedHours,
      role,
      startDate,
    } = req.body;

    const project =
      await Project.findById(projectId);

  const existingAssignment =
  await ProjectAssignment.findOne({
    project: projectId,
    member: memberId,
  });

if (existingAssignment) {
  return res.status(400).json({
    message:
      "Member already assigned to this project",
  });
}

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const member =
      await TeamMember.findById(
        memberId
      );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    // Current assigned hours
    const assignments =
      await ProjectAssignment.find({
        project: projectId,
      });

    const currentHours =
      assignments.reduce(
        (sum, item) =>
          sum + item.allocatedHours,
        0
      );

    const newTotal =
      currentHours +
      allocatedHours;

    if (
      newTotal >
      project.totalHours
    ) {
      return res.status(400).json({
        message:
          `Allocation exceeds project hours (${project.totalHours})`,
      });
    }

    const assignment =
      await ProjectAssignment.create({
        project: projectId,
        member: memberId,
        allocatedHours,
        role,
        startDate,
      });

    res.status(201).json(
      assignment
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAssignmentsByProject =
  async (req, res) => {
    try {
      const assignments =
        await ProjectAssignment.find({
          project:
            req.params.projectId,
        })
          .populate(
            "member",
            "name email"
          )
          .populate(
            "project",
            "name projectId"
          );

      res.json(assignments);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  module.exports = {
  assignMember,
  getAssignmentsByProject,
};