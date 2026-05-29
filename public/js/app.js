const cardContainer = document.querySelector(".card-container");
const cardWrapper = document.querySelector(".card-wrapper");

// Default Playlist

const vidsArray = [
    {
        videoId: "zaFGQEIcetM",
        videoTitle: "Majboor | Sheheryar Rehan x Zoha Waseem | Music Video 2025 | Aap ka he kehna banta",
        channelName: "Sheheryar Rehan"
    },
    {
        videoId: "bP8ATWCvqzw",
        videoTitle: "Anuv Jain X Lost Stories - Arz Kiya Hai (Official Video) | Coke Studio Bharat",
        channelName: "Coke Studio India"
    },
    {
        videoId: "GVizJ_jpUnw",
        videoTitle: "Gehra Hua - Lyrical (Full Version) | Dhurandhar, Ranveer Singh,",
        channelName: "Saregama Music"
    },
    {
        videoId: "sKXmQ-srUzc",
        videoTitle: "Jxggi - Dirty Money (Official Music Video)",
        channelName: "Jxggi"
    },
    {
        videoId: "a3Ue-LN5B9U",
        videoTitle: "@SaiAbhyankkar - Aasa Kooda (Music Video) | Thejo Bharathwaj ",
        channelName: "Think Music India"
    },
    {
        videoId: "Oa0Dw1Zfb4g",
        videoTitle: "Soni Soni | Ishq Vishk Rebound | Rohit Saraf, Pashmin",
        channelName: "Tips Official"
    },

    {
        videoId: "SKek-mLl9L0",
        videoTitle: "Lyrical | Aavan Jaavan Song | War 2 | Hrithik Roshan, Kiara | Pritam, Arijit Singh, Nikhita, Amitabh",
        channelName: "YRF"
    },
    {
        videoId: "GnXyV87CbeM",
        videoTitle: "Ratiyaan - Hansika Pareek | @Sagnik Kolay | Soham M | @StereoAux Hits",
        channelName: "Hansika Pareek"
    },
    {
        videoId: "SlPhMPnQ58k",
        videoTitle: "Maroon 5 - Memories (Official Video)",
        channelName: "Maroon 5"
    },
    {
        videoId: "4VxdufqB9zg",
        videoTitle: "Nirvana - Something In The Way (Audio)",
        channelName: "Nirvana"
    },
    {
        videoId: "W8a4sUabCUo",
        videoTitle: "Ruth B. - Dandelions (Audio)",
        channelName: "Ruth B."
    },
    {
        videoId: "kJQP7kiw5Fk",
        videoTitle: "Luis Fonsi - Despacito ft. Daddy Yankee",
        channelName: "Luis Fonsi"
    }
]


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



// Create Card

for (let vid of vidsArray) {

    const card = createVideoCard(vid.videoId, vid.videoTitle, vid.channelName);

    // card.classList.remove("user-playlist");

    cardWrapper.appendChild(card);
}

// Create Library Card

// local storage key

const storageKey = "MyPlaylist";
// const localStorePlayList = JSON.parse(localStorage.getItem(storageKey));
if (storageKey in localStorage) {
    console.log("Video Deleted!, I did this because it's getting messy");
    localStorage.clear();
}

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

