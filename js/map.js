// This document allows the user to find accommodation, bars/cafes/restaurants, public
// transport, takeaways and tourist attractions in a given city.
// It then displays markers for all the places returned, with on-click details
// for each set of filter parameters.

var map, places, infoWindow;
var markers = [];
var autocomplete;
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');


var countries = {
    'uk': {
        center: { lat: 54.8, lng: -4.6 },
        zoom: 5.3
    }
};


//Resets the map and input fields.
function reset() {
    clearResults();
    clearMarkers();
    $('#category')[0].selectedIndex = 0;
    $("#autocomplete").val("");
    $('#results-heading').html("");
    $('#hr').hide();
    map.setZoom(countries.uk.zoom);
    map.setCenter(countries.uk.center);
    place = "";
}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: countries.uk.zoom,
        center: countries.uk.center,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: false
    });


    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
    });


    // Create the autocomplete object and associate it with the UI input control.
    // Place type "cities".
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (
            document.getElementById('autocomplete')), {
            types: ['(cities)'],
            componentRestrictions: { country: 'uk' }
        });
    places = new google.maps.places.PlacesService(map);


    // Event listeners.
    autocomplete.addListener('place_changed', onPlaceChanged);
    document.getElementById('category').addEventListener('change', onPlaceChanged);

    $('#hr').hide();
}


// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if ($("#accommodation").is(':selected')) {
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(14);
            var search = {
                bounds: map.getBounds(),
                types: ['lodging']
            };
            doNearbySearch(search);
        }
        else {
            $('#autocomplete').attr("placeholder", "Enter a town or city");
        }
    }
    else if ($("#bars").is(':selected')) {
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(14);
            var search = {
                bounds: map.getBounds(),
                types: ['bar', 'cafe', 'restaurant']
            };
            doNearbySearch(search);
        }
        else {
            $('#autocomplete').attr("placeholder", "Enter a town or city");
        }
    }
    else if ($("#public").is(':selected')) {
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(14);
            var search = {
                bounds: map.getBounds(),
                types: ['bus_station', 'subway_station', 'train_station', 'transit_station']
            };
            doNearbySearch(search);
        }
        else {
            $('#autocomplete').attr("placeholder", "Enter a town or city");
        }
    }
    else if ($("#takeaway").is(':selected')) {
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(14);
            var search = {
                bounds: map.getBounds(),
                types: ['meal_takeaway', 'meal_delivery']
            };
            doNearbySearch(search);
        }
        else {
            $('#autocomplete').attr("placeholder", "Enter a town or city");
        }
    }
    else if ($("#tourist").is(':selected')) {
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(14);
            var search = {
                bounds: map.getBounds(),
                types: ['art_gallery', 'museum', 'aquarium', 'amusement_park']
            };
            doNearbySearch(search);
        }
        else {
            $('#autocomplete').attr("placeholder", "Enter a town or city");
        }
    }
}


function doNearbySearch(search) {

    places.nearbySearch(search, function(results, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            document.getElementById('results-heading').innerHTML = "Results";
            $('#hr').show();


            // Create a marker for each place found, and add letter.
            for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                var markerIcon = MARKER_PATH + markerLetter + '.png';


                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon
                });


                // If the user clicks a marker, show the details of that place
                // in an info window.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
            }
        }
    });
}


function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }
    markers = [];
}


function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}


// Adds a results table into the results section
function addResult(result, i) {
    var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter + '.png';


    // Creates striped effect in results table
    var tr = document.createElement('tr');
    tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
    tr.onclick = function() {
        google.maps.event.trigger(markers[i], 'click');


        // Scrolls to the map section when you click on a search result
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#map").offset().top
        }, 500);

    };


    var iconTd = document.createElement('td');
    var nameTd = document.createElement('td');
    var icon = document.createElement('img');
    icon.src = markerIcon;
    icon.setAttribute('class', 'placeIcon');
    icon.setAttribute('className', 'placeIcon');
    var name = document.createTextNode(result.name);
    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
}


function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
    }
}


// Get the place details for each search result. Show the information in an info
// window, anchored on the marker for the place that the user selected.
function showInfoWindow() {
    var marker = this;
    places.getDetails({ placeId: marker.placeResult.place_id },
        function(place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
        });
}


// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
        'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
        '">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity;

    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
    }
    else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }


    // Assign a five-star rating to the hotel, using a black star ('&#10029;')
    // to indicate the rating the hotel has earned, and a white star ('&#10025;')
    // for the rating points not achieved.
    if (place.rating) {
        var ratingHtml = '';
        for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
                ratingHtml += '&#10025;';
            }
            else {
                ratingHtml += '&#10029;';
            }
            document.getElementById('iw-rating-row').style.display = '';
            document.getElementById('iw-rating').innerHTML = ratingHtml;
        }
    }
    else {
        document.getElementById('iw-rating-row').style.display = 'none';
    }


    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    if (place.website) {
        var fullUrl = place.website;
        var website = hostnameRegexp.exec(place.website);
        if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
        }
        document.getElementById('iw-website-row').style.display = '';
        document.getElementById('iw-website').textContent = website;
    }
    else {
        document.getElementById('iw-website-row').style.display = 'none';
    }
}
