"use strict";

      var rental = {
        "cars": [
          {
            "id": "p306",
            "vehicule": "peugeot 306",
            "pricePerDay": 20,
            "pricePerKm": 0.10
          }
        ],
        "rentals": [
          {
            "id": "1-pb-92",
            "driver": {
              "firstName": "Paul",
              "lastName": "Bismuth"
            },
            "carId": "p306",
            "pickupDate": "2015-09-12",
            "returnDate": "2015-09-12",
            "distance": 100,
            "options":{
              "deductibleReduction": false
            }
          },
          {
            "id": "2-rs-92",
            "driver": {
              "firstName": "Rebecca",
              "lastName": "Solanas"
            },
            "carId": "p306",
            "pickupDate": "2015-09-10",
            "returnDate": "2015-09-15",
            "distance": 300,
            "options":{
              "deductibleReduction": true
            }
          },
          {
            "id": "3-sa-92",
            "driver": {
              "firstName": " Sami",
              "lastName": "Ameziane"
            },
            "carId": "p306",
            "pickupDate": "2015-08-31",
            "returnDate": "2015-09-13",
            "distance": 1000,
            "options":{
              "deductibleReduction": true
            }
          }
        ],
        "rentalModifications": [
          {
            "id": 1,
            "rentalId": "1-pb-92" ,
            "end_date": "2015-09-13",
            "distance": 150
          },
          {
            "id": 2,
            "rentalId": "3-sa-92",
            "pickupDate": "2015-09-01"
          }
        ]
      };


      var distancePrice=0, timePrice=0;
      document.write("<div class=\"wrap\"><div class=\"table\"><ul>");
      for (var i = 0; i < rental.rentals.length; i++)
      {
        for (var j = 0; j < rental.cars.length; j++)
        {
          if(rental.rentals[i].carId===rental.cars[j].id)
          {
            var price = compute_price(rental.rentals[i].pickupDate,rental.rentals[i].returnDate, rental.rentals[i].distance, rental.cars[j].pricePerKm, rental.cars[j].pricePerDay);


            if (rental.rentals[i].options.deductibleReduction === true)
            {
              var reduction = deductible_reduction(rental.rentals[i].pickupDate,rental.rentals[i].returnDate);
              document.write("<li><div class=\"top\"><h1>"+rental.rentals[i].driver.firstName+" "+rental.rentals[i].driver.lastName+"</h1>");
              document.write("<div class=\"circle\">"+(price+reduction)+"€  </div></div>");
              var result = commission(price, rental.rentals[i].pickupDate,rental.rentals[i].returnDate,reduction);
              document.write(result+"</br><p><span>"+rental.cars[j].vehicule+"</span></p></br><p><span><div class=\"date\">pickupDate :</span>"+rental.rentals[i].pickupDate+"</p>"+"<p><span>returnDate: </span>"+rental.rentals[i].returnDate+"</p></div>");


            }
            else {
              var reduction = deductible_reduction(rental.rentals[i].pickupDate,rental.rentals[i].returnDate);
              document.write("<li><div class=\"top\"><h1>"+rental.rentals[i].driver.firstName+" "+rental.rentals[i].driver.lastName+"</h1>");
              document.write("<div class=\"circle\">"+(price+reduction)+"€  </div></div>");
              var result = commission(price, rental.rentals[i].pickupDate,rental.rentals[i].returnDate,reduction);
              document.write(result+"</br><p><span>"+rental.cars[j].vehicule+"</span></p></br><p><span><div class=\"date\">pickupDate :</span>"+rental.rentals[i].pickupDate+"</p>"+"<p><span>returnDate: </span>"+rental.rentals[i].returnDate+"</p></div></div></li>");
            }



          }

        }

      }
      document.write("</ul></div></div>");

function compute_price(begin, end, distance, pricePerKm, pricePerDay)
{
  var differenceDate= diffdate(begin,end);
  var sum = (distance * pricePerKm) + (differenceDate * pricePerDay);

  if(differenceDate > 1 && differenceDate <= 3)
  {
    sum = sum *0.90
  }
  else if(differenceDate > 4 && differenceDate <= 10){
    sum = sum *0.70
  }
  else if (differenceDate > 10){
    sum = sum *0.50
  }
  else {
    sum = sum;
  }
  return sum;
}




function diffdate(begin, end)
{
     var diff= Date.parse(end)-Date.parse(begin);
     return diff/(1000*24*60*60) +1;
 }

 function commission(price, begin, end, reduction)
{
  var duration = diffdate(begin,end);
  var insurance = (price * 0.30)/2;
  var assistance = (duration * 1);
  var drivy = (insurance - assistance + reduction);
  var owner = (price * 0.70);
  return "<div class=\"bottom\"><p><span>Insurance</span> :"+ insurance +"€</p>"
  +"<p><span>Assistance :</span>"+assistance+"€</p>"
  +"<p><span>Drivy :</span>"+drivy+"€</p>"
  +"<p><span>Owner: </span>"+owner+"€</p>";
}

function deductible_reduction(begin, end)
{
  var duration = diffdate(begin,end);
  var res = 4*duration;
  return res;
}
