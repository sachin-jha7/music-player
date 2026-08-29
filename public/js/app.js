import vidsArray from "./modules/flipTune-playlist.js";
import navigationForSmallScreen from "./modules/small-screen-nav.js";
import {
    passwordTogglerFunction1, passwordTogglerFunction2,
    openSignUpForm, openLoginForm, openSignUpForm2
} from "./modules/auth-form-opener.js";

import { uploadFinalImage, uploadImage, userCantUpload } from './modules/profile-pic-upload.js';
import { createMusicCard, createPlaylist, createVideoCard } from "./modules/create-card.js";
import { getLocalSearchData } from "./modules/local-search.js";
import { showSearchResult, showSearchResultAndUpdate } from "./modules/global-search.js";

navigationForSmallScreen();

const cardContainer = document.querySelector(".card-container");
const cardWrapper = document.querySelector(".card-wrapper");

let isClickOnUserPlaylist = false;
let isClickOnDefaultPlaylist = true;
// console.log(currentUser)
// load cover/card image

function loadYtThumbnail(imgElement, videoId, qualityIndex = 0) {
    const qualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault'];

    if (qualityIndex >= qualities.length) return;

    const img = new Image();
    img.onload = function () {
        if (this.naturalWidth === 120 && this.naturalHeight === 90) {
            loadYtThumbnail(imgElement, videoId, qualityIndex + 1);
        } else {
            imgElement.src = this.src;
        }
    };

    img.src = `https://i.ytimg.com/vi/${videoId}/${qualities[qualityIndex]}.jpg`;
}


// load first image

const coverImg = document.querySelector(".placeholder-img img");
loadYtThumbnail(coverImg, "zaFGQEIcetM");



// Load Default Playlist

for (let vid of vidsArray) {
    const card = createVideoCard(vid.videoId, vid.videoTitle, vid.channelName);
    cardWrapper.appendChild(card);
}


// local storage key

const storageKey = "MyPlaylist";
// const localStorePlayList = JSON.parse(localStorage.getItem(storageKey));
if (storageKey in localStorage) {
    console.log("Video Deleted!, I did this because it's getting messy");
    localStorage.clear();
}


// Create Library Card

if (window.innerWidth <= 768) {
    const musicCardContainer = document.querySelector(".music-list-wrapper");
    if (allVideosOfCurrUser != null)
        for (let video of allVideosOfCurrUser) {
            const musicCard = createMusicCard(video.videoId, video.videoTitle, video.channelName);
            musicCardContainer.appendChild(musicCard);
        }
    for (let song of vidsArray) {
        const musicCard = createMusicCard(song.videoId, song.videoTitle, song.channelName);
        musicCardContainer.appendChild(musicCard);
    }
}


// YouTube iframe API

var player;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('player', {
        videoId: "zaFGQEIcetM",
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
    });
}

function onPlayerReady(event) {
    // event.target.playVideo();
    console.log("video is ready to play :)");
    document.querySelector(".song-name").innerText = event.target.videoTitle.slice(0, 30);
    document.querySelector(".author").innerText = "Sheheryar Rehan";
    setDuration();
}


// Toggle play-pause

const playBtn = document.querySelector(".play-btn");
const playBtnIcon = playBtn.querySelector(".fa-solid");
// console.log(playBtnIcon);

playBtn.addEventListener("click", () => {
    if (playBtnIcon.classList.contains("fa-play")) {
        player.playVideo();
        updateProgress();
        playBtnIcon.classList.remove("fa-play");
        playBtnIcon.classList.add("fa-pause");
    } else {
        player.pauseVideo();
        updateProgress();
        playBtnIcon.classList.remove("fa-pause");
        playBtnIcon.classList.add("fa-play");
    }
});



// Change Song

const playPreviousSong = (Array, currentPlayerId) => {
    for (let card of Array) {
        if (currentPlayerId == card.videoId) {
            const indexOfCurrentVideo = Array.indexOf(card);
            if (indexOfCurrentVideo == 0) {
                let nextVideoId = Array[Array.length - 1].videoId;
                changeVideo(nextVideoId);
                document.querySelector(".author").innerText = Array[Array.length - 1].channelName;
            } else {
                let nextVideoId = Array[indexOfCurrentVideo - 1].videoId;
                changeVideo(nextVideoId);
                document.querySelector(".author").innerText = Array[indexOfCurrentVideo - 1].channelName;
            }
        }
    }
}

