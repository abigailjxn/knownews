const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

/////SCRAPER TOOLS/////
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = 3000;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


/////ROUTES/////
require("./routes/article-api-routes")(app, axios, cheerio);

/////CONNECT TO MONGO DB/////
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/knownewsdb";
mongoose.connect( MONGODB_URI, {useNewUrlParser: true});


/////START SERVER/////
app.listen(PORT, function(){
    console.log("App running on PORT" + PORT);
})