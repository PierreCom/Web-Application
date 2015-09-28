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
            "distance": 100
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
            "distance": 300
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
            "distance": 1000
          }
        ]
      };

      var distancePrice=0, timePrice=0;

      for (var i = 0; i < rental.rentals.length; i++)
      {
        for (var j = 0; j < rental.cars.length; j++)
        {
          if(rental.rentals[i].carId===rental.cars[j].id)
          {
            distancePrice=rental.rentals[i].distance*rental.cars[j].pricePerKm;

            var differenceDate= diffdate(rental.rentals[i].pickupDate,rental.rentals[i].returnDate);
            var total=(differenceDate*rental.cars[j].pricePerDay)+distancePrice;


            if(differenceDate > 1 && differenceDate <= 3)
            {
              total = total *0.90
            }
            else if(differenceDate > 4 && differenceDate <= 10){
              total = total *0.70
            }
            else if (differenceDate > 10){
              total = total *0.50
            }
            else {
              total = total;
            }


            document.write("<u><b><i>"+rental.rentals[i].driver.firstName+" "+rental.rentals[i].driver.lastName+"</i></b></u>");
            document.write("<p>Rental Price of "+rental.cars[j].id +" is : "+total+"€ </p>");
            var result = commission(total, differenceDate);
            document.write(result);


          }

        }

      }

      function diffdate(begin, end)
{
     var diff= Date.parse(end)-Date.parse(begin);
     return diff/(1000*24*60*60) +1;
 }

 function commission(price, duration)
{
  var insurance = (price * 0.30)/2;
  var assistance = (duration * 1);
  var drivy = insurance - assistance;
  return "<p><b>Commission</b></br> Insurance :"+ insurance +"€</br>"+"Assistance :"
  +assistance+"€</br>"+"Drivy :"+drivy+"€</br></p>";
}