const playNextSong = (Array, currentPlayerId) => {
    for (let card of Array) {
        if (currentPlayerId == card.videoId) {
            let indexOfCurrentVideo = Array.indexOf(card);
            if (indexOfCurrentVideo == 0) {
                const nextVideoId = Array[indexOfCurrentVideo + 1].videoId;
                changeVideo(nextVideoId);
                document.querySelector(".author").innerText = Array[indexOfCurrentVideo + 1].channelName;
            } else {
                if (indexOfCurrentVideo + 1 >= Array.length) {
                    indexOfCurrentVideo = 0;
                    const nextVideoId = Array[indexOfCurrentVideo].videoId;
                    changeVideo(nextVideoId);
                    document.querySelector(".author").innerText = Array[indexOfCurrentVideo].channelName;
                } else {
                    const nextVideoId = Array[indexOfCurrentVideo + 1].videoId;
                    changeVideo(nextVideoId);
                    document.querySelector(".author").innerText = Array[indexOfCurrentVideo + 1].channelName;
                }
            }
        }
    }
}

const prevSongBtn = document.querySelector(".skip-prev-btn");
const nextSongBtn = document.querySelector(".skip-next-btn");



prevSongBtn.addEventListener("click", () => {

    const currentPlayerId = player.getVideoData().video_id;

    // Handling default playlist song change

    if (isClickOnDefaultPlaylist) {
        playPreviousSong(vidsArray, currentPlayerId);
    }

    // Handling user playlist song change

    if (isClickOnUserPlaylist) {
        playPreviousSong(allVideosOfCurrUser, currentPlayerId);
    }

    // Handling Library song change

    if (window.innerWidth <= 768 && isClickOnUserPlaylist == false && isClickOnDefaultPlaylist == false) {
        let allLibrarySongs = document.querySelectorAll(".music-card");
        allLibrarySongs = Array.from(allLibrarySongs);
        for (let song of allLibrarySongs) {
            if (currentPlayerId == song.id) {
                const indexOfCurrentSong = allLibrarySongs.indexOf(song);
                // console.log(player.getVideoData().video_id);

                if (indexOfCurrentSong == 0) {
                    const getLastSongId = allLibrarySongs[allLibrarySongs.length - 1].id;
                    changeVideo(getLastSongId);
                    for (let song of allLibrarySongs) {
                        song.style.boxShadow = "none";
                    }
                    allLibrarySongs[allLibrarySongs.length - 1].style.boxShadow = "0px 0px 10px teal";
                    document.querySelector(".author").innerText = allLibrarySongs[allLibrarySongs.length - 1].firstChild.innerText;
                } else {
                    const getSongId = allLibrarySongs[indexOfCurrentSong - 1].id;
                    changeVideo(getSongId);
                    for (let song of allLibrarySongs) {
                        song.style.boxShadow = "none";
                    }
                    allLibrarySongs[indexOfCurrentSong - 1].style.boxShadow = "0px 0px 10px teal";
                    document.querySelector(".author").innerText = allLibrarySongs[indexOfCurrentSong - 1].firstChild.innerText;
                }
            }
        }

    }


});


nextSongBtn.addEventListener("click", () => {

    const currentPlayerId = player.getVideoData().video_id;

    // Handling default playlist song change

    if (isClickOnDefaultPlaylist) {
        playNextSong(vidsArray, currentPlayerId);
    }

    // Handling User playlist song change

    if (isClickOnUserPlaylist) {
        playNextSong(allVideosOfCurrUser, currentPlayerId);
    }

    // Handling Library song change

    if (window.innerWidth <= 768 && isClickOnUserPlaylist == false && isClickOnDefaultPlaylist == false) {
        let allLibrarySongs = document.querySelectorAll(".music-card");
        allLibrarySongs = Array.from(allLibrarySongs);
        for (let song of allLibrarySongs) {
            if (currentPlayerId == song.id) {
                let indexOfCurrentSong = allLibrarySongs.indexOf(song);
                if (indexOfCurrentSong == 0) {
                    const getNextSongId = allLibrarySongs[indexOfCurrentSong + 1].id;
                    changeVideo(getNextSongId);
                    for (let song of allLibrarySongs) {
                        song.style.boxShadow = "none";
                    }
                    allLibrarySongs[indexOfCurrentSong + 1].style.boxShadow = "0px 0px 10px teal";
                    document.querySelector(".author").innerText = allLibrarySongs[indexOfCurrentSong + 1].firstChild.innerText;
                } else {

                    if (indexOfCurrentSong + 1 >= allLibrarySongs.length) {
                        indexOfCurrentSong = 0;
                        const getNextSongId = allLibrarySongs[indexOfCurrentSong].id;
                        changeVideo(getNextSongId);
                        for (let song of allLibrarySongs) {
                            song.style.boxShadow = "none";
                        }
                        allLibrarySongs[indexOfCurrentSong].style.boxShadow = "0px 0px 10px teal";
                        document.querySelector(".author").innerText = allLibrarySongs[indexOfCurrentSong].firstChild.innerText;
                    } else {
                        const getNextSongId = allLibrarySongs[indexOfCurrentSong + 1].id;
                        changeVideo(getNextSongId);
                        for (let song of allLibrarySongs) {
                            song.style.boxShadow = "none";
                        }
                        allLibrarySongs[indexOfCurrentSong + 1].style.boxShadow = "0px 0px 10px teal";
                        document.querySelector(".author").innerText = allLibrarySongs[indexOfCurrentSong + 1].firstChild.innerText;

                    }

                }
            }
        }

    }
});




