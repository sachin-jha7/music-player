
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const playlist = mongoose.model("playlist", playlistSchema);
module.exports = playlist;