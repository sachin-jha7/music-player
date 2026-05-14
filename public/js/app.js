const cardContainer = document.querySelector(".card-container");
const cardWrapper = document.querySelector(".card-wrapper");

// console.log(document.querySelector(".bottom-nav"));


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
        videoId: "sUf2PtEZris",
        videoTitle: "Shaky ( Official #Video ) Sanju Rathod Ft. Isha Malviya | G-Spark",
        channelName: "Sanju Rathod SR"
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


const coverImg = document.querySelector(".placeholder-img img");
loadYtThumbnail(coverImg, "zaFGQEIcetM");



// Create Card

for (let vid of vidsArray) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", vid.videoId);

    const img = document.createElement("img");
    loadYtThumbnail(img, vid.videoId);
    card.appendChild(img);

    const vidName = document.createElement("p");
    vidName.classList.add("vid-name");
    if (vid.videoTitle.length > 20) {
        vidName.innerText = vid.videoTitle.slice(0, 30) + "...";
    } else {
        vidName.innerText = vid.videoTitle;
    }

    card.appendChild(vidName);

    const channelName = document.createElement("p");
    channelName.classList.add("channel-name");
    channelName.innerText = vid.channelName;
    card.appendChild(channelName);

    card.addEventListener("click", function () {
        const id = this.id;
        changeVideo(id);
        document.querySelector(".author").innerText = this.children[2].innerText;
        if (window.innerWidth <= 768) {
            const musicPlayerContainer = document.querySelector(".right");
            musicPlayerContainer.style.display = "flex";
            cardContainer.style.display = "none";
            document.querySelector(".top-nav").style.display = "none";
            document.querySelector(".bottom-nav").style.display = "none";

        }
    });

    cardWrapper.appendChild(card);
}

// Create Library Card

if (window.innerWidth <= 768) {
    const musicCardContainer = document.querySelector(".music-list-wrapper");
    for (let song of vidsArray) {
        const musicCard = document.createElement("div");
        musicCard.classList.add("music-card");
        // musicCard.classList.add(`${song.channelName}`);
        musicCard.setAttribute("id", song.videoId);

        const span = document.createElement("span");
        span.innerText = song.channelName;
        span.style.display = "none";
        musicCard.appendChild(span);

        const musicIcon = document.createElement("i");
        musicIcon.classList.add("fa-brands", "fa-itunes-note");
        musicCard.appendChild(musicIcon);

        const musicName = document.createElement("p");
        musicName.innerText = song.videoTitle.slice(0, 30) + " ...";
        musicCard.appendChild(musicName);

        musicCard.addEventListener("click", function () {
            const id = this.id;
            changeVideo(id);
            document.querySelector(".author").innerText = this.firstElementChild.innerText;
            // console.log(this.firstElementChild.innerText);
            const musicPlayerContainer = document.querySelector(".right");
            musicPlayerContainer.style.display = "flex";
            cardContainer.style.display = "none";
            const libraryContainer = document.querySelector(".music-list-container");
            libraryContainer.style.display = "none";
            document.querySelector(".top-nav").style.display = "none";
            document.querySelector(".bottom-nav").style.display = "none";
        });

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
        // playerVars: {
        //     'origin': window.location.origin,
        //     'enablejsapi': 1
        // },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
    });
}

function onPlayerReady(event) {
    // event.target.playVideo();
    console.log("video is ready to play :)");
    document.querySelector(".song-name").innerText = event.target.videoTitle.slice(0, 20);
    // document.querySelector(".song-name").innerText = "Majboor | Sheheryar ";
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
        // updateProgress();
        playBtnIcon.classList.remove("fa-pause");
        playBtnIcon.classList.add("fa-play");
    }
});



// Change Song

const prevSongBtn = document.querySelector(".skip-prev-btn");
const nextSongBtn = document.querySelector(".skip-next-btn");

prevSongBtn.addEventListener("click", () => {

    const currentPlayerId = player.getVideoData().video_id;
    for (let info of vidsArray) {
        if (currentPlayerId == info.videoId) {
            if (vidsArray.indexOf(info) == 0) {
                changeVideo(vidsArray[vidsArray.length - 1].videoId);
                document.querySelector(".author").innerText = vidsArray[vidsArray.length - 1].channelName;
            } else {
                changeVideo(vidsArray[vidsArray.indexOf(info) - 1].videoId);
                document.querySelector(".author").innerText = vidsArray[vidsArray.indexOf(info) - 1].channelName;
            }
        }
    }
});

nextSongBtn.addEventListener("click", () => {
    const currentPlayerId = player.getVideoData().video_id;
    for (let info of vidsArray) {
        if (currentPlayerId == info.videoId) {
            if (vidsArray.indexOf(info) == 0) {
                changeVideo(vidsArray[vidsArray.indexOf(info) + 1].videoId);
                document.querySelector(".author").innerText = vidsArray[vidsArray.indexOf(info) + 1].channelName;
            } else {
                if (vidsArray.indexOf(info) + 1 >= vidsArray.length) {
                    changeVideo(vidsArray[0].videoId);
                    document.querySelector(".author").innerText = vidsArray[0].channelName;
                } else {
                    changeVideo(vidsArray[vidsArray.indexOf(info) + 1].videoId);
                    document.querySelector(".author").innerText = vidsArray[vidsArray.indexOf(info) + 1].channelName;
                }
            }
        }
    }
});