function onYouTubeIframeAPIReady() {
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

let isClickOnUserPlaylist = false;
let isClickOnDefaultPlaylist = true;

prevSongBtn.addEventListener("click", () => {

    // console.log(player.getVideoData());
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

const setDuration = () => {
    const duration = player.getDuration();
    const hours = Math.floor((Math.floor(duration / 60)) / 60) > 10 ? Math.floor((Math.floor(duration / 60)) / 60) : ("0" + Math.floor((Math.floor(duration / 60)) / 60));
    const mins = Math.floor(duration / 60) > 10 ? Math.floor(duration / 60) : ("0" + Math.floor(duration / 60));
    const sec = Math.floor(duration % 60) > 10 ? Math.floor(duration % 60) : ("0" + Math.floor(duration % 60));
    if (hours > 0) {
        document.querySelector(".duration-right").innerText = `${hours}:${mins % 60}:${sec}`;
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
        const percent = parseFloat(ball.style.left) / 100;
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



// Navigation for small screen

let previousClick = "home-btn";

if (window.innerWidth <= 768) {
    const musicPlayerContainer = document.querySelector(".right");
    const libraryContainer = document.querySelector(".music-list-container");
    const createNewPlaylistContainer = document.querySelector(".new-playlist-conatiner");
    const localSearchContainer = document.querySelector(".local-search-container");
    const userContainer = document.querySelector(".app-container").querySelector(".user-container");
    // console.log(userContainer)
    const authForm = document.querySelector(".auth-form-container");
    // console.log(musicPlayerContainer);

    const homeBtn = document.querySelector(".home-btn");
    homeBtn.style.color = "#9cff00";
    const playingSongBtn = document.querySelector(".current-song-btn");
    const libraryBtn = document.querySelector(".all-song-btn");
    const searchBtn = document.querySelector(".search-btn");
    const allSmBtn = document.querySelectorAll(".bottom-nav button");
    const userBtn = document.querySelector(".user-btn");

    // playingSongBtn.querySelector("img").style.display = "none";
    homeBtn.addEventListener("click", function () {
        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }
        this.style.color = "#9cff00";
        // musicPlayerContainer.style.display = "none";
        authForm.style.display = "none";
        libraryContainer.style.display = "none";
        createNewPlaylistContainer.style.display = "none";
        localSearchContainer.style.display = "none";
        userContainer.style.display = "none";
        cardContainer.style.display = "flex";
        document.querySelector(".top-nav").style.display = "flex";
        previousClick = "home-btn";
    });

    libraryBtn.addEventListener("click", function () {
        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }
        this.style.color = "#9cff00";
        authForm.style.display = "none";
        musicPlayerContainer.style.display = "none";
        userContainer.style.display = "none";
        cardContainer.style.display = "none";
        createNewPlaylistContainer.style.display = "none";
        document.querySelector(".top-nav").style.display = "none";
        localSearchContainer.style.display = "none";
        libraryContainer.style.display = "flex";
        previousClick = "library-btn";
    });

    playingSongBtn.addEventListener("click", function () {
        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }
        this.style.color = "#9cff00";
        authForm.style.display = "none";
        userContainer.style.display = "none";
        cardContainer.style.display = "none";
        libraryContainer.style.display = "none";
        createNewPlaylistContainer.style.display = "none";
        document.querySelector(".top-nav").style.display = "none";
        document.querySelector(".bottom-nav").style.display = "none";
        localSearchContainer.style.display = "none";
        musicPlayerContainer.style.display = "flex";
    });

    searchBtn.addEventListener("click", function () {
        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }
        this.style.color = "#9cff00";
        authForm.style.display = "none";
        localSearchContainer.style.display = "flex";
        userContainer.style.display = "none";
        cardContainer.style.display = "none";
        libraryContainer.style.display = "none";
        musicPlayerContainer.style.display = "none";
        document.querySelector(".top-nav").style.display = "none";
        document.querySelector(".bottom-nav").style.display = "flex";
        previousClick = "search-btn";

    });

    userBtn.addEventListener("click", function () {
        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }
        this.style.color = "#9cff00";
        authForm.style.display = "none";
        userContainer.style.display = "flex";
        localSearchContainer.style.display = "none";
        cardContainer.style.display = "none";
        libraryContainer.style.display = "none";
        musicPlayerContainer.style.display = "none";
        document.querySelector(".top-nav").style.display = "none";
        document.querySelector(".bottom-nav").style.display = "flex";
        previousClick = "user-btn";
    });


    document.querySelector(".back-btn").addEventListener("click", function () {
        musicPlayerContainer.style.display = "none";

        document.querySelector(".bottom-nav").style.display = "flex";

        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }

        if (previousClick == "home-btn") {
            document.querySelector(".top-nav").style.display = "flex";
            cardContainer.style.display = "flex";
            homeBtn.style.color = "#9cff00";
        } else if (previousClick == "library-btn") {
            document.querySelector(".top-nav").style.display = "none";
            libraryContainer.style.display = "flex";
            libraryBtn.style.color = "#9cff00";
        } else if (previousClick == "search-btn") {
            document.querySelector(".top-nav").style.display = "none";
            localSearchContainer.style.display = "flex";
            searchBtn.style.color = "#9cff00";
        } else if (previousClick == "user-btn") {
            document.querySelector(".top-nav").style.display = "none";
            userBtn.style.color = "#9cff00";
            userContainer.style.display = "flex";
        }
    });

}



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




