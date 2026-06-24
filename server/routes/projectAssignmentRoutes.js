const express = require("express");

const router = express.Router();

const authorizeRoles =
require("../middleware/roleMiddleware");

const {
  assignMember,
  getAssignmentsByProject,
} = require(
  "../controllers/projectAssignmentController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  authorizeRoles(
    "Admin",
    "Manager"
  ),
  assignMember
);

router.get(
  "/:projectId",
  protect,
  getAssignmentsByProject
);

module.exports = router;