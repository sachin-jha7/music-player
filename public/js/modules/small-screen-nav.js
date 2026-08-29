// Navigation for small screen

const cardContainer = document.querySelector(".card-container");

const navigationForSmallScreen = () => {
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
}

export default navigationForSmallScreen;