const TeamMember = require(
  "../models/TeamMember"
);

const createMember = async (
  req,
  res
) => {
  try {
    const member =
      await TeamMember.create(
        req.body
      );

    res.status(201).json(
      member
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMembers = async (
  req,
  res
) => {
  try {
    const members =
      await TeamMember.find();

    res.json(members);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMember,
  getMembers,
};