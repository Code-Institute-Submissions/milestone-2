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

        // Show the "Please select a town or city" warning
        if (city == null) {
            $('#city-error').removeClass('no')
            return
        }
        else {
            $('#city-error').addClass('no')
        }


        // todo - write google maps code to link to the data (category and city) I've just received
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
