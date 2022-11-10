// Initialize and add the map

let map, infoWindow;

window.onload = function initMap() {
  // The location of Singapore
  const singapore = { lat: 1.3521, lng: 103.8198 };
  // The map, centered at Singapore
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: singapore,
  });


// Go to current location button
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Go to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          var marker = new google.maps.Marker({
            position: pos,
            map: map,
          });


          map.setCenter(pos);
          map.setZoom(18);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });



// Autocomplete search 

var input = document.getElementById('searchInput');
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

var autocomplete = new google.maps.places.Autocomplete(input)

// limit search area based on location and country
autocomplete.bindTo('bounds', map);
autocomplete.setOptions({ strictBounds: true });
autocomplete.setComponentRestrictions({country: ["sg"]});

var infowindow = new google.maps.InfoWindow();
var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
});

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
        window.alert("Please click on the search results provided");
        return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(20);
    }
    marker.setIcon(({
        // url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
    }));
    
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address + '<br><a target="_blank" href="' + place.url + '">' + "Get directions on Google Maps" + '</a>' + '</div>');
    infowindow.open(map, marker);
  
    // Location details

    // for (var i = 0; i < place.address_components.length; i++) {
    //     if(place.address_components[i].types[0] == 'postal_code'){
    //         document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
    //     }
    //     if(place.address_components[i].types[0] == 'country'){
    //         document.getElementById('country').innerHTML = place.address_components[i].long_name;
    //     }
    // }
    // document.getElementById('location').innerHTML = place.formatted_address;
    // document.getElementById('lat').innerHTML = place.geometry.location.lat();
    // document.getElementById('lon').innerHTML = place.geometry.location.lng();

});

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


window.initMap = initMap;
