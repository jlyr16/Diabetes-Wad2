function initMap() {

    var options = {
        center: {lat: 1.3521, lng: -103.8198},
        zoom: 8
    }

    map = new google.maps.Map(document.getElementById("map"),options)

    console.log("here is the map")
}