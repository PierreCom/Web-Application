"use strict";

// We will scrap Leboncoin Website to extract the Html and take properties that
// we need and transform properties from html to json. Then put in entry the json of Leboncoin
//  into the parameters of La centrale website to get the argus price.

var data = {
"Brand" : "Renault",
"Model" : "Clio",
"Year" : 2005,
"KM" : 15000,
"Fuel" : "Essence",
"Gearbox" : "Manuelle"
  };

 var result ={
   "Brand" : data.Brand,
   "Model" : data.Model,
   "Year" : data.Year,
   "KM" : data.KM,
   "Fuel" : data.Fuel,
   "Gearbox" : data.Gearbox
 }

console.log(result);
