const express = require("express");

const router = express.Router();

const {
  createSubTask,
  getSubTasksByTask,
  updateSubTaskStatus,
} = require(
  "../controllers/subTaskController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createSubTask
);

router.get(
  "/:taskId",
  protect,
  getSubTasksByTask
);

router.put(
  "/status/:id",
  protect,
  updateSubTaskStatus
);

module.exports = router;