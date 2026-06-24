const express = require("express");

const router = express.Router();

const {
  createMember,
  getMembers,
} = require(
  "../controllers/teamMemberController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createMember
);

router.get(
  "/",
  protect,
  getMembers
);

module.exports = router;