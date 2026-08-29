const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { upload } = require("../config/cloud-config");
const picUploadController = require("../controllers/pic-upload-controller");

router.post("/", authMiddleware.verify, upload.single("image"), picUploadController.getImageUploaded);

module.exports = router;