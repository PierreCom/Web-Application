"use strict";

      var rental = {
        "cars": [
          {
            "id": "p306",
            "vehicule": "peugeot 306",
            "pricePerDay": 20,
            "pricePerKm": 0.10
          },
          {
            "id": "rr-sport",
            "pricePerDay": 60,
            "pricePerKm": 0.30
          },
          {
            "id": "p-boxster",
            "pricePerDay": 100,
            "pricePerKm": 0.45
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
            "returnDate": "2015-09-14",
            "distance": 150
          },
          {
            "id": "2-rs-92",
            "driver": {
              "firstName": "Rebecca",
              "lastName": "Solanas"
            },
            "carId": "rr-sport",
            "pickupDate": "2015-09-09",
            "returnDate": "2015-09-13",
            "distance": 550
          },
          {
            "id": "3-sa-92",
            "driver": {
              "firstName": " Sami",
              "lastName": "Ameziane"
            },
            "carId": "p-boxster",
            "pickupDate": "2015-09-12",
            "returnDate": "2015-09-14",
            "distance": 100
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


            document.write("<u><b><i>"+rental.rentals[i].driver.firstName+" "+rental.rentals[i].driver.lastName+"</i></b></u>");
            document.write("<p>Rental Price of "+rental.cars[j].id +" is : "+total+"</p>");



          }

        }

      }

      function diffdate(begin, end) {
     var diff= Date.parse(end)-Date.parse(begin);
     return diff/(1000*24*60*60) +1;
 }
