import "../CSS/app.css";

const latlng=[42.638426,12.674297];

//create a map

let mymap= L.map("myMap").setView(latlng,3);


L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW1hbnVlbGVtYXJyYTkzIiwiYSI6ImNrbXg5c25jczBtdWMycHFzcTc1N2RzYnoifQ.oCOb1P_vTp2jdYczVeVBXQ`,
 {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }
).addTo(mymap);

//adds marker
let marker=L.marker(latlng).addTo(mymap);

//returns the element that has the ID ("cityAQI") attribute with the specifed value
let aqi=document.getElementById('cityAQI');

//detects "AQI" of a city
aqi.addEventListener("click",async function (){

 let str=document.getElementById('city').value;

 // "if-else" checks if "str=document.getElementById('city').value" is an empty string
 if(str.length===0){
   console.log("city ​​not entered");
   alert("Enter city eg: Livorno --- or use the Geolocation button");
  }else{
   let city=document.getElementById('city').value;

   const urlaqi= `aqi/${city}`;
   const latlon=await fetch(urlaqi)
   .then(response =>response.json())
   .catch(err => console.error(err));



   let lat = latlon.results[0].locations[0].displayLatLng.lat;
   console.log(lat);
   let long=latlon.results[0].locations[0].displayLatLng.lng;
   console.log(long);


   let waqi_url =`geo/${lat},${long}`;
   const waqi_city=await fetch(waqi_url)
   .then(response=>response.json())
   .catch(err => console.error(err));

   mymap.setView(new L.LatLng(lat,long),12);

   //move marker
   let newLatLng=new L.LatLng(lat,long);
   marker.setLatLng(newLatLng);

   //AQI
   if(waqi_city.data.aqi===undefined){

     document.getElementById('aqi').textContent="AQI = --";
     //test console
     console.log("survey station not present or value not detected");

    }else{
     document.getElementById('aqi').textContent=`AQI = ${waqi_city.data.aqi}`;
    }

    //pm10
    if(waqi_city.data.iaqi.pm10 === undefined){

     document.getElementById('pm10').textContent="pm10 = --";
     //test console
     console.log("pm10 value not detected");

    }else{
      document.getElementById('pm10').textContent=`pm10 = ${waqi_city.data.iaqi.pm10.v} µg/m^3`;
    }

    //pm25
    if(waqi_city.data.iaqi.pm25 === undefined){

     document.getElementById('pm25').textContent="pm25 = --";
     //test console
     console.log("pm25 value not detected");

    }else{
     document.getElementById('pm25').textContent=`pm25 = ${waqi_city.data.iaqi.pm25.v} µg/m^3`;
    }
  }

});


//code geolocation --- button "Geolocation"
let geoloco=document.getElementById("geoloc");

geoloco.addEventListener("click",async function(){
 //verify if geolocation is supported
 if(navigator.geolocation){
   navigator.geolocation.getCurrentPosition(showPosition);
  }else{
    alert("Geolocation is not supported by this browser");
  }


 async function showPosition(position){

   let lat=position.coords.latitude;
   let long= position.coords.longitude;

   //url_path -- index.js-->framework Express
   let url_geo=`geo/${lat},${long}`;
   let loc_response=  await fetch(url_geo)
   .then(response=>response.json())
   .catch(err => console.error(err));

   mymap.setView(new L.LatLng(lat,long),16);
   //represents a geographic point
   let newLatLng=new L.LatLng(lat,long)
   //new position marker
   marker.setLatLng(newLatLng);


   //AQI
   if(loc_response.data.aqi===undefined){

     document.getElementById('aqi').textContent="AQI = --";

     //test console
     console.log("survey station not present or value not detected");

    }else{
      document.getElementById('aqi').textContent=`AQI = ${loc_response.data.aqi}`;
    };

   //pm10
   if(loc_response.data.iaqi.pm10===undefined){

     document.getElementById('pm10').textContent="pm10 = --";

     //test console
     console.log("pm10 value not detected");

    }else{
     document.getElementById('pm10').textContent=`pm10 = ${loc_response.data.iaqi.pm10.v} µg/m^3`;
    }

    //pm25

    if(loc_response.data.iaqi.pm25 === undefined){

     document.getElementById('pm25').textContent="pm25 = --";

     //test console
     console.log("pm25 value not detected");
    }else{
     document.getElementById('pm25').textContent=`pm25 = ${loc_response.data.iaqi.pm25.v} µg/m^3`;
    }

  }
});
