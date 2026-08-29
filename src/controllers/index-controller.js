const user = require("../models/user");
const video = require("../models/video");
const playlist = require("../models/playlist");



let currentUser;
let currentUserDoc;
let videoArray = [];
let playlistDoc;

const getData = async (req, res) => {
    if (req.user == null) {
        currentUser = req.user;
        videoArray = null;
        playlistDoc = [];
        currentUserDoc = null;
    } else {
        currentUser = req.user.id;
        playlistDoc = await playlist.find({ owner: currentUser });
        videoArray = [];
        for (let playlist of playlistDoc) {
            const videoOfCurrPlaylist = await video.find({ playlistId: playlist.id });
            videoArray.push(...videoOfCurrPlaylist);
        }
        currentUserDoc = await user.findById({ _id: currentUser });
    }
    res.render("index.ejs", { currentUser, playlistDoc, videoArray, currentUserDoc });

}

module.exports = { getData };