var map;
var directionsService;
var directionsDisplay;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -19.9391353, lng: -44.0786435 },
    zoom: 15
  });

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true 
  });

  var markers = []; 

  function addMarker(location, title, content) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: title
    });

    markers.push(marker); 

    var infowindow = new google.maps.InfoWindow({
      content: content
    });

    marker.addListener('click', function () {
      infowindow.open(map, marker);
      calculateAndDisplayRoute(location);
    });
  }

  

  var places = [
    {
      position: { lat: -19.9337286, lng: -44.0691473 },
      title: 'Clinica',
      content: 'Climev - Veterinário 24h - Clínica Veterinária',
      type: 'clinica' // Adicione um identificador de tipo para clínicas veterinárias
    },
    {
      position: { lat: -19.935337, lng: -44.0534132 },
      title: 'Clínica',
      content: 'Clínica Veterinária Terra dos Bichos',
      type: 'clinica'
    },
    {
      position: { lat: -19.9660055, lng: -44.0617235 },
      title: 'Clínica',
      content: 'Hospital Veterinário Pet Cente',
      type: 'hospital' // Identificador para hospitais veterinários
    }
    // Adicione mais lugares conforme necessário
  ];

  // Adicionar marcadores para os lugares
  for (var i = 0; i < places.length; i++) {
    addMarker(places[i].position, places[i].title, places[i].content);
  }

  // Função para traçar e exibir a rota
  function calculateAndDisplayRoute(destination) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var request = {
          origin: userPos,
          destination: destination,
          travelMode: 'DRIVING'
        };

        directionsService.route(request, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Não foi possível calcular a rota: ' + status);
          }
        });
      });
    }
  }
}