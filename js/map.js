/*function initMap() {
    var locations = [
  ['Politechnika Gdańska', 54.3715969, 18.6152441,18, 2],
  ['Czujnik AIRLY', 54.37333, 18.61919, 1]
];

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 10,
  center: new google.maps.LatLng(54.3715969, 18.6152441,18),
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < locations.length; i++) {  
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    map: map
  });

  console.log(marker);
  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent(locations[i][0]);
      infowindow.open(map, marker);
    }
  })(marker, i));
}
};
*/

//new map 

var places = [
  ["Politechnika Gdańska", 54.3710693, 18.617631],
  ["AIRLY",54.37333, 18.61919]
  ];

var map = L.map('mapid').setView([54.3720693, 18.618631], 16);
mapLink = 
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom:25
    }).addTo(map);

for (var i = 0; i < places.length; i++) {
  marker = new L.marker([places[i][1],places[i][2]])
            .bindPopup(places[i][0])
    .addTo(map);
}