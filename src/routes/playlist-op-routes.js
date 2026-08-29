const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const playlistOpControllers = require("../controllers/playlist-op-controller");

router.post("/save", authMiddleware.verify, playlistOpControllers.createNewPlaylist, (req,res) => {
    res.json("Video Saved to DB");
});
router.put("/edit", authMiddleware.verify, playlistOpControllers.addVideosToPlaylist, (req,res) => {
    res.json("Video Saved to DB");
});
router.delete("/delete", authMiddleware.verify, playlistOpControllers.deleteVideo);

module.exports = router;