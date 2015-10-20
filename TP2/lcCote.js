/*var async = require("async")

    var sync = true;
    var data = null;
    cote(links, function(coteArgus){
      data = coteArgus;
      sync = false;
    });
    while(sync) {require('deasync').sleep(100);}*/


var cote = function (links,callback)
{

    var http = require('http')
    var bl = require('bl')

var coteArgus = new Array();

    var index = 0;
    async.forEachOf(links, function(value,key,callback) {
        returnprice(value,function(res){

        coteArgus[index] = res;

        index++;
       callback();
        });
      }, function (err) {
  if (err) console.error(err.message+" erreur");
  for(var i = 0; i < coteArgus.length; i++){

  }
callback(coteArgus)

})

}

function returnprice(link,callback)
{
  var http = require('http')
  var bl = require('bl')
http.get('http://www.lacentrale.fr/'+link,
function (response) {
  response.pipe(bl(function (err, data) {
    if (err)
      {
        callback(err+" erreur");
        return;
      }
    var data = data.toString()


    var newcoteArgus = data.substring(data.indexOf('<div class="tx12">')+85,data.indexOf(';</span>')-5)
    //console.log(newcoteArgus)
    callback(newcoteArgus)
    }))
  })
}

exports.cote = cote;
