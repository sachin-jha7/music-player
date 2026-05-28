if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const youtubesearchapi = require('youtube-search-api');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const { cloudinary, upload } = require('./cloud-config');


const authMiddleware = require('./middleware/auth');
const playlist = require('./models/playlist');
const video = require('./models/video');
const user = require('./models/user');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err)
  });



const path = require('path');
// const playlist = require('./models/playlist');
app.set("view engine", "ejs");

// To access views folder from parent directory
app.set("views", path.join(__dirname, "/views"));

// To access & use, CSS & JS
app.use(express.static(path.join(__dirname, "/public")));

// To Parse req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



app.get("/", (req, res) => {
  res.redirect("/tunes");
});


// Index Route
let currentUser;
let currentUserDoc;
let videoArray = [];
let playlistDoc;
let playlistInfo;


app.get("/tunes", authMiddleware.verify, async (req, res) => {
  playlistInfo = null;
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
});


// Global Search Route

app.post("/tunes/search", async (req, res) => {
  let query = req.body.search;
  query = query.toLowerCase();

  if (query.includes("c#")) {
    query = query.replace("c#", "c sharp");
  }
  if (query.includes("f#")) {
    query = query.replace("f#", "f sharp");
  }
  if (query.includes("c++")) {
    query = query.replace("c++", "c plus plus");
  }
  if (query.includes("++")) {
    query = query.replace("++", " plus plus ");
  }
  if (query.includes("--")) {
    query = query.replace("++", " minus minus ");
  }
  if (query.includes("&")) {
    query = query.replace("&", " and ");
  }
  const results = await youtubesearchapi.GetListByKeyword(query, false, 11);
  const searchResult = results.items;
  res.json(searchResult);
  // res.render("index.ejs", { query, searchResult });
});


// Create Playlist

const normalize = (text) => {
  return text.toUpperCase().replace(/[^\w\s]/g, " ").trim();  //It'll replace all the letter other than a-z or 0-1 with ""
}


app.post("/tunes/save", authMiddleware.verify, async (req, res) => {
  const { newVideo } = req.body;

  // if token not exist
  if (req.user == null) {
    return res.json("You're not logged-in");
  }

  currentUser = req.user.id;

  const playlistExists = await playlist.findOne({ $and: [{ name: newVideo.preservePlaylistName }, { owner: currentUser }] });


  if (playlistExists == null) {
    const newPlaylist = new playlist({
      owner: currentUser,
      name: newVideo.preservePlaylistName
    });
    playlistInfo = await newPlaylist.save();
  }

  // when a playlist is already created then set playlistInfo to null
  // To prevent creating duplicate playlists

  const keywords = normalize(newVideo.videoName).split(" ");

  if (playlistInfo == null) {
    return res.json("Playlist already exists");
  } else {
    const media = new video({
      owner: currentUser,
      playlistId: playlistInfo.id,
      videoId: newVideo.videoId,
      videoTitle: newVideo.videoName,
      channelName: newVideo.channelName,
      keyWords: keywords
    });

    await media.save();
    res.json("Video Saved to DB");
  }

});



// Update Route (Add more cards)

app.put("/tunes/edit", async (req, res) => {
  const { newVideo } = req.body;
  const getPlaylistInfo = await playlist.findOne({ $and: [{ name: newVideo.preservePlaylistName }, { owner: currentUser }] });
  // console.log(getPlaylistInfo.id)
  const keywords = normalize(newVideo.videoName).split(" ");
  const media = new video({
    owner: currentUser,
    playlistId: getPlaylistInfo.id,
    videoId: newVideo.videoId,
    videoTitle: newVideo.videoName,
    channelName: newVideo.channelName,
    keyWords: keywords
  })
  await media.save();
  res.json("Video Saved to DB");
});


// Delete Route

app.delete("/tunes/delete", async (req, res) => {
  const { videoId, playlistName } = req.body;
  if (videoId == "" || playlistName == "") return;
  const currVideoPlaylist = await playlist.findOne({ $and: [{ name: playlistName }, { owner: currentUser }] });
  // console.log(currVideoPlaylist.id);
  const allVideosOfThisPlaylist = await video.find({ playlistId: currVideoPlaylist.id });
  // console.log(allVideosOfThisPlaylist);
  if (allVideosOfThisPlaylist.length == 1) {
    await video.findOneAndDelete({ $and: [{ videoId: videoId }, { playlistId: currVideoPlaylist.id }] });
    await playlist.findOneAndDelete({ $and: [{ name: playlistName }, { owner: currentUser }] });
    res.json("Playlist should be deleted");
  } else {
    await video.findOneAndDelete({ $and: [{ videoId: videoId }, { playlistId: currVideoPlaylist.id }] });
    res.json("video deleted");
  }
});


// Upload profile Image

app.post("/tunes/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json(`Error: No File`);
    }
    const stream = cloudinary.uploader.upload_stream(
      { folder: "yt-music-app" },
      async (error, result) => {
        try {
          if (error) {
            return res.status(401).json(`Error: ${error.message}`);
          }
          if (!currentUser) {
            return res.status(401).json(`Error: Unauthorized`);
          }
          const currUserDoc = await user.findById(currentUser);
          currUserDoc.imageUrl = result.secure_url;
          await currUserDoc.save();
          res.json({
            success: true,
            imageUrl: result.secure_url
          });
        } catch (err) {
          res.status(500).json(`Error: ${err.message}`);
        }
      }
    );
    stream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json(`Error: ${err.message}`);
  }
});



// Login Route

app.post("/login", authMiddleware.login, (req, res) => {
  // console.log(req.user)
  res.redirect("/tunes");
});


// Logout Route

app.get("/logout", authMiddleware.logout, (req, res) => {
  res.redirect("/tunes");
});


// Signup Route

app.post("/signup", authMiddleware.signup, (req, res) => {

  res.redirect("/tunes");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("app is live at: 3000");
});
