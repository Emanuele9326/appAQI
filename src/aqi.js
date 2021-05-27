import  "./app.css";

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

aqi.addEventListener("click",async function (){

 let str=document.getElementById('city').value;

 // "if-else" checks if "str=document.getElementById('city').value" is an empty string
 if(str.length===0){
   console.log("city ​​not entered");
   alert("Enter city eg: Livorno, IT --- or use the Geolocation button");
  }else{
   let city=document.getElementById('city').value;

   const urlaqi= `aqi/${city}`;
   const latlon=await fetch(urlaqi);
   const json_latlon= await latlon.json();


   let lat = json_latlon.results[0].locations[0].displayLatLng.lat;
   console.log(lat);
   let long=json_latlon.results[0].locations[0].displayLatLng.lng;
   console.log(long);


   let waqi_url =`geo/${lat},${long}`
   const waqi_city=await fetch(waqi_url);
   const waqi_json=await waqi_city.json();


   mymap.setView(new L.LatLng(lat,long),12);

   //move marker
   let newLatLng=new L.LatLng(lat,long)
   marker.setLatLng(newLatLng);

   //AQI
   if(waqi_json.data.aqi===undefined){

     document.getElementById('aqi').textContent="AQI = --"
     //test console
     console.log("survey station not present or value not detected");

    }else{
     document.getElementById('aqi').textContent=`AQI = ${waqi_json.data.aqi}`;
    }

    //pm10
    if(waqi_json.data.forecast.daily.pm10[0].avg===undefined){

     document.getElementById('pm10').textContent="pm10 = --"
     //test console
     console.log("value not detected");

    }else{
      document.getElementById('pm10').textContent=`pm10 = ${waqi_json.data.forecast.daily.pm10[0].avg} µg/m^3`;
    }

    //pm25
    if(waqi_json.data.forecast.daily.pm25[0].avg===undefined){

     document.getElementById('pm25').textContent="pm25 = --"
     //test console
     console.log("value not detected");

    }else{
     document.getElementById('pm25').textContent=`pm25 = ${waqi_json.data.forecast.daily.pm25[0].avg} µg/m^3`;
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
   let loc_response=  await fetch(url_geo);
   let loc_json=await loc_response.json();
   mymap.setView(new L.LatLng(lat,long),16);
   //represents a geographic point
   let newLatLng=new L.LatLng(lat,long)
   //new position marker
   marker.setLatLng(newLatLng);


   //AQI
   if(loc_json.data.aqi===undefined){

     document.getElementById('aqi').textContent="AQI = --"

     //test console
     console.log("survey station not present or value not detected");

    }else{
      document.getElementById('aqi').textContent=`AQI = ${loc_json.data.aqi}`;
    };

   //pm10
   if(loc_json.data.forecast.daily.pm10[0].avg===undefined){

     document.getElementById('pm10').textContent="pm10 = --"

     //test console
     console.log("value not detected");

    }else{
     document.getElementById('pm10').textContent=`pm10 = ${loc_json.data.forecast.daily.pm10[0].avg} µg/m^3`;
    }

    //pm25

    if(loc_json.data.forecast.daily.pm25[0].avg===undefined){

     document.getElementById('pm25').textContent="pm25 = --"

     //test console
     console.log("value not detected");
    }else{
     document.getElementById('pm25').textContent=`pm25 = ${loc_json.data.forecast.daily.pm25[0].avg} µg/m^3`;
    }

  }
});
