const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search-controller");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware.verify, searchController.searchOnYouTube);

module.exports = router;