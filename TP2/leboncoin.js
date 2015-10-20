"use strict";
var description = {
		"Price": "price",
		"Brand": "brand",
		"Model": "model",
		"Year": "year",
		"KM": "km",
		"Fuel": "fuel",
		"Gearbox": "gearbox"

	};

var leboncoin = function (link, callback)
{


var http = require('http')
var bl = require('bl')

http.get(link, function (response) {
  response.pipe(bl(function (err, data) {
    if (err)
      {
				callback(err);
				return;
			}
    var data = data.toString()

		var theprice = data.substring(data.indexOf('<span class="price"')+53,data.indexOf('<span class="price"')+59)

    var brand = data.substring(data.indexOf('<td itemprop="brand">')+21,data.indexOf('<td itemprop="model">')-123)
    var model = data.substring(data.indexOf('<td itemprop="model">')+21,data.indexOf('<td itemprop="releaseDate">')-112)
    var releaseDate = data.substring(data.indexOf('<td itemprop="releaseDate">')+73,data.indexOf('<td itemprop="releaseDate">')+77)
    var km = data.substring(data.indexOf('<td itemprop="releaseDate">')+286,data.indexOf('KM</td>'))
    var fuel = data.substring(data.indexOf('Carburant :</th>')+41,data.indexOf('de vitesse :</th>')-93)
    //var gearbox = data.substring(data.indexOf('de vitesse :</th>')+42,data.lastIndexOf('<div class="clearer">')-464)
		if(data.indexOf('rence : </th>')>-1){
    var gearbox = data.substring(data.indexOf("de vitesse :</th>")+42,data.indexOf('rence : </th>')-389);
  }
  else{
    var gearbox = data.substring(data.indexOf("de vitesse :")+42,data.lastIndexOf('class="clearer"')-469);
  }

		description.Price = theprice;
		description.Brand = brand;
		description.Model = model;
		description.Year = releaseDate;
		description.KM = km;
		description.Fuel = fuel;
		description.Gearbox = gearbox;


		callback(description);

  }))
})

}

exports.leboncoin = leboncoin;
