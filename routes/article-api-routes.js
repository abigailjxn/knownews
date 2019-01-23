const db = require("../models");

module.exports = function(app, axios, cheerio) {
    
    app.get("/scrape", function(req, res) {
        axios.get("https://mashable.com/category/tech/")
        .then(function(response){
            const $ = cheerio.load(response.data);

            $("article").each(function(i, element){
                const result = {};

                result.title = $(this)
                .children(".article-title a")
                .text();
                result.link = $(this)
                .children(".article-title a")
                .attr("href");
                result.img = $(this)
                .children(".article-img-container a img")
                .attr("src");
                result.excerpt = $(this)
                .children(".article-excerpt")
                .text();

                db.Article.create(result)
                .then(function(dbArticle){
                    console.log(dbArticle);
                })
                .catch(function(err){
                    console.log(err);
                })
            });
            res.send("Scrape Complete!");
        })
    })
}