const localSearchForm = document.querySelector(".local-search-form");
const localSearchCardContainer = document.querySelector(".local-search-card-container");

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

export const getLocalSearchData = (allVideosOfCurrUser, event) => {
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
                            card.classList.add("searched-card");
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
                        card.classList.add("searched-card");
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
                        // card.addEventListener("click", () => {
                        //     changeVideo(video.videoId);
                        //     if (window.innerWidth <= 768) {
                        //         document.querySelector(".local-search-container").style.display = "none";
                        //         document.querySelector(".right").style.display = "flex";
                        //     }
                        // });

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
}