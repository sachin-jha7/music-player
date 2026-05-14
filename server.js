const express = require('express');
const app = express();
const youtubesearchapi = require('youtube-search-api');

const path = require('path');
app.set("view engine", "ejs");

// To access views folder from parent directory
app.set("views", path.join(__dirname, "/views"));

// To access use CSS & JS
app.use(express.static(path.join(__dirname, "/public")));

// To Parse req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
  res.redirect("/tunes");
});


app.get("/tunes", (req, res) => {
  res.render("index.ejs");
});

app.post("/tunes", async (req, res) => {
  let query = req.body.search;
  query = query.toLowerCase();
  
  if(query.includes("c#")) {
    query = query.replace("c#","c sharp");
  }
  if(query.includes("f#")) {
    query = query.replace("f#","f sharp");
  }
  if(query.includes("c++")) {
    query = query.replace("c++","c plus plus");
  }
  if(query.includes("++")) {
    query = query.replace("++"," plus plus ");
  }
  if(query.includes("--")) {
    query = query.replace("++"," minus minus ");
  }
  if(query.includes("&")) {
    query = query.replace("&"," and ");
  }
  const results = await youtubesearchapi.GetListByKeyword(query, false, 11);
  const searchResult = results.items;
  res.json(searchResult);
  // res.render("index.ejs", { query, searchResult });
});





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});