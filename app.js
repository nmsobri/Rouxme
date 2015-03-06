var express = require("express");
var app = express();
var swig = require("swig");
var routes = require("./routes");

app.set("view cache", false);
app.set("view engine", "html");
app.engine("html", swig.renderFile);
app.use(express.static(__dirname + '/public'));
app.locals.appData = require("./data.json");

app.get("/", routes.index);

app.get("/speakers/:name?", routes.speakers);

app.get("*", routes.error);

app.listen(80, function() {
    console.log("Server listen on port 80");
});