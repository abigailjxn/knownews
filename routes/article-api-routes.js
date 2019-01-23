const db = require("../models");

module.exports = function (app, axios, cheerio) {
    /////SCRAPE ROUTE/////
    app.get("/scrape", function (req, res) {
        axios.get("https://mashable.com/category/tech/")
            .then(function (response) {
                const $ = cheerio.load(response.data);

                $("article h2").each(function (i, element) {
                    const result = {};

                    result.title = $(this)
                        .children("a")
                        .text();
                    result.link = $(this)
                        .children("a")
                        .attr("href");
                    // result.img = $(this)
                    // .children(".article-img-container")
                    // .children("a")
                    // .chilren("img")
                    // .attr("src");
                    // result.excerpt = $(this)
                    // .children(".article-excerpt")
                    // .text();

                    db.Article.create(result)
                        .then(function (dbArticle) {
                            console.log(dbArticle);
                        })
                        .catch(function (err) {
                            console.log(err);
                        })

                });
                res.send("scrape complete!");
            })
    });
    /////GET ARTICLES IN MONGODB/////
    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle)
            })
            .catch(function (err) {
                res.json(err)
            });
    });
/////GET ARTICLE WITH COMMENTS/////
    app.get("/articles/:id", function(req, res){
        db.Article.findOne({_id: req.params.id})
        .populate("comment")
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err);
        });
    });
}