const playlistCardWrapper = document.querySelector(".playlist-card-wrapper");


// Search on YouTube


const searchForm = document.querySelector(".local-search-form");
const queryText = document.querySelectorAll(".query-text");
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



// let playlistItemId;
// let playlistItemName;
// let playlistItemAuthor;


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
let preservePlaylistName;

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


const loader = document.querySelectorAll(".loading-box");

globalSearchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = globalInputField.value;
    await showSearchResult(query, searchCardContainer[0]);
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
    await showSearchResultAndUpdate(query, searchCardContainer[1]);
    document.querySelector(".edit-search-form input").value = "";
});


// Search Result for Update playlist route

const showSearchResultAndUpdate = async (query, container) => {

    if (query == "") return;

    loader[1].style.display = "flex";

    const res = await fetch("/tunes/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ search: query })
    });

    const data = await res.json();
    loader[1].style.display = "none";

    queryText[1].innerHTML = `Showing results for: <span style="color: #ff6b6b;">${query}</span>`;
    container.style.display = "grid";
    container.innerHTML = "";

    // Create Search Card

    for (let element of data) {

        if (element.type == "channel" || element.isLive) {
            continue;
        } else {
            // console.log(element.length.simpleText);
            const searchCard = document.createElement("div");
            searchCard.classList.add("search-card");
            searchCard.setAttribute("id", element.id);

            const imgBox = document.createElement("div");
            imgBox.classList.add("img-box");

            const img = document.createElement("img");
            loadYtThumbnail(img, element.id);
            imgBox.appendChild(img);

            const videoDuration = document.createElement("span");
            videoDuration.classList.add("video-duration");
            videoDuration.innerText = element.length.simpleText;
            imgBox.appendChild(videoDuration);

            searchCard.appendChild(imgBox);

            const videoName = document.createElement("p");
            videoName.classList.add("video-name");
            videoName.innerText = element.title;
            searchCard.appendChild(videoName);

            const channelName = document.createElement("p");
            channelName.classList.add("channel-name");
            channelName.innerText = element.channelTitle;
            searchCard.appendChild(channelName);

            const addToPlayListBtn = document.createElement("button");
            addToPlayListBtn.classList.add("add-to-playlist-btn");
            addToPlayListBtn.innerText = "Add To Playlist";


            // Create User's Playlist

            // let newVideo;

            addToPlayListBtn.addEventListener("click", async function () {
                const newVideo = {
                    videoId: this.parentElement.id,
                    videoName: this.parentElement.children[1].innerText,
                    channelName: this.parentElement.children[2].innerText,
                    preservePlaylistName
                };
                this.innerHTML = `Saving <i class="fa-solid fa-circle-notch fa-spin"></i>`;
                this.disabled = true;
                const reqSendingTime = Date.now();
                try {
                    const res = await fetch("/tunes/edit", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ newVideo })
                    });
                    const data = await res.json();
                    // console.log(data)
                    // console.log(Date.now());

                    const resReceivingTime = Date.now();
                    const timeElapsed = resReceivingTime - reqSendingTime;
                    // console.log(timeElapsed)
                    if (timeElapsed > 800) {
                        setTimeout(() => {
                            addToPlayListBtn.innerHTML = "&#10004; Saved";
                            addToPlayListBtn.style.background = "#198754";
                            document.querySelector(".finish-update-btn").style.display = "block";
                        }, timeElapsed);
                    } else {
                        setTimeout(() => {
                            addToPlayListBtn.innerHTML = "&#10004; Saved";
                            addToPlayListBtn.style.background = "#198754";
                            document.querySelector(".finish-update-btn").style.display = "block";
                        }, 800);
                    }

                } catch (err) {
                    console.log(err)
                }
            });

            searchCard.appendChild(addToPlayListBtn);

            container.appendChild(searchCard);
        }
    }

}


