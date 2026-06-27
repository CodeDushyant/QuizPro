const express =
require("express");

const router =
express.Router();

const authMiddleware =
require(
"../middleware/authMiddleware"
);

const {
dashboardStats
} = require(
"../controllers/analyticsController"
);

router.get(
"/dashboard",
authMiddleware,
dashboardStats
);

module.exports =
router;