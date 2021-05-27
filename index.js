const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static('dist'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
     response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});



//created a new endpoint in the server
//--> server proxy

const API_MAP = process.env.API_MAP;

//app.get(path,callback): Routes HTTP GET requests to the specified path with the specified callback function.

app.get('/aqi/:city', async (request, response) => {

 let city= request.params.city;
 let url_city=`http://www.mapquestapi.com/geocoding/v1/address?key=${API_MAP}&location=${city}`

 const fetch_response = await fetch(url_city);
 const json=await fetch_response.json();
 response.json(json);   // Return Object JSON
});                     //get latitude,longitude


app.get('/geo/:latlon',async (request, response) => {

 let latlon = request.params.latlon.split(',');
 console.log(latlon);
 let lat =latlon[0];
 let lon = latlon[1];
 console.log(lat,lon);
 const API_AQI=process.env.API_AQI
 let url_aqi= `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_AQI}`

  const geo_response = await fetch(url_aqi);
  const geo_json=await geo_response.json();
  response.json(geo_json); // Return Object JSON
});                        //get  AQI,pm10,pm25
