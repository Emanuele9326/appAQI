function asyncGeneratorStep(e,t,n,o,a,r,c){try{var s=e[r](c),i=s.value}catch(e){return void n(e)}s.done?t(i):Promise.resolve(i).then(o,a)}function _asyncToGenerator(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var r=e.apply(t,n);function c(e){asyncGeneratorStep(r,o,a,c,s,"next",e)}function s(e){asyncGeneratorStep(r,o,a,c,s,"throw",e)}c(void 0)}))}}import"../CSS/app.css";var latlng=[42.638426,12.674297],mymap=L.map("myMap").setView(latlng,3);L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW1hbnVlbGVtYXJyYTkzIiwiYSI6ImNrbXg5c25jczBtdWMycHFzcTc1N2RzYnoifQ.oCOb1P_vTp2jdYczVeVBXQ",{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',maxZoom:18,id:"mapbox/streets-v11",tileSize:512,zoomOffset:-1,accessToken:"your.mapbox.access.token"}).addTo(mymap);var marker=L.marker(latlng).addTo(mymap),aqi=document.getElementById("cityAQI");aqi.addEventListener("click",_asyncToGenerator(regeneratorRuntime.mark((function e(){var t,n,o,a,r,c,s,i,m,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==document.getElementById("city").value.length){e.next=6;break}console.log("city ​​not entered"),alert("Enter city eg: Livorno, IT --- or use the Geolocation button"),e.next=31;break;case 6:return t=document.getElementById("city").value,n="aqi/".concat(t),e.next=10,fetch(n);case 10:return o=e.sent,e.next=13,o.json();case 13:return a=e.sent,r=a.results[0].locations[0].displayLatLng.lat,console.log(r),c=a.results[0].locations[0].displayLatLng.lng,console.log(c),s="geo/".concat(r,",").concat(c),e.next=21,fetch(s);case 21:return i=e.sent,e.next=24,i.json();case 24:m=e.sent,mymap.setView(new L.LatLng(r,c),12),d=new L.LatLng(r,c),marker.setLatLng(d),void 0===m.data.aqi?(document.getElementById("aqi").textContent="AQI = --",console.log("survey station not present or value not detected")):document.getElementById("aqi").textContent="AQI = ".concat(m.data.aqi),void 0===m.data.forecast.daily.pm10[0].avg?(document.getElementById("pm10").textContent="pm10 = --",console.log("value not detected")):document.getElementById("pm10").textContent="pm10 = ".concat(m.data.forecast.daily.pm10[0].avg," µg/m^3"),void 0===m.data.forecast.daily.pm25[0].avg?(document.getElementById("pm25").textContent="pm25 = --",console.log("value not detected")):document.getElementById("pm25").textContent="pm25 = ".concat(m.data.forecast.daily.pm25[0].avg," µg/m^3");case 31:case"end":return e.stop()}}),e)}))));var geoloco=document.getElementById("geoloc");geoloco.addEventListener("click",_asyncToGenerator(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=function(){return(n=_asyncToGenerator(regeneratorRuntime.mark((function e(t){var n,o,a,r,c,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.coords.latitude,o=t.coords.longitude,a="geo/".concat(n,",").concat(o),e.next=5,fetch(a);case 5:return r=e.sent,e.next=8,r.json();case 8:c=e.sent,mymap.setView(new L.LatLng(n,o),16),s=new L.LatLng(n,o),marker.setLatLng(s),void 0===c.data.aqi?(document.getElementById("aqi").textContent="AQI = --",console.log("survey station not present or value not detected")):document.getElementById("aqi").textContent="AQI = ".concat(c.data.aqi),void 0===c.data.forecast.daily.pm10[0].avg?(document.getElementById("pm10").textContent="pm10 = --",console.log("value not detected")):document.getElementById("pm10").textContent="pm10 = ".concat(c.data.forecast.daily.pm10[0].avg," µg/m^3"),void 0===c.data.forecast.daily.pm25[0].avg?(document.getElementById("pm25").textContent="pm25 = --",console.log("value not detected")):document.getElementById("pm25").textContent="pm25 = ".concat(c.data.forecast.daily.pm25[0].avg," µg/m^3");case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)},t=function(e){return n.apply(this,arguments)},navigator.geolocation?navigator.geolocation.getCurrentPosition(t):alert("Geolocation is not supported by this browser");case 3:case"end":return e.stop()}}),e)}))));