var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("search");
});

app.get("/results", function (req, res) {
  var query = req.query.search;
  request("http://api.tvmaze.com/search/shows?q=" + query, function (
    error,
    response,
    body
  ) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", { data: data });
    }
  });
});

app.listen(process.env.PORT, function () {
  console.log("server started");
});
