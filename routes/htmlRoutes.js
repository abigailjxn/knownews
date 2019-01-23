const db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/home", function(req, res) {
      res.render("index", {
        msg: "Welcome!"
      });
   
  });

}