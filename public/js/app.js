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
const localStorePlayList = JSON.parse(localStorage.getItem(storageKey));

if (window.innerWidth <= 768) {
    const musicCardContainer = document.querySelector(".music-list-wrapper");

    if (storageKey in localStorage) {
        for (let content of localStorePlayList) {

            const musicCard = createMusicCard(content.videoId, content.videoName, content.channelName);

            musicCardContainer.appendChild(musicCard);

        }
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
        playPreviousSong(localStorePlayList, currentPlayerId);
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
        playNextSong(localStorePlayList, currentPlayerId);

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
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const hours = Math.floor((Math.floor(currentTime / 60)) / 60) > 10 ? Math.floor((Math.floor(currentTime / 60)) / 60) : ("0" + Math.floor((Math.floor(currentTime / 60)) / 60));
    const mins = Math.floor(currentTime / 60) > 9.9 ? Math.floor(currentTime / 60) : ("0" + Math.floor(currentTime / 60));
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
    const searchContainer = document.querySelector(".search-container");
    // console.log(musicPlayerContainer);

    const homeBtn = document.querySelector(".home-btn");
    homeBtn.style.color = "#9cff00";
    const playingSongBtn = document.querySelector(".current-song-btn");
    const libraryBtn = document.querySelector(".all-song-btn");
    const searchBtn = document.querySelector(".search-btn");
    const allSmBtn = document.querySelectorAll(".bottom-nav button");

    // playingSongBtn.querySelector("img").style.display = "none";
    homeBtn.addEventListener("click", function () {
        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }
        this.style.color = "#9cff00";
        // musicPlayerContainer.style.display = "none";
        libraryContainer.style.display = "none";
        searchContainer.style.display = "none";
        cardContainer.style.display = "block";
        document.querySelector(".top-nav").style.display = "flex";
        previousClick = "home-btn";
    });

    libraryBtn.addEventListener("click", function () {
        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }
        this.style.color = "#9cff00";
        musicPlayerContainer.style.display = "none";
        cardContainer.style.display = "none";
        searchContainer.style.display = "none";
        document.querySelector(".top-nav").style.display = "none";
        libraryContainer.style.display = "flex";
        previousClick = "library-btn";
    });

    playingSongBtn.addEventListener("click", function () {
        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }
        this.style.color = "#9cff00";
        cardContainer.style.display = "none";
        libraryContainer.style.display = "none";
        searchContainer.style.display = "none";
        document.querySelector(".top-nav").style.display = "none";
        document.querySelector(".bottom-nav").style.display = "none";
        musicPlayerContainer.style.display = "flex";
    });

    searchBtn.addEventListener("click", function () {
        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }
        this.style.color = "#9cff00";
        document.querySelector(".top-nav").style.display = "none";
        cardContainer.style.display = "none";
        libraryContainer.style.display = "none";
        searchContainer.style.display = "block";
        previousClick = "search-btn";
    });


    document.querySelector(".back-btn").addEventListener("click", function () {
        musicPlayerContainer.style.display = "none";

        document.querySelector(".bottom-nav").style.display = "flex";

        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }

        if (previousClick == "home-btn") {
            searchContainer.style.display = "none";
            libraryContainer.style.display = "none";
            document.querySelector(".top-nav").style.display = "flex";
            cardContainer.style.display = "block";
            homeBtn.style.color = "#9cff00";
        } else if (previousClick == "library-btn") {
            document.querySelector(".top-nav").style.display = "none";
            searchContainer.style.display = "none";
            cardContainer.style.display = "none";
            libraryContainer.style.display = "flex";
            libraryBtn.style.color = "#9cff00";
        } else if (previousClick == "search-btn") {
            document.querySelector(".top-nav").style.display = "none";
            cardContainer.style.display = "none";
            searchContainer.style.display = "none";
            searchContainer.style.display = "block";
            searchBtn.style.color = "#9cff00";
        }


    });


    document.querySelector(".create-playlist-btn").addEventListener("click", () => {
        setTimeout(() => {
            searchBtn.click();
        }, 300);
    });
}

const inputElement = document.querySelector("input");
console.log(inputElement)
document.querySelector(".create-playlist-btn").addEventListener("click", () => {
    inputElement.focus();
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
            } else {
                document.querySelector(".placeholder-img").style.left = "255px";
            }
        }
    });
}




