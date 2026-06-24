const express = require("express");

const router = express.Router();

const authorizeRoles =
require("../middleware/roleMiddleware");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require(
  "../controllers/projectController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
   authorizeRoles(
    "Admin",
    "Manager"
  ),
  protect,
  createProject
);

router.get(
  "/",
  protect,
  getProjects
);

router.get(
  "/:id",
  protect,
  getProjectById
);

router.put(
  "/:id",
  protect,
  authorizeRoles(
    "Admin",
    "Manager"
  ),
  updateProject
);

router.delete(
  "/:id",
  protect,
  authorizeRoles(
    "Admin",
    "Manager"
  ),
  deleteProject
);

module.exports = router;