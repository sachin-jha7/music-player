const searchYouTubeVideos = require("../services/youtube-service");

const searchOnYouTube = async (req, res) => {
    let query = req.body.search;

    const searchResult = await searchYouTubeVideos(query);
    res.status(200).json(searchResult);
}

module.exports = { searchOnYouTube };