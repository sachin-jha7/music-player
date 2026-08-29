// Search result for create playlist route 

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

const loader = document.querySelectorAll(".loading-box");
const queryText = document.querySelectorAll(".query-text");
const cardContainer = document.querySelector(".card-container");

export const showSearchResult = async (query, container, preservePlaylistName) => {

    if (query == "") return;

    loader[0].style.display = "flex";

    const res = await fetch("/api/tunes/search", {
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
                    const res = await fetch("/api/tunes/save", {
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
                            document.querySelector(".finish-saving-btn").style.display = "block";
                        }, timeElapsed);
                    } else {
                        setTimeout(() => {
                            addToPlayListBtn.innerHTML = "&#10004; Saved";
                            addToPlayListBtn.style.background = "#198754";
                            document.querySelector(".finish-saving-btn").style.display = "block";
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


// Search Result for Update playlist route

export const showSearchResultAndUpdate = async (query, container, preservePlaylistName) => {

    if (query == "") return;

    loader[1].style.display = "flex";

    const res = await fetch("/api/tunes/search", {
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
                    const res = await fetch("/api/tunes/edit", {
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