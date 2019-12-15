//new map 

var map = L.map('mapid').setView([52.22966, 18.97295], 5);
var marker = new Array();
var markerAll = new Array();

function initializeMap() {
  var places = [
    ["GDAŃSK", 54.37108, 18.61796],
    ["GDYNIA",54.5196057, 18.53524]
    ];

  mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom:25
      }).addTo(map);

  for (var i = 0; i < places.length; i++) {
    marker = new L.marker([places[i][1],places[i][2]])
              .bindPopup(places[i][0])
              .addTo(map);
    markerAll.push(marker);
  }
}

function initializeMapChange() {
  var chosenCityFirst = $("#selectFirstCity")[0].value;
  var chosenCitySecond = $("#selectSecondCity")[0].value;
  var tabCities = [chosenCityFirst , chosenCitySecond];
  var lat, lng, name;
  var places = new Array();
  for(var i=0; i<2;i++){
    switch (tabCities[i]) {
      case '0':
          lat = 54.37108;
          lng = 18.61796;
          name = "Gdańsk";
          break;
      case '1':
          lat = 54.5196057;
          lng = 18.53524;
          name = "Gdynia";
          break
      case '2':
          lat = 52.22966;
          lng = 20.97295;
          name = "Warszawa";
          break;
      case '3':
          lat = 50.05456;
          lng = 19.942218;
          name = "Kraków";
          break;
      default: break;
    }
    places.push([name,lat,lng]);
  }
  for(i=0;i<markerAll.length;i++) {
      map.removeLayer(markerAll[i]);
  }
  for (var i = 0; i < places.length; i++) {
    marker = new L.marker([places[i][1],places[i][2]])
              .bindPopup(places[i][0])
      .addTo(map);
    markerAll.push(marker);
  }
  
}

var $selectFirst = $("#selectFirstCity");
var $selectSecond = $("#selectSecondCity");

$selectFirst.change(initializeMapChange);
$selectSecond.change(initializeMapChange);

initializeMap();