function onPlayerStateChange(event) {
    setDuration();
    // console.log(event.target.videoTitle);
    document.querySelector(".song-name").innerText = event.target.videoTitle.slice(0, 20);

    // document.querySelector(".current-song-btn img").style.display = "block";
    switch (event.data) {
        case YT.PlayerState.UNSTARTED:
            playBtnIcon.classList.replace("fa-pause", "fa-play");
            break;
        case YT.PlayerState.PLAYING:
            playBtnIcon.classList.replace("fa-play", "fa-pause");
            // document.querySelector(".current-song-btn").style.color = "#1DB954";
            updateProgress();
            break;
        case YT.PlayerState.PAUSED:
        case YT.PlayerState.ENDED:
        case YT.PlayerState.CUED:
            playBtnIcon.classList.replace("fa-pause", "fa-play");
            // document.querySelector(".current-song-btn").style.color = "black";
            break;
    }
}

function changeVideo(videoId) {
    if (player && typeof player.loadVideoById === "function") {
        player.loadVideoById(videoId);
        loadYtThumbnail(coverImg, videoId);
        // console.log(player.videoTitle);
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
        // if (player && playBtnIcon.classList.contains("fa-pause")) {
        //     this.style.color = "#1DB954";
        // } else {
        //     this.style.color = "#9cff00";
        // }
    });


    document.querySelector(".back-btn").addEventListener("click", function () {
        musicPlayerContainer.style.display = "none";
        document.querySelector(".top-nav").style.display = "flex";
        document.querySelector(".bottom-nav").style.display = "flex";
        // if(libraryContainer.style.display == "")
        for (let btn of allSmBtn) {
            btn.style.color = "#b4acac";
        }
        searchContainer.style.display = "none";
        libraryContainer.style.display = "none";
        cardContainer.style.display = "block";
        homeBtn.style.color = "#9cff00";
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
    });

    document.querySelector(".create-playlist-btn").addEventListener("click", () => {
        setTimeout(() => {
            searchBtn.click();
        }, 300);
    })
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



// Search on YouTube

const searchForm = document.querySelector(".search-form");
const inputElement = searchForm.querySelector("input");
const queryText = document.querySelector(".query-text");
const searchCardContainer = document.querySelector(".search-card-container");

const videoNotification = document.querySelector(".video-saved-notification");
const closeNotificationBtn = document.querySelector(".close-notification");
closeNotificationBtn.addEventListener("click", () => {
    videoNotification.style.display = "none";
});

let playlistItemId;
let playlistItemName;
let playlistItemAuthor;


const storageKey = "MyPlaylist";

const localStorePlayList = JSON.parse(localStorage.getItem(storageKey));

const playlistCardWrapper = document.querySelector(".playlist-card-wrapper");


if (localStorePlayList.length > 0) {
    document.querySelector(".create-playlist-btn").style.display = "none";
} else {
    document.querySelector(".create-playlist-btn").style.display = "block";
}

for (let content of localStorePlayList) {
    const playlistCard = document.createElement("div");
    playlistCard.classList.add("playlist-card");
    playlistCard.setAttribute("id", content.videoId);

    const img = document.createElement("img");
    loadYtThumbnail(img, content.videoId);
    console.log(img)
    playlistCard.appendChild(img);

    const vidName = document.createElement("p");
    vidName.classList.add("vid-name");
    vidName.innerText = content.videoName.slice(0, 30) + "...";
    playlistCard.appendChild(vidName);

    const authorName = document.createElement("p");
    authorName.classList.add("channel-name");
    authorName.innerText = content.channelName;
    playlistCard.appendChild(authorName);

    playlistCard.addEventListener("click", function () {
        const id = this.id;
        changeVideo(id);
        document.querySelector(".author").innerText = this.children[2].innerText;
        if (window.innerWidth <= 768) {
            const musicPlayerContainer = document.querySelector(".right");
            musicPlayerContainer.style.display = "flex";
            cardContainer.style.display = "none";
            document.querySelector(".top-nav").style.display = "none";
            document.querySelector(".bottom-nav").style.display = "none";

        }
    })

    playlistCardWrapper.appendChild(playlistCard);

}

// console.log(localStorage.getItem(storageKey));

    searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const query = inputElement.value;
        if (query == "") return;
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

                    const playlistCard = document.createElement("div");
                    playlistCard.classList.add("playlist-card");
                    playlistCard.setAttribute("id", newVideo.videoId);

                    const img = document.createElement("img");
                    loadYtThumbnail(img, newVideo.videoId);
                    console.log(img)
                    playlistCard.appendChild(img);

                    const vidName = document.createElement("p");
                    vidName.classList.add("vid-name");
                    vidName.innerText = newVideo.videoName.slice(0, 30) + "...";
                    playlistCard.appendChild(vidName);

                    const authorName = document.createElement("p");
                    authorName.classList.add("channel-name");
                    authorName.innerText = newVideo.channelName;
                    playlistCard.appendChild(authorName);

                    playlistCard.addEventListener("click", function () {
                        const id = this.id;
                        changeVideo(id);
                        document.querySelector(".author").innerText = this.children[2].innerText;
                        if (window.innerWidth <= 768) {
                            const musicPlayerContainer = document.querySelector(".right");
                            musicPlayerContainer.style.display = "flex";
                            cardContainer.style.display = "none";
                            document.querySelector(".top-nav").style.display = "none";
                            document.querySelector(".bottom-nav").style.display = "none";

                        }
                    });

                    playlistCardWrapper.prepend(playlistCard);

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


                
               

                