function onPlayerStateChange(event) {
    setDuration();
    // console.log(event.target.videoTitle);
    document.querySelector(".song-name").innerText = event.target.videoTitle.slice(0, 30);
    switch (event.data) {
        case YT.PlayerState.UNSTARTED:
            playBtnIcon.classList.replace("fa-pause", "fa-play");
            break;
        case YT.PlayerState.PLAYING:
            playBtnIcon.classList.replace("fa-play", "fa-pause");
            updateProgress();
            break;
        case YT.PlayerState.PAUSED:
        case YT.PlayerState.ENDED:
        case YT.PlayerState.CUED:
            playBtnIcon.classList.replace("fa-pause", "fa-play");
            break;
    }
}

function changeVideo(videoId) {
    if (player && typeof player.loadVideoById === "function") {
        player.loadVideoById(videoId);
        loadYtThumbnail(coverImg, videoId);
    }
}

let preservePlaylistName;
const updatePlaylist = function() {
    document.querySelector(".edit-form-container").querySelector("h3").innerHTML = this.parentElement.parentElement.children[0].innerHTML;
    preservePlaylistName = this.parentElement.parentElement.children[0].innerHTML;
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            document.querySelector(".edit-form-container").style.display = "flex";
            document.querySelector(".top-nav").style.display = "none";
            document.querySelector(".bottom-nav").style.display = "none";
            cardContainer.style.display = "none";
            document.querySelector(".local-search-container").style.display = "none";
        }, 300);
    } else {
        document.querySelector(".edit-form-container").style.display = "flex";
        cardContainer.style.display = "none";
        document.querySelector(".local-search-form").style.display = "none";
    }
}

// Print Video cards when user is logged in

for (let playlist of allPlaylistOfCurrUser) {
    createPlaylist(allVideosOfCurrUser, playlist, updatePlaylist);
}


// Click on card and change video

if (document.querySelector(".card")) {
    const allCard = document.querySelectorAll(".card");
    // console.log(allCard)
    for (let card of allCard) {
        card.addEventListener("click", function () {
            const id = this.id;
            changeVideo(id);
            // console.log(this.classList)
            if (this.classList.contains("user-playlist")) {
                isClickOnUserPlaylist = true;
                isClickOnDefaultPlaylist = false;
            } else {
                isClickOnDefaultPlaylist = true;
                isClickOnUserPlaylist = false;
            }
            document.querySelector(".author").innerText = this.children[2].innerText;
            if (window.innerWidth <= 768) {
                const musicPlayerContainer = document.querySelector(".right");
                musicPlayerContainer.style.display = "flex";
                cardContainer.style.display = "none";
                document.querySelector(".top-nav").style.display = "none";
                document.querySelector(".bottom-nav").style.display = "none";

            }
        });
    }
}

