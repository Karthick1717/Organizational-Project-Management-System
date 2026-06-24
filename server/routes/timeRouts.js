const express = require("express");

const router = express.Router();

const {
  createTimeLog,
  getLogsByTask,
} = require(
  "../controllers/timeController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createTimeLog
);

router.get(
  "/:taskId",
  protect,
  getLogsByTask
);

module.exports = router;