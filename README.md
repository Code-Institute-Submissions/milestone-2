# Happy Holidays UK Website
This project is a single page website for Happy Holidays UK, which is a holiday destination finder. The website contains information about accommodation, where to eat/get food delivered from, the public transport and tourist attractions in the selected UK city.

## UX
### User Stories
This website is for someone looking to plan different aspects of their holiday in the UK.

-	To select a destination city: The user clicks on the ‘enter a town or city’ autocomplete search bar and types a letter, the autocomplete feature will give suggestions in a dropdown. They either type the full name of the town or the city and select it in the dropdown, or type enough of the name for it to appear in the dropdown and select it once it is in the dropdown.
-	To select a category: The user clicks on the category dropdown and selects an option.
-	To use the map’s full screen feature: To open the map in full screen, click on the full screen button (a dashed square border located in the top right-hand corner of the map).
-	To use the map’s zoom feature: Use the zoom controls in the bottom right-hand corner of the map to zoom in or out.
-	To use the results list to find the corresponding place in the map: Click on the place you want to find, and the page will automatically scroll up so that the map section is in the viewport, to where the place’s info window highlighted.

### Mock Ups
I created three mock ups (one for large screens, one for tablets and one for mobile devices), which are in the ‘mockups’ directory in this project (https://github.com/jamesahorne/milestone-2/tree/master/mockups).

I altered the website’s design slightly from the mock ups, partly because I later decided against a countries filter (I made the site to be for UK cities only). I also decided to use a dropdown to select the different categories as opposed to the buttons I was originally planning on using (because it looks neater/is better aesthetically).

## Features
-	Autocomplete in search bar: Allows user to search for a city quicker as suggestions of UK cities appear in the suggestions dropdown based on the letters they’ve typed, by having them begin typing the city name into the search bar.
-	Category dropdown: Allows the user to select a category, by the user clicking on the category dropdown and clicking on one of the options.
-	Reset button: Allows the user to reset the autocomplete search bar to empty and the category dropdown to the default ‘Select One’ option, by clicking the reset button.
-	Info windows in the map: The info windows show the address, phone number, rating and website, by clicking on one of the place markers.
-	Results list links: Scrolls up to find the info window opened, when the user clicks on a list item in the results table.

## Technologies Used
-	HTML
    -	I have used HTML to structure my website.
-	CSS
    -	I have used CSS to style my website, based on SCSS templates I created.
-	Bootstrap
    -	I have used the Bootstrap 4 for the grid system and lots of their pre-set classes, such as the navigation classes in the header and the button classes. (https://getbootstrap.com/)
-	Bootswatch
    -	I have used the Bootswatch theme ‘Litera’ to quickly style my website. (https://bootswatch.com/)
-	Font Awesome
    -	I have used the Font Awesome 4.7.0 library for the redo icon in the reset button. (https://fontawesome.com/)
-	JavaScript
    -	I have used JavaScript to add interactivity to the site, code the map and to link it to the autocomplete search bar and the category dropdown, and have the results list scroll up to the map to view the info window for the place marker clicked on in the list.
-	JQuery
    -	I have used JQuery for my selectors, event handling, to simplify DOM manipulation, and for efficiency. (https://jquery.com/)
-	Google Maps and Places API
    -	I have used the Google Maps API and the Google Places API to allow users to search using a map. (https://cloud.google.com/maps-platform/)

## Testing
I have documented the manual tests I performed via written documentation. I decided not to use Jasmine as I felt it was unnecessary due to the nature of the project.

1.	Autocomplete in search bar:
    1.	Type in the first few letters of a city in the search box.
        1.	A dropdown list populates.
2.	Select category in the category dropdown:
    1.	Change a category in the dropdown.
        1.	The results update on the map.
3.	Reset button:
    1.	Click the reset.
        1.	The autocomplete search bar resets to empty.
        2.	The category dropdown resets to ‘Select One’.
4.	Place marker info window:
    1.	Click on a place marker.
        1.	The relevant info window appears.
    2.	Click the 'X' button.
        1.	The info window closes.
5.	Map full screen feature:
    1.	Click on the full screen button (dashed square border in the top right-hand corner) and the map enlarges to full screen.
    2.	To close the full screen feature, click on the close full screen button in the top right-hand corner or press the 'ESC' key.
6.	To use the map’s zoom feature:
    1.	Click the '+' and '–' keys and it zooms in and out.
7.	Results list:
    1.	When the map updates the results list updates.
    2.	When you click on a list result it shows upon the map and scrolls up to it.

I have also tested my project on several browsers and screen sizes, on which the site looks and works the same.

During testing, I found an interesting problem that I haven’t addressed yet. In the ‘onPlaceChanged’ function, when selecting the types in each category, only the first ‘type’ in the list seems to show in the map search.

## Deployment
The website is deployed and hosted on GitHub (https://jamesahorne.github.io/milestone-2/). To deploy, I used GitHub Pages. In my GitHub account, in the repository for this project, I went into Settings, scrolled down to the GitHub Pages area, and changed the source of my website from none to ‘master branch’. There are no differences between the deployed version and the development version.

## Credits
-	In maps.js I largely used and adapted code found on the Google Maps Platform: (https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch).
	-   I used Google's autocomplete feature in my search bar.
	-   To intially center my map on the UK, I kept the 'UK' object in the 'countries' variable.
	-   I kept the initMap function to initiate the map.
	-   I kept the markers function to clear and drop the markers on the map.
	-   I kept the results functions to add and clear the place results on the map.
	-   I kept the info window functions to show and include the content of the info windows.
-	I also integrated ideas and code in my JavaScript document that was used in a similar website to mine built by Ben Hasselgren: (https://benhasselgren.github.io/ifd-milestone-project-pages/).
	-   I adapted the reset button, hiding the horizontal line and centering the map on the UK in addition to function.
    -   I adapted the onPlaceChanged function by using the category search functions used and added in my own doNearbySearch function to it.