// Search result for create playlist route 

const showSearchResult = async (query, container) => {

    if (query == "") return;

    loader[0].style.display = "flex";

    const res = await fetch("/tunes/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ search: query })
    });

    const data = await res.json();
    loader[0].style.display = "none";

    queryText[0].innerHTML = `Showing results for: <span style="color: #ff6b6b;">${query}</span>`;
    container.style.display = "grid";
    container.innerHTML = "";

    // Create Search Card

    for (let element of data) {

        if (element.type == "channel" || element.isLive) {
            continue;
        } else {
            // console.log(element.length.simpleText);
            const searchCard = document.createElement("div");
            searchCard.classList.add("search-card");
            searchCard.setAttribute("id", element.id);

            const imgBox = document.createElement("div");
            imgBox.classList.add("img-box");

            const img = document.createElement("img");
            loadYtThumbnail(img, element.id);
            imgBox.appendChild(img);

            const videoDuration = document.createElement("span");
            videoDuration.classList.add("video-duration");
            videoDuration.innerText = element.length.simpleText;
            imgBox.appendChild(videoDuration);

            searchCard.appendChild(imgBox);

            const videoName = document.createElement("p");
            videoName.classList.add("video-name");
            videoName.innerText = element.title;
            searchCard.appendChild(videoName);

            const channelName = document.createElement("p");
            channelName.classList.add("channel-name");
            channelName.innerText = element.channelTitle;
            searchCard.appendChild(channelName);

            const addToPlayListBtn = document.createElement("button");
            addToPlayListBtn.classList.add("add-to-playlist-btn");
            addToPlayListBtn.innerText = "Add To Playlist";


            // Create User's Playlist

            // let newVideo;

            addToPlayListBtn.addEventListener("click", async function () {
                const newVideo = {
                    videoId: this.parentElement.id,
                    videoName: this.parentElement.children[1].innerText,
                    channelName: this.parentElement.children[2].innerText,
                    preservePlaylistName
                };
                this.innerHTML = `Saving <i class="fa-solid fa-circle-notch fa-spin"></i>`;
                this.disabled = true;
                const reqSendingTime = Date.now();
                try {
                    const res = await fetch("/tunes/save", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ newVideo })
                    });
                    const data = await res.json();
                    // console.log(data)
                    // console.log(Date.now());

                    if (data == "You're not logged-in") {
                        // console.log(data);
                        document.querySelector(".new-playlist-conatiner").style.display = "none";
                        // openSignupFormBtn.click();
                        const LoginForm = document.querySelector(".login-form");
                        const SignupForm = document.querySelector(".signup-form");


                        const loginFormOpener = document.querySelector(".login-btn");
                        const signupFormOpener = document.querySelector(".signup-btn");

                        loginFormOpener.addEventListener("click", () => {
                            cardContainer.style.display = "none";
                            SignupForm.style.display = "none";
                            document.querySelector(".auth-form-container").style.display = "flex";
                            if (window.innerWidth <= 768) {
                                document.querySelector(".auth-form-container").style.display = "block";
                                document.querySelector(".top-nav").style.display = "flex";
                                document.querySelector(".bottom-nav").style.display = "flex";
                            }
                            LoginForm.style.display = "flex";

                        });

                        signupFormOpener.addEventListener("click", () => {
                            LoginForm.style.display = "none";
                            cardContainer.style.display = "none";
                            document.querySelector(".auth-form-container").style.display = "flex";
                            if (window.innerWidth <= 768) {
                                document.querySelector(".auth-form-container").style.display = "block";
                                SignupForm.style.marginTop = "70px";
                                SignupForm.style.marginBottom = "70px";
                            }
                            SignupForm.style.display = "flex";
                        });
                        loginFormOpener.click();

                        return;
                    }

                    if (data == "Playlist already exists") {
                        document.querySelector(".notification").style.display = "flex";
                        addToPlayListBtn.innerHTML = "&#10006; Can't Save";
                        addToPlayListBtn.style.background = "#ff6b6b";
                        addToPlayListBtn.style.border = "1px solid rgba(255, 255, 255, 0.15)";
                        return;
                    }

                    const resReceivingTime = Date.now();
                    const timeElapsed = resReceivingTime - reqSendingTime;
                    // console.log(timeElapsed)
                    if (timeElapsed > 800) {
                        setTimeout(() => {
                            addToPlayListBtn.innerHTML = "&#10004; Saved";
                            addToPlayListBtn.style.background = "#198754";
                            // addToPlayListBtn.style.background = "rgba(16, 185, 129, 0.2)";
                            // addToPlayListBtn.style.border = "1px solid rgba(16, 185, 129, 0.3)";
                            document.querySelector(".finish-saving-btn").style.display = "block";
                        }, timeElapsed);
                    } else {
                        setTimeout(() => {
                            addToPlayListBtn.innerHTML = "&#10004; Saved";
                            addToPlayListBtn.style.background = "#198754";
                            document.querySelector(".finish-saving-btn").style.display = "block";
                            // addToPlayListBtn.style.background = "rgba(16, 185, 129, 0.2)";
                            // addToPlayListBtn.style.border = "1px solid rgba(16, 185, 129, 0.3)";
                        }, 800);
                    }

                } catch (err) {
                    console.log(err)
                }
            });

            searchCard.appendChild(addToPlayListBtn);

            container.appendChild(searchCard);
        }
    }

}


