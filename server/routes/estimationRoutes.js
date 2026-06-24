const express = require("express");

const router = express.Router();

const {
  createEstimation,
  getEstimationByProject,
} = require(
  "../controllers/estimationController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createEstimation
);

router.get(
  "/:projectId",
  protect,
  getEstimationByProject
);

module.exports = router;