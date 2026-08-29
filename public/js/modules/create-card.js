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

const cardContainer = document.querySelector(".card-container");

export function createPlaylist(allVideosOfCurrUser, playlist, updatePlaylist) {
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
                const res = await fetch("api/tunes/delete", {
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
    addMoreCardsToPlaylist.addEventListener("click", updatePlaylist);
    myPlaylistWrapper.appendChild(addMoreCardsToPlaylist);

    myPlaylistContainer.appendChild(myPlaylistWrapper);
    cardContainer.prepend(myPlaylistContainer);

}

export function createVideoCard(videoId, videoName, channelName) {
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

    

    return card;

}



// create library music card

export function createMusicCard(videoId, videoName, channelName) {

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

    

    return musicCard;
}