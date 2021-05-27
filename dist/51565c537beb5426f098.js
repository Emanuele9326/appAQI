function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import "./app.css";
var latlng = [42.638426, 12.674297]; //create a map

var mymap = L.map("myMap").setView(latlng, 3);
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW1hbnVlbGVtYXJyYTkzIiwiYSI6ImNrbXg5c25jczBtdWMycHFzcTc1N2RzYnoifQ.oCOb1P_vTp2jdYczVeVBXQ", {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'your.mapbox.access.token'
}).addTo(mymap); //adds marker

var marker = L.marker(latlng).addTo(mymap); //returns the element that has the ID ("cityAQI") attribute with the specifed value

var aqi = document.getElementById('cityAQI');
aqi.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var str, city, urlaqi, latlon, json_latlon, lat, _long, waqi_url, waqi_city, waqi_json, newLatLng;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          str = document.getElementById('city').value; // "if-else" checks if "str=document.getElementById('city').value" is an empty string

          if (!(str.length === 0)) {
            _context.next = 6;
            break;
          }

          console.log("city ​​not entered");
          alert("Enter city eg: Livorno, IT --- or use the Geolocation button");
          _context.next = 31;
          break;

        case 6:
          city = document.getElementById('city').value;
          urlaqi = "aqi/".concat(city);
          _context.next = 10;
          return fetch(urlaqi);

        case 10:
          latlon = _context.sent;
          _context.next = 13;
          return latlon.json();

        case 13:
          json_latlon = _context.sent;
          lat = json_latlon.results[0].locations[0].displayLatLng.lat;
          console.log(lat);
          _long = json_latlon.results[0].locations[0].displayLatLng.lng;
          console.log(_long);
          waqi_url = "geo/".concat(lat, ",").concat(_long);
          _context.next = 21;
          return fetch(waqi_url);

        case 21:
          waqi_city = _context.sent;
          _context.next = 24;
          return waqi_city.json();

        case 24:
          waqi_json = _context.sent;
          mymap.setView(new L.LatLng(lat, _long), 12); //move marker

          newLatLng = new L.LatLng(lat, _long);
          marker.setLatLng(newLatLng); //AQI

          if (waqi_json.data.aqi === undefined) {
            document.getElementById('aqi').textContent = "AQI = --"; //test console

            console.log("survey station not present or value not detected");
          } else {
            document.getElementById('aqi').textContent = "AQI = ".concat(waqi_json.data.aqi);
          } //pm10


          if (waqi_json.data.forecast.daily.pm10[0].avg === undefined) {
            document.getElementById('pm10').textContent = "pm10 = --"; //test console

            console.log("value not detected");
          } else {
            document.getElementById('pm10').textContent = "pm10 = ".concat(waqi_json.data.forecast.daily.pm10[0].avg, " \xB5g/m^3");
          } //pm25


          if (waqi_json.data.forecast.daily.pm25[0].avg === undefined) {
            document.getElementById('pm25').textContent = "pm25 = --"; //test console

            console.log("value not detected");
          } else {
            document.getElementById('pm25').textContent = "pm25 = ".concat(waqi_json.data.forecast.daily.pm25[0].avg, " \xB5g/m^3");
          }

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))); //code geolocation --- button "Geolocation"

var geoloco = document.getElementById("geoloc");
geoloco.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var showPosition, _showPosition;

  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _showPosition = function _showPosition3() {
            _showPosition = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(position) {
              var lat, _long2, url_geo, loc_response, loc_json, newLatLng;

              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      lat = position.coords.latitude;
                      _long2 = position.coords.longitude; //url_path -- index.js-->framework Express

                      url_geo = "geo/".concat(lat, ",").concat(_long2);
                      _context2.next = 5;
                      return fetch(url_geo);

                    case 5:
                      loc_response = _context2.sent;
                      _context2.next = 8;
                      return loc_response.json();

                    case 8:
                      loc_json = _context2.sent;
                      mymap.setView(new L.LatLng(lat, _long2), 16); //represents a geographic point

                      newLatLng = new L.LatLng(lat, _long2); //new position marker

                      marker.setLatLng(newLatLng); //AQI

                      if (loc_json.data.aqi === undefined) {
                        document.getElementById('aqi').textContent = "AQI = --"; //test console

                        console.log("survey station not present or value not detected");
                      } else {
                        document.getElementById('aqi').textContent = "AQI = ".concat(loc_json.data.aqi);
                      }

                      ; //pm10

                      if (loc_json.data.forecast.daily.pm10[0].avg === undefined) {
                        document.getElementById('pm10').textContent = "pm10 = --"; //test console

                        console.log("value not detected");
                      } else {
                        document.getElementById('pm10').textContent = "pm10 = ".concat(loc_json.data.forecast.daily.pm10[0].avg, " \xB5g/m^3");
                      } //pm25


                      if (loc_json.data.forecast.daily.pm25[0].avg === undefined) {
                        document.getElementById('pm25').textContent = "pm25 = --"; //test console

                        console.log("value not detected");
                      } else {
                        document.getElementById('pm25').textContent = "pm25 = ".concat(loc_json.data.forecast.daily.pm25[0].avg, " \xB5g/m^3");
                      }

                    case 16:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));
            return _showPosition.apply(this, arguments);
          };

          showPosition = function _showPosition2(_x) {
            return _showPosition.apply(this, arguments);
          };

          //verify if geolocation is supported
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            alert("Geolocation is not supported by this browser");
          }

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));