// Local Search

const localSearchForm = document.querySelector(".local-search-form");
const localSearchCardContainer = document.querySelector(".local-search-card-container");

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
    event.preventDefault();
    let query = localSearchForm.querySelector("input").value;
    if (query == "") return;
    document.querySelector(".local-search-container").querySelector(".query-text").innerHTML = `Showing results for: <span style="color: tomato">${query}</span>`;
    query = query.toUpperCase().trim();
    // console.log(query);
    localSearchCardContainer.innerHTML = "";
    if (allVideosOfCurrUser != null) {
        if (allVideosOfCurrUser.length > 0) {
            // console.log(allVideosOfCurrUser)
            let foundVideosNum = 0;
            for (let video of allVideosOfCurrUser) {
                if (query.includes(" ")) {
                    if (video.normalizedTitle) {
                        if (video.normalizedTitle.includes(query)) {
                            foundVideosNum += 1;
                            const card = document.createElement("div");
                            card.classList.add("card");
                            card.setAttribute("id", video.videoId);
                            const img = document.createElement("img");
                            img.src = loadYtThumbnail(img, video.videoId);
                            card.appendChild(img);

                            const videoTitle = document.createElement("p");
                            videoTitle.classList.add("video-name");
                            videoTitle.innerText = video.videoTitle;
                            card.appendChild(videoTitle);
                            const channelName = document.createElement("p");
                            channelName.classList.add("channel-name");
                            channelName.innerText = video.channelName;
                            card.appendChild(channelName);
                            const videoPlayBtn = document.createElement("button");
                            videoPlayBtn.classList.add("video-play-btn");
                            videoPlayBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i> Play`;
                            card.appendChild(videoPlayBtn);
                            card.addEventListener("click", () => {
                                changeVideo(video.videoId);
                                if (window.innerWidth <= 768) {
                                    document.querySelector(".local-search-container").style.display = "none";
                                    document.querySelector(".right").style.display = "flex";
                                }
                            });
                            localSearchCardContainer.appendChild(card);

                            // break;
                        }
                    }
                }
                for (let key of video.keyWords) {
                    if (query == key) {
                        foundVideosNum += 1;
                        const card = document.createElement("div");
                        card.classList.add("card");
                        card.setAttribute("id", video.videoId);

                        const img = document.createElement("img");
                        img.src = loadYtThumbnail(img, video.videoId);
                        card.appendChild(img);

                        const videoTitle = document.createElement("p");
                        videoTitle.classList.add("video-name");
                        videoTitle.innerText = video.videoTitle;
                        card.appendChild(videoTitle);
                        const channelName = document.createElement("p");
                        channelName.classList.add("channel-name");
                        channelName.innerText = video.channelName;
                        card.appendChild(channelName);

                        const videoPlayBtn = document.createElement("button");
                        videoPlayBtn.classList.add("video-play-btn");
                        videoPlayBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i> Play`;
                        card.appendChild(videoPlayBtn);
                        card.addEventListener("click", () => {
                            changeVideo(video.videoId);
                            if (window.innerWidth <= 768) {
                                document.querySelector(".local-search-container").style.display = "none";
                                document.querySelector(".right").style.display = "flex";
                            }
                        });

                        localSearchCardContainer.appendChild(card);
                        break;
                    }
                }
            }
            if (foundVideosNum == 0) {
                document.querySelector(".notification").style.display = "flex";
                document.querySelector(".notification").querySelector("p").innerText = "Video not found!";
            }
        } else {
            document.querySelector(".notification").style.display = "flex";
            document.querySelector(".notification").querySelector("p").innerText = "Video not found!";
        }
    }
    else {
        document.querySelector(".notification").style.display = "flex";
        document.querySelector(".notification").querySelector("p").innerText = "You're not Logged-In!";
    }
    localSearchForm.querySelector("input").value = "";
});

