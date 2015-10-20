var express = require('express');
var app = express();
var modulelb = require('./leboncoin');
var modulelc = require('./lacentrale');
var modulecote = require('./lcCote');
var path = require("path");

var bodyParser = require('body-parser');
app.use(bodyParser());


app.get('/form',function(req,res){
  app.use(express.static(__dirname + '/public'));
  res.render(path.join(__dirname+'/views/form.ejs'));
});




app.post('/index', function (req, res) {
app.use(express.static(__dirname + '/public'));



  modulelb.leboncoin(req.body.lclink,function(res1) {
    modulelc.lacentraleLinks(res1,function(res2) {
      modulecote.cote(res2,function(res3) {
        modulelc.lacentraleVersion(res1,function(res4) {

       res.render('myHtml.ejs', {nbCotes: res3.length, cotes: res3, versions : res4, price : res1.Price});

       });

     });

    });

 });

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
