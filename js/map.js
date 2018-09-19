/*
$(function() {

    // Initialise variables
    let category = $('input[type=radio][name=options]').get(0).value
    let city = null


    // Get autocomplete working
    var input = document.getElementById('cities') // should I be be using const or let here?
    var options = {
        types: ['(cities)'],
        componentRestrictions: { country: 'uk' }
    }

    autocomplete = new google.maps.places.Autocomplete(input, options)


    // Does search on map
    const mapSearch = () => {
        console.log('city:', city)
        console.log('category:', category)

        // Show the "Please enter a town or city" warning
        if (city == null) {
            $('#city-error').removeClass('no')
            return
        }
        // Adds class 'no' if it isn't already there
        $('#city-error').addClass('no')
    }


    // Autocomplete callbacks
    autocomplete.addListener('place_changed', () => {
        city = input.value
        mapSearch()
    })


    // Radio button callbacks
    $('input[type=radio][name=options]').change(function() {
        category = this.value
        mapSearch()
    })
})
*/

// This document allows the user to find accommodation, bars/restaurants and 
// tourist attractions in a given city.
// It then displays markers for all the hotels returned, with on-click details
// for each set of filter parameters.

var map, places, infoWindow;
var markers = [];
var autocomplete;
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');
var city = null // do I need this?


var category = {
    'accom': {
        types: 'lodging'
    },
    'bars': {
        types: 'bar',
        'restaurant'
    },
    'tourist': {
        types: { 'amusement_park', 'aquarium', 'art_gallery', 'museum', 'stadium', 'zoo' }
    }
};


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 54.8, lng: -4.6 },
        zoom: 5,
        mapTypeControl: false,
        panControl: false, // edit these??
        zoomControl: false,
        streetViewControl: false
        componentRestrictions: { country: 'uk' }
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
    document.getElementById('accom').addEventListener('change', onPlaceChanged);
    document.getElementById('bars').addEventListener('change', onPlaceChanged);
    document.getElementById('tourist').addEventListener('change', onPlaceChanged);
    document.getElementById('reset-button').addEventListener("click", setAutocompleteCategory);
}


// Copy equivalent code from google.js:115-155+


// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
    if ($("#accom").is(':selected')) {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            searchAccommodation();
        }
        else {
            $('#autocomplete').attr("placeholder", "Enter a town or city");
        }
    }
    else if ($("#bars").is(':selected')) {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            searchRestaurant();
        }
        else {
            $('#autocomplete').attr("placeholder", "Enter a town or city");
        }
    }
    else if ($("#tourist").is(':selected')) {
        var place = autocomplete.getPlace();
        if (place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            searchAttractions();
        }
        else {
            $('#autocomplete').attr("placeholder", "Enter a town or city");
        }
    }
}


// Search for accommodation in the selected city, within the viewport of the map.
function searchAccommodation() {
    var search = {
        bounds: map.getBounds(),
        types: ['lodging']
    };


    places.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();


            // Create a marker for each accommodation found, and assign a
            // letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                var markerIcon = MARKER_PATH + markerLetter + '.png';


                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon
                });


                // If the user clicks an accommodation marker, show the details
                // of that accommodation in an info window.
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


// Set the country restriction based on user input.     CHANGE FOR CATEGORY
// Also center and zoom the map on the given country.
function setAutocompleteCategory() {
    var country = document.getElementById('category').value;
    if (category == 'select') { // do I want to use this code?
        // Show the "Please enter a town or city" warning
        if (city == null) {
            $('#city-error').removeClass('no')
            return
        }
        // Adds class 'no' if it isn't already there
        $('#city-error').addClass('no')

    }
    else {

        ?
        ? ?

    }
    clearResults();
    clearMarkers();
}


function dropMarker(i) {
    return function() {
        markers[i].setMap(map);
    };
}


function addResult(result, i) {
    var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter + '.png';


    var tr = document.createElement('tr');
    tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
    tr.onclick = function() {
        google.maps.event.trigger(markers[i], 'click');
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


// Get the place details for a hotel/all three or just one. Show the information in an info window,
// anchored on the marker for the hotel* that the user selected.
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