if (document.querySelector(".music-card")) {
    const allMusicCard = document.querySelectorAll(".music-card");
    for (let card of allMusicCard) {
        card.addEventListener("click", function () {
            const id = this.id;
            changeVideo(id);
            document.querySelector(".author").innerText = this.firstElementChild.innerText;

            isClickOnDefaultPlaylist = false;
            isClickOnUserPlaylist = false;

            const musicPlayerContainer = document.querySelector(".right");
            musicPlayerContainer.style.display = "flex";
            cardContainer.style.display = "none";
            const libraryContainer = document.querySelector(".music-list-container");
            libraryContainer.style.display = "none";
            document.querySelector(".top-nav").style.display = "none";
            document.querySelector(".bottom-nav").style.display = "none";

            const allMusicCard = document.querySelectorAll(".music-card");

            for (let i = 0; i < allMusicCard.length; i++) {
                allMusicCard[i].style.boxShadow = "none";
            }
            this.style.boxShadow = "0px 0px 10px teal";
        });
    }
}



const setDuration = () => {
    const duration = player.getDuration();
    const hours = Math.floor((Math.floor(duration / 60)) / 60) > 10 ? Math.floor((Math.floor(duration / 60)) / 60) : ("0" + Math.floor((Math.floor(duration / 60)) / 60));
    const mins = Math.floor((duration % 3600) / 60) > 9.9 ? Math.floor((duration % 3600) / 60) : ("0" + Math.floor((duration % 3600) / 60));
    const sec = Math.floor(duration % 60) > 10 ? Math.floor(duration % 60) : ("0" + Math.floor(duration % 60));
    if (hours > 0) {
        document.querySelector(".duration-right").innerText = `${hours}:${mins}:${sec}`;
    } else {
        document.querySelector(".duration-right").innerText = `${mins}:${sec}`;
    }
}


// Update progress bar

const progressFill = document.querySelector(".progress-fill");
const progressBall = document.querySelector(".progress-ball");

function updateProgress() {
    const currentTime = player.getCurrentTime(); // Total Seconds
    // console.log(currentTime)
    const duration = player.getDuration();
    const hours = Math.floor((Math.floor(currentTime / 60)) / 60) > 10 ? Math.floor((Math.floor(currentTime / 60)) / 60) : ("0" + Math.floor((Math.floor(currentTime / 60)) / 60));
    const mins = Math.floor((currentTime % 3600) / 60) > 9.9 ? Math.floor((currentTime % 3600) / 60) : ("0" + Math.floor((currentTime % 3600) / 60));
    const sec = Math.floor(currentTime % 60) > 9.9 ? Math.floor(currentTime % 60) : ("0" + Math.floor(currentTime % 60));
    if (hours > 0) {
        document.querySelector(".duration-left").innerText = `${hours}:${mins}:${sec}`;
    } else {
        document.querySelector(".duration-left").innerText = `${mins}:${sec}`;
    }
    const percent = (currentTime / duration) * 100;
    progressFill.style.setProperty('--progress-width', percent + '%');
    progressBall.style.left = percent + "%";
    requestAnimationFrame(updateProgress);
}


// click on progress bar to change current duration

const progressBar = document.querySelector(".progress-bar");

progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const percent = clickX / width;
    const duration = player.getDuration();

    player.seekTo(duration * percent);
});



// Draggable progress bar

let isDragging = false;

progressBall.addEventListener("mousedown", () => {
    isDragging = true;
});

document.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        const percent = parseFloat(progressBall.style.left) / 100;
        const duration = player.getDuration();
        player.seekTo(duration * percent);
    }
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const rect = progressBar.getBoundingClientRect();
    let x = e.clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percent = (x / rect.width) * 100;

    progressFill.style.setProperty('--progress-width', percent + '%');
    progressBall.style.left = percent + "%";
});

// For touch screens

progressBall.addEventListener("touchstart", () => {
    isDragging = true;
});

document.addEventListener("touchend", () => {
    if (isDragging) {
        isDragging = false;
        const percent = parseFloat(progressBall.style.left) / 100;
        const duration = player.getDuration();
        player.seekTo(duration * percent);
    }
});

document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const rect = progressBar.getBoundingClientRect();
    let x = touch.clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = (x / rect.width) * 100;

    progressFill.style.setProperty('--progress-width', percent + '%');
    progressBall.style.left = percent + '%';
});



// Player Cover Toggle

const dots = document.querySelectorAll(".controls button");
for (let dot of dots) {
    dot.addEventListener("click", function () {
        for (let DOT of dots) {
            DOT.classList.remove("active");
        }
        this.classList.add("active");
        if ((this.classList.value == "right-btn active")) {
            document.querySelector(".placeholder-img").style.left = "0";
        }
        else if ((this.classList.value == "left-btn active")) {
            if (window.innerWidth <= 600) {
                document.querySelector(".placeholder-img").style.left = "90vw";
            } else if(window.innerWidth > 600 && window.innerWidth <= 768) {
                document.querySelector(".placeholder-img").style.left = "90vw";
            } else {
                document.querySelector(".placeholder-img").style.left = "255px";
            }
        }
    });
}


