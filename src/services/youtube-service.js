const youtubesearchapi = require('youtube-search-api');

const searchYouTubeVideos = async (query) => {
    
    query = query.trim().toLowerCase();

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
        query = query.replace("--", " minus minus ");
    }
    if (query.includes("&")) {
        query = query.replace("&", " and ");
    }
    const results = await youtubesearchapi.GetListByKeyword(query, false, 11);
    const searchResult = results.items;
    return searchResult;
}

module.exports = searchYouTubeVideos;