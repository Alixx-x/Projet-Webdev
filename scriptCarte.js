var map = L.map('map').setView([43.62404, 5.21], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var marker = L.marker([43.62404, 5.21]).addTo(map);
marker.bindPopup("<b>Parc animalier de La Barben</b><br>Route du Château, 13330 La Barben, France").openPopup();

var circle = L.circle([43.62404, 5.21], {
    color: 'green',
    fillColor: '#4CAF50',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map);
circle.bindPopup("Zone autour du Zoo de La Barben");
