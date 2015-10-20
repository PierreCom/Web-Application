var request = require("request");
var async = require("async");

var testcote = function(links, callback) {

  var coteArgus = [];

  async.mapSeries(links, function(link, nextLink) {

    request("http://www.website.com/" + link, function(err, response, body) {
       if (err) {
        // if error so, send to line 28 with a error, exit from loop.
        return nextLink(err);
       }

       var newcoteArgus = body.substring(
        body.indexOf("<div class='tx12'>") + 85,
        body.indexOf(";</span>") - 5
       );
       // pass to next link, and  add newcoteArgus to the final result
       console.log(newcoteArgus)
       nextLink(null, newcoteArgus);
    });
  },
  function(err, results) {

    // if there's some errors, so call with error
    if(err) return callback(err);

    // there's no errors so get results as second arg
    callback(null, results);
  });

};

exports.testcote = testcote;
