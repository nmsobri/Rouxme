exports.index = function(req, res) {
    var appData = require("../data.json");
    var artwork = [];
    var artists = appData.speakers;

    appData.speakers.forEach(function(item){
        artwork = artwork.concat(item.artwork);
    });

    res.render("index", {
        page : "home",
        artwork: artwork,
        artists: artists
    });
};

exports.speakers = function(req, res) {
    var appData = require("../data.json");
    var artwork = [];
    var artists = [];

    appData.speakers.forEach(function(item){

        if (req.params.name !== undefined) {
            if (req.params.name === item.shortname) {
                artwork = artwork.concat(item.artwork);
                artists.push(item);
            }
        }
        else {
            artwork = artwork.concat(item.artwork);
            artists.push(item);
        }
    });

    res.render("speakers", {
        page: "artistList",
        artwork: artwork,
        artists:artists,
        id : req.params.name
    });
};

exports.error = function(req, res) {
    res.render("error");
};