const videoNotification = document.querySelector(".notification");
const closeNotificationBtn = document.querySelector(".close-notification");
closeNotificationBtn.addEventListener("click", () => {
    videoNotification.style.display = "none";
});


// Search on YouTube

const searchCardContainer = document.querySelectorAll(".search-card-container");
const closePlaylistBoxBtn = document.querySelector(".close-playlist-box");
closePlaylistBoxBtn.addEventListener("click", () => {
    document.querySelector(".new-playlist-conatiner").style.display = "none";
    cardContainer.style.display = "flex";
    if (window.innerWidth > 768) {
        document.querySelector(".local-search-form").style.display = "block";
    }
    if (window.innerWidth <= 768) {
        document.querySelector(".top-nav").style.display = "flex";
        document.querySelector(".bottom-nav").style.display = "flex";
        cardContainer.style.display = "flex";
    }
});


const createNewPlaylistBtn = document.querySelector(".create-new-playlist-btn");
createNewPlaylistBtn.addEventListener("click", () => {
    if (window.innerWidth > 768) {
        document.querySelector(".new-playlist-conatiner").style.display = "flex";
        cardContainer.style.display = "none";
        document.querySelector(".local-search-form").style.display = "none";

    }
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            document.querySelector(".top-nav").style.display = "none";
            document.querySelector(".bottom-nav").style.display = "none";
            document.querySelector(".new-playlist-conatiner").style.display = "block";
            document.querySelector(".local-search-container").style.display = "none";
            document.querySelector(".user-container").style.display = "none";
            document.querySelector(".music-list-container").style.display = "none";
            document.querySelector(".right").style.display = "none";
            cardContainer.style.display = "none";
        }, 300)
    }
});


// Playlist Name Creation

const playlistNameForm = document.querySelector(".playlist-name-container form");
const playlistNameInputField = playlistNameForm.querySelector("input");
const playlistNameDoneBtn = document.querySelector(".name-done-btn");


playlistNameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (playlistNameInputField.value == "") return;
    document.querySelector(".playlist-name").style.display = "block";
    document.querySelector(".playlist-name").innerText = playlistNameInputField.value;
    preservePlaylistName = playlistNameInputField.value;
    playlistNameDoneBtn.style.display = "block";
    playlistNameInputField.value = "";
});


const allQuickPicksBtns = document.querySelectorAll(".suggestion-btns button");

for (let btn of allQuickPicksBtns) {
    btn.addEventListener("click", function () {
        document.querySelector(".playlist-name").style.display = "block";
        document.querySelector(".playlist-name").innerHTML = this.innerHTML;
        preservePlaylistName = this.innerHTML;
        playlistNameDoneBtn.style.display = "block";
    });
}


const globalSearchForm = document.querySelector(".global-search-form");
const globalInputField = globalSearchForm.querySelector("input");

playlistNameDoneBtn.addEventListener("click", function () {
    document.querySelector(".new-playlist-conatiner .playlist-name-container").style.display = "none";
    document.querySelector(".new-playlist-conatiner .h4").style.display = "none";
    document.querySelector(".new-playlist-conatiner .suggestion-btns").style.display = "none";
    this.style.display = "none";
    document.querySelector(".playlist-name").style.marginTop = "0px";
    if (window.innerWidth <= 768) {
        document.querySelector(".playlist-name").style.marginTop = "10px";

    }
    document.querySelector(".playlist-name").innerHTML = preservePlaylistName + ` &nbsp;&nbsp;&nbsp;&nbsp;<button>Edit<i style="color: black;" class="fa-solid fa-pen"></i></button>`;
    globalSearchForm.style.display = "block";
    document.querySelector(".playlist-name button").addEventListener("click", function () {
        document.querySelector(".playlist-name").style.marginTop = "20px";
        document.querySelector(".new-playlist-conatiner .playlist-name-container").style.display = "block";
        document.querySelector(".new-playlist-conatiner .h4").style.display = "block";
        document.querySelector(".new-playlist-conatiner .suggestion-btns").style.display = "flex";
        // globalSearchForm.style.display = "none";
        this.style.display = "none";
        playlistNameDoneBtn.style.display = "block";
    });
});


globalSearchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = globalInputField.value;
    await showSearchResult(query, searchCardContainer[0], preservePlaylistName);
    globalInputField.value = "";
});

const allSearchBtn = document.querySelectorAll(".search-options button");
for (let btn of allSearchBtn) {
    btn.addEventListener("click", function () {
        globalInputField.value = this.innerText;
    });
}


document.querySelector(".edit-search-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = document.querySelector(".edit-search-form input").value;
    await showSearchResultAndUpdate(query, searchCardContainer[1], preservePlaylistName);
    document.querySelector(".edit-search-form input").value = "";
});


// Local Search

const localSearchForm = document.querySelector(".local-search-form");

if (window.innerWidth > 768) {
    localSearchForm.addEventListener("click", function () {
        document.querySelector(".local-search-container").style.display = "flex";
        cardContainer.style.display = "none";
        this.style.boxShadow = "0 0 10px rgba(77, 163, 255, 0.4)";
        this.style.borderColor = "#4da3ff";
    });
}

// let moveToNextVideo = false;

localSearchForm.addEventListener("submit", (event) => {
    getLocalSearchData(allVideosOfCurrUser, event);
    if (document.querySelector(".searched-card")) {
        const allSearchedCard = document.querySelectorAll(".searched-card");
        for (let searchedCard of allSearchedCard) {
            searchedCard.addEventListener("click", function () {
                changeVideo(this.id);
                if (window.innerWidth <= 768) {
                    document.querySelector(".local-search-container").style.display = "none";
                    document.querySelector(".right").style.display = "flex";
                }
            });
        }
    }
});

document.querySelector(".close-local-search-box").addEventListener("click", () => {
    document.querySelector(".local-search-container").style.display = "none";
    cardContainer.style.display = "flex";
    localSearchForm.style.boxShadow = "0px 0px 0px red";
    localSearchForm.style.borderColor = "rgba(255, 255, 255, 0.12)";
});


// Profile section

document.querySelector(".close-edit-form").addEventListener("click", () => {
    document.querySelector(".edit-form-container").style.display = "none";
    if (window.innerWidth <= 768) {
        document.querySelector(".top-nav").style.display = "flex";
        document.querySelector(".bottom-nav").style.display = "flex";
    }
    if (window.innerWidth > 768) {
        document.querySelector(".local-search-form").style.display = "block";
    }
    cardContainer.style.display = "flex";
});

if (window.innerWidth > 768) {
    const profileBtn = document.querySelector(".profile-container img");
    profileBtn.style.cursor = "pointer";

    profileBtn.addEventListener("click", () => {
        document.querySelector(".user-container-desktop").style.display = "block";
    });

    document.querySelector(".user-container-close-btn").style.cursor = "pointer";
    document.querySelector(".user-container-close-btn").addEventListener("click", () => {
        document.querySelector(".user-container-desktop").style.display = "none";
    });
}


// Image upload

if (currentUser == null) {
    userCantUpload();
}

if (window.innerWidth <= 768) {
    const imgUploadField = document.querySelector("#image-input-mobile");
    const cropDoneBtn = document.querySelector("#crop-done-mobile");
    imgUploadField.addEventListener("change", uploadImage);
    cropDoneBtn.addEventListener("click", uploadFinalImage);
}

const imgUploadFieldDesk = document.querySelector("#image-input-desktop");
imgUploadFieldDesk.addEventListener("change", uploadImage);

const cropDoneBtnDesk = document.querySelector("#crop-done-desktop");
cropDoneBtnDesk.addEventListener("click", uploadFinalImage);


// Authentication section

const passwordToggleBtn1 = document.querySelector("#toggle-password1");
passwordToggleBtn1.addEventListener("click", passwordTogglerFunction1);


const passwordToggleBtn2 = document.querySelector("#toggle-password2");
passwordToggleBtn2.addEventListener("click", passwordTogglerFunction2);


const openSignupFormBtn = document.querySelector(".open-signup-form");
openSignupFormBtn.addEventListener("click", openSignUpForm);

if (document.querySelector(".login-btn")) {
    const loginFormOpener = document.querySelector(".login-btn");
    const signupFormOpener = document.querySelector(".signup-btn");

    loginFormOpener.addEventListener("click", openLoginForm)

    signupFormOpener.addEventListener("click", openSignUpForm2)
}
