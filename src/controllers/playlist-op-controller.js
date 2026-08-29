const playlist = require("../models/playlist");
const video = require("../models/video");


//It'll replace all the letter other than a-z or 0-1 with ""
const normalizeKeyword = (text) => {
    return text.toUpperCase().replace(/[^\w\s]/g, "").trim();
}

const normalizeName = (text) => {
    return text.toUpperCase().replace(/[^\w\s]/g, "").trim();
}


// Create Playlist
let playlistInfo = null;
const createNewPlaylist = async (req, res, next) => {
    
    const { newVideo } = req.body;

    // if token not exist
    if (req.user == null) {
        return res.json("You're not logged-in");
    }

    currentUser = req.user.id;

    const playlistExists = await playlist.findOne({
        $and: [
            { name: newVideo.preservePlaylistName }, { owner: currentUser }
        ]
    });

    if (playlistExists == null) {
        const newPlaylist = new playlist({
            owner: currentUser,
            name: newVideo.preservePlaylistName
        });
        playlistInfo = await newPlaylist.save();
    }

    // when a playlist is already created then set playlistInfo to null
    // To prevent creating duplicate playlists

    // const keywords = normalize(newVideo.videoName).split(" ");
    const keywords = [...new Set(normalizeKeyword(newVideo.videoName).split(" "))];
    const NormalizedName = normalizeName(newVideo.videoName);

    if (playlistInfo == null) {  //When new playlist is created then playlistInfo is not null
        return res.json("Playlist already exists");
    } else {
        const media = new video({
            owner: currentUser,
            playlistId: playlistInfo.id,
            videoId: newVideo.videoId,
            videoTitle: newVideo.videoName,
            channelName: newVideo.channelName,
            normalizedTitle: NormalizedName,
            keyWords: keywords
        });

        await media.save();
        // console.log(await media.save());
        next();
    }
}
// app.post("/tunes/save", authMiddleware.verify, async (req, res) => {
// });

// Update Route (Add more cards)
const addVideosToPlaylist = async (req, res, next) => {
    const { newVideo } = req.body;
    currentUser = req.user.id;
    const getPlaylistInfo = await playlist.findOne({
        $and: [{ name: newVideo.preservePlaylistName }, { owner: currentUser }
        ]
    });
    // console.log(getPlaylistInfo.id)
    // const keywords = normalize(newVideo.videoName).split(" ");

    const keywords = [...new Set(normalizeKeyword(newVideo.videoName).split(" "))];

    const NormalizedName = normalizeName(newVideo.videoName);

    const media = new video({
        owner: currentUser,
        playlistId: getPlaylistInfo.id,
        videoId: newVideo.videoId,
        videoTitle: newVideo.videoName,
        channelName: newVideo.channelName,
        normalizedTitle: NormalizedName,
        keyWords: keywords
    })

    await media.save()
    next();
}
// app.put("/tunes/edit", async (req, res) => {    
// });


// Delete Route
const deleteVideo = async (req, res) => {
    const { videoId, playlistName } = req.body;
    currentUser = req.user.id;
    if (videoId == "" || playlistName == "") return;
    const currVideoPlaylist = await playlist.findOne({
        $and: [{ name: playlistName }, { owner: currentUser }]
    });

    const allVideosOfThisPlaylist = await video.find({ playlistId: currVideoPlaylist.id });

    if (allVideosOfThisPlaylist.length == 1) {
        await video.findOneAndDelete({
            $and: [{ videoId: videoId }, { playlistId: currVideoPlaylist.id }]
        });
        await playlist.findOneAndDelete({
            $and: [{ name: playlistName }, { owner: currentUser }]
        });
        res.json("Playlist should be deleted");
    } else {
        await video.findOneAndDelete({
            $and: [{ videoId: videoId }, { playlistId: currVideoPlaylist.id }]
        });
        res.json("video deleted");
    }
}
// app.delete("/tunes/delete", async (req, res) => {   
// });


module.exports = { createNewPlaylist, addVideosToPlaylist, deleteVideo }