document.querySelector(".close-local-search-box").addEventListener("click", () => {
    document.querySelector(".local-search-container").style.display = "none";
    cardContainer.style.display = "flex";
    localSearchForm.style.boxShadow = "0px 0px 0px red";
    localSearchForm.style.borderColor = "rgba(255, 255, 255, 0.12)";
});



// Print Video cards when user is logged in

for (let playlist of allPlaylistOfCurrUser) {

    // One playlist goes each time

    const myPlaylistContainer = document.createElement("div");
    myPlaylistContainer.classList.add("myplaylist-container");

    const h2 = document.createElement("h2");
    h2.innerHTML = playlist.name;
    // console.log(playlist)
    // console.log()
    myPlaylistContainer.appendChild(h2);

    const myPlaylistWrapper = document.createElement("div");
    myPlaylistWrapper.classList.add("playlist-card-wrapper");
    myPlaylistWrapper.innerHTML = "";

    // console.log(allVideosOfCurrUser)

    for (let CurrVideo of allVideosOfCurrUser) {

        // one element (an object) goes each time

        if (playlist._id == CurrVideo.playlistId) {
            // if (card && !myPlaylistWrapper.contains(card.id)) {
            const card = createVideoCard(CurrVideo.videoId, CurrVideo.videoTitle, CurrVideo.channelName);
            card.classList.add("user-playlist");
            const delBtn = document.createElement("button");
            delBtn.classList.add("del-card-btn");
            delBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
            card.appendChild(delBtn);

            const removeBtn = document.createElement("button");
            removeBtn.innerText = "Remove";
            removeBtn.classList.add("btn", "remove-btn");
            card.appendChild(removeBtn);

            const cancelBtn = document.createElement("button");
            cancelBtn.innerText = "Cancel";
            cancelBtn.classList.add("btn", "cancel-btn");
            card.appendChild(cancelBtn);
            delBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                delBtn.style.display = "none";
                removeBtn.style.display = "block";
                cancelBtn.style.display = "block";
            });

            cancelBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                delBtn.style.display = "block";
                removeBtn.style.display = "none";
                cancelBtn.style.display = "none";
            });
            removeBtn.addEventListener("click", async function (event) {
                event.stopPropagation();
                // console.log(this.parentElement.parentElement.parentElement.firstChild.innerHTML);
                const playlistName = this.parentElement.parentElement.parentElement.firstChild.innerHTML;
                const videoId = this.offsetParent.id;
                removeBtn.innerHTML = `Removing <i class="fa-solid fa-circle-notch fa-spin"></i>`;
                removeBtn.disabled = true;
                const res = await fetch("/tunes/delete", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ videoId, playlistName })
                });
                const data = await res.json();
                if (data == "Playlist should be deleted") {
                    cardContainer.removeChild(myPlaylistContainer);
                } else {
                    myPlaylistWrapper.removeChild(this.offsetParent);
                }

            });
            myPlaylistWrapper.appendChild(card);
            // }

        } else {
            continue;
        }

    }

    // append the cardWrapper into  myPlalistContainer when moving to the next playlist
    // or ending of current playlist

    const addMoreCardsToPlaylist = document.createElement("div");
    addMoreCardsToPlaylist.classList.add("edit-playlist");
    const addBtn = document.createElement("button");
    addBtn.innerHTML = `<i class="fa-solid fa-square-plus"></i>`;
    addMoreCardsToPlaylist.appendChild(addBtn);
    addMoreCardsToPlaylist.addEventListener("click", function () {
        // console.log(this.parentElement.parentElement.children[0].innerHTML);
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
    });
    myPlaylistWrapper.appendChild(addMoreCardsToPlaylist);

    myPlaylistContainer.appendChild(myPlaylistWrapper);
    cardContainer.prepend(myPlaylistContainer);
}

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



