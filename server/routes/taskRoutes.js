const express = require("express");

const router = express.Router();

const authorizeRoles =
require("../middleware/roleMiddleware");

const {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTaskStatus,
  deleteTask,
} = require(
  "../controllers/taskContoller"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createTask
);

router.get(
  "/project/:projectId",
  protect,
  getTasksByProject
);

router.get(
  "/:id",
  protect,
  getTaskById
);

router.put(
  "/status/:id",
  protect,
   authorizeRoles(
    "Admin",
    "Manager"
  ),
  updateTaskStatus
);

router.delete(
  "/:id",
  protect,
  deleteTask
);

module.exports = router;