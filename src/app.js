const express = require('express');
const authRoutes = require("./routes/auth-routes");
const playlistOpRoutes = require("./routes/playlist-op-routes");
const searchRoute = require("./routes/search-route");
const indexRoute = require("./routes/index-route");
const picUploadRoute = require("./routes/pic-upload-route");

const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());
// To Parse req.body
app.use(express.urlencoded({ extended: true }));

const path = require('path');
// const playlist = require('./models/playlist');
app.set("view engine", "ejs");

// To access views folder from parent directory
app.set("views", path.join(__dirname, "../views"));

// To access & use, CSS & JS
app.use(express.static(path.join(__dirname, "../public")));


app.use("/", indexRoute);
app.use("/api/auth", authRoutes);
app.use("/api/tunes", playlistOpRoutes);
app.use("/api/tunes/search", searchRoute);
app.use("/api/tunes/upload", picUploadRoute);


module.exports = app;