// console.log(allVideos)


const saveToDb = async (videoId, videoName, channelName, playlistName) => {
    const res = await fetch("/tunes/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ videoId, videoName, channelName, playlistName })
    });

    // const data = await res.json();
}


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


// Image Upload

let cropper;

const imgUploadFieldDesk = document.querySelector("#image-input-desktop");
const previewImgDesk = document.querySelector("#preview-desktop");
const cropDoneBtnDesk = document.querySelector("#crop-done-desktop");
// console.log(imgUploadField);
// console.log(previewImg);
// console.log(cropDoneBtn);

if (window.innerWidth <= 768) {
    const imgUploadField = document.querySelector("#image-input-mobile");
    const previewImg = document.querySelector("#preview-mobile");
    const cropDoneBtn = document.querySelector("#crop-done-mobile");

    imgUploadField.addEventListener("change", (event) => {

        document.querySelector(".image-editor-box-mobile").style.display = "block";
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        previewImg.src = url;

        if (cropper) cropper.destroy();

        cropper = new Cropper(previewImg, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 1,
            responsive: true,
            background: false,
        });
    });

    cropDoneBtn.addEventListener("click", function () {
        this.innerHTML = `Saving <i class="fa-solid fa-circle-notch fa-spin"></i>`
        this.disabled = true;

        const canvas = cropper.getCroppedCanvas({
            width: 300,
            height: 300,
            imageSmoothingQuality: "high"
        });

        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append("image", blob);

            const res = await fetch("/tunes/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            console.log(data);
            document.querySelector(".user-img-mobile img").src = data.imageUrl;
            document.querySelector(".image-editor-box-mobile").style.display = "none";
            this.innerHTML = `Save`;
            this.disabled = false;
        });
    });
}


if (allVideosOfCurrUser == null) {
    if (window.innerWidth <= 768) {
        document.querySelector("#image-input-label-mobile").addEventListener("click", () => {
            document.querySelector("#image-input-label-mobile").innerHTML = `&#10006; Unauthorized`;
            document.querySelector("#image-input-label-mobile").style.background = "#ff6b6b";
            document.querySelector(".notification").style.display = "flex";
            document.querySelector(".notification p").innerText = "You're not logged in";
            const imgUploadField = document.querySelector("#image-input-mobile");
            imgUploadField.disabled = true;
        });
    }

    document.querySelector("#image-input-label-desktop").addEventListener("click", () => {
        document.querySelector("#image-input-label-desktop").innerHTML = `&#10006; Unauthorized`;
        document.querySelector("#image-input-label-desktop").style.background = "#ff6b6b";
        document.querySelector(".notification").style.display = "flex";
        document.querySelector(".notification p").innerText = "You're not logged in";
        imgUploadFieldDesk.disabled = true;
    });
}



imgUploadFieldDesk.addEventListener("change", (event) => {

    document.querySelector(".image-editor-box-desktop").style.display = "block";
    document.querySelector(".user-img-desktop").style.display = "none";
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    previewImgDesk.src = url;

    if (cropper) cropper.destroy();

    cropper = new Cropper(previewImgDesk, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        responsive: true,
        background: false,
    });
});