const videoNotification = document.querySelector(".video-saved-notification");
const closeNotificationBtn = document.querySelector(".close-notification");
closeNotificationBtn.addEventListener("click", () => {
    videoNotification.style.display = "none";
});




const playlistCardWrapper = document.querySelector(".playlist-card-wrapper");


if (storageKey in localStorage) {
    document.querySelector(".create-playlist-btn").style.display = "none";
    for (let content of localStorePlayList) {

        const playlistCard = createVideoCard(content.videoId, content.videoName, content.channelName);
        playlistCard.classList.add("user-playlist");
        playlistCardWrapper.appendChild(playlistCard);

    }
} else {
    document.querySelector(".create-playlist-btn").style.display = "block";
}


// Search on YouTube

const searchForm = document.querySelector(".search-form");
const queryText = document.querySelector(".query-text");
const searchCardContainer = document.querySelector(".search-card-container");

if (window.innerWidth > 768) {
    const closeSearchBoxBtn = document.querySelector(".close-search-box");
    closeSearchBoxBtn.addEventListener("click", () => {
        document.querySelector(".search-container").style.display = "none";
        cardContainer.style.display = "flex";
    });
}


let playlistItemId;
let playlistItemName;
let playlistItemAuthor;


searchForm.addEventListener("submit", async (event) => {
    // console.log("form submitted")
    try {
        event.preventDefault();
        const query = inputElement.value;
        if (query == "") return;
        if (window.innerWidth > 768) {
            document.querySelector(".search-container").style.display = "flex";
            cardContainer.style.display = "none";
        }
        document.querySelector(".loading-box").style.display = "flex";
        const res = await fetch("/tunes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ search: query })
        });
        const data = await res.json();
        document.querySelector(".loading-box").style.display = "none";
        // console.log(data);
        queryText.innerText = `Showing results for: ${query}`;
        inputElement.value = "";


        searchCardContainer.innerHTML = "";

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
                searchCard.appendChild(addToPlayListBtn);

                const saveLocalBtn = document.createElement("button");
                saveLocalBtn.classList.add("store-btn");
                saveLocalBtn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Save Locally`;
                saveLocalBtn.style.display = "none";
                searchCard.appendChild(saveLocalBtn);

                const saveToAccountBtn = document.createElement("button");
                saveToAccountBtn.classList.add("store-btn");
                saveToAccountBtn.innerHTML = `<i class="fa-solid fa-cloud"></i> Save to Account`;
                saveToAccountBtn.style.display = "none";
                searchCard.appendChild(saveToAccountBtn);

                // Create User's Plalist


                let newVideo;

                addToPlayListBtn.addEventListener("click", function () {
                    playlistItemId = this.parentElement.id;
                    playlistItemName = this.parentElement.children[1].innerText;
                    playlistItemAuthor = this.parentElement.children[2].innerText;
                    newVideo = {
                        videoId: playlistItemId,
                        videoName: playlistItemName,
                        channelName: playlistItemAuthor
                    };
                    // localStorePlayList.push(obj);
                    addToPlayListBtn.style.display = "none";
                    saveLocalBtn.style.display = "block";
                    saveToAccountBtn.style.display = "block";
                });


                saveLocalBtn.addEventListener("click", function () {
                    // console.log(localStorePlayList);
                    let savedVideos = localStorage.getItem(storageKey);

                    if (savedVideos) {
                        savedVideos = JSON.parse(savedVideos);
                    } else {
                        savedVideos = [];
                    }
                    savedVideos.unshift(newVideo);
                    localStorage.setItem(storageKey, JSON.stringify(savedVideos));

                    const playlistCard = createVideoCard(newVideo.videoId, newVideo.videoName, newVideo.channelName);
                    playlistCard.classList.add("user-playlist");
                    playlistCardWrapper.prepend(playlistCard);

                    if (window.innerWidth <= 768) {
                        const musicCardContainer = document.querySelector(".music-list-wrapper");

                        const musicCard = createMusicCard(newVideo.videoId, newVideo.videoName, newVideo.channelName);

                        musicCardContainer.prepend(musicCard);

                    }

                    document.querySelector(".create-playlist-btn").style.display = "none";
                    this.innerHTML = "&#10004; Saved";
                    this.style.backgroundColor = "#198754";
                    this.disabled = true;
                    videoNotification.style.display = "flex";
                });


                searchCardContainer.appendChild(searchCard);
            }
        }
    } catch (err) {
        console.log('error:', err);
    }
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
