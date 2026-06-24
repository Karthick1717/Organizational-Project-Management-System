const express = require(
  "express"
);

const router =
  express.Router();

const {
  getProjectProgress,
  getMemberPerformance,
  getDashboardSummary,
} = require(
  "../controllers/dashboardController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/summary",
  protect,
  getDashboardSummary
);

router.get(
  "/project/:projectId",
  protect,
  getProjectProgress
);

router.get(
  "/member/:memberId",
  protect,
  getMemberPerformance
);

module.exports = router;