cropDoneBtnDesk.addEventListener("click", function () {
    this.innerHTML = `Saving <i class="fa-solid fa-circle-notch fa-spin"></i>`
    this.disabled = true;

    const canvas = cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        imageSmoothingQuality: "high"
    });

    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("image", blob);

        const res = await fetch("/tunes/upload", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        console.log(data);
        document.querySelector(".user-img-desktop img").src = data.imageUrl;
        document.querySelector(".user-container-desktop").style.display = "none";
        this.innerHTML = `Save`;
        this.disabled = false;
    });
});


// create video card


function createVideoCard(videoId, videoName, channelName) {

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", videoId);

    const img = document.createElement("img");
    loadYtThumbnail(img, videoId);
    card.appendChild(img);

    const vidName = document.createElement("p");
    vidName.classList.add("vid-name");
    if (videoName.length > 20) {
        vidName.innerText = videoName.slice(0, 30) + "...";
    } else {
        vidName.innerText = videoName;
    }

    card.appendChild(vidName);

    const videoAuthor = document.createElement("p");
    videoAuthor.classList.add("channel-name");
    videoAuthor.innerText = channelName;
    card.appendChild(videoAuthor);

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

    return card;

}


// create library music card

function createMusicCard(videoId, videoName, channelName) {
    const musicCard = document.createElement("div");
    musicCard.classList.add("music-card");
    musicCard.setAttribute("id", videoId);

    const span = document.createElement("span");
    span.innerText = channelName;
    span.style.display = "none";
    musicCard.appendChild(span);

    const musicIcon = document.createElement("i");
    musicIcon.classList.add("fa-brands", "fa-itunes-note");
    musicCard.appendChild(musicIcon);

    const musicName = document.createElement("p");
    musicName.innerText = videoName.slice(0, 30) + " ...";
    musicCard.appendChild(musicName);

    musicCard.addEventListener("click", function () {
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

    return musicCard;
}


// Authentication section

const passwordToggleBtn1 = document.querySelector("#toggle-password1");
const passwordInputField1 = document.querySelector("#password1");
passwordToggleBtn1.addEventListener("click", function () {

    if (this.classList.contains("fa-eye")) {
        this.classList.replace("fa-eye", "fa-eye-slash");
        passwordInputField1.type = "text";
    } else {
        this.classList.replace("fa-eye-slash", "fa-eye");
        passwordInputField1.type = "password";
    }
});
const passwordToggleBtn2 = document.querySelector("#toggle-password2");
const passwordInputField2 = document.querySelector("#password2");
passwordToggleBtn2.addEventListener("click", function () {

    if (this.classList.contains("fa-eye")) {
        this.classList.replace("fa-eye", "fa-eye-slash");
        passwordInputField2.type = "text";
    } else {
        this.classList.replace("fa-eye-slash", "fa-eye");
        passwordInputField2.type = "password";
    }
});

const openSignupFormBtn = document.querySelector(".open-signup-form");
openSignupFormBtn.addEventListener("click", function () {
    this.form.style.display = "none";
    document.querySelector(".signup-form").style.display = "flex";
    if (window.innerWidth <= 768) {
        document.querySelector(".signup-form").style.marginBottom = "70px";
        document.querySelector(".signup-form").style.marginTop = "70px";
    }
});


// LOGIN

const LoginForm = document.querySelector(".login-form");
const SignupForm = document.querySelector(".signup-form");

if (document.querySelector(".login-btn")) {
    const loginFormOpener = document.querySelector(".login-btn");
    const signupFormOpener = document.querySelector(".signup-btn");

    loginFormOpener.addEventListener("click", () => {
        cardContainer.style.display = "none";
        SignupForm.style.display = "none";
        document.querySelector(".auth-form-container").style.display = "flex";
        LoginForm.style.display = "flex";
        if (window.innerWidth <= 768) {
            document.querySelector(".auth-form-container").style.display = "block";
        }
    });

    signupFormOpener.addEventListener("click", () => {
        LoginForm.style.display = "none";
        cardContainer.style.display = "none";
        document.querySelector(".auth-form-container").style.display = "flex";
        if (window.innerWidth <= 768) {
            document.querySelector(".auth-form-container").style.display = "block";
            SignupForm.style.marginTop = "70px";
            SignupForm.style.marginBottom = "70px";
        }
        SignupForm.style.display = "flex";
    });
}



