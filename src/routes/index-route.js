const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index-controller");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware.verify, indexController.getData);

module.exports = router;
