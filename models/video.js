const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    playlistId: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    videoTitle: {
        type: String,
        required: true
    },
    channelName: {
        type: String,
        required: true
    },
    keyWords: [
        String
    ]
});


const video = mongoose.model("video",videoSchema);
module.exports = video;