
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: String,
    email: {
        type: String,
        unique: true
    },
    imageUrl: {
        type: String,
        default: "https://img.freepik.com/free-vector/cute-sloth-sleeping-with-headphone-music-cartoon-vector-icon-illustration-animal-music-isolated_138676-14048.jpg?semt=ais_hybrid&w=740&q=80",
        set: (v) => v === "" ? "https://img.freepik.com/free-vector/cute-sloth-sleeping-with-headphone-music-cartoon-vector-icon-illustration-animal-music-isolated_138676-14048.jpg?semt=ais_hybrid&w=740&q=80" : v
    },
    password: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;