### Test that the JavaScript file has loaded properly.
    1. Use " console.log('Hello') " in map.js
    2. Load the page in the browser
    3. Inspect the page. The console should display "Hello"



### Check that the "Please select a town or city" warning shows when they click a radio button first (if the user clicks on a radio button without selecting a city).
On loading the page, I clicked a radio button before selecting a city. The "Please select a town or city" warning became visible. I then reloaded the page, selected a city and clicked a radio button in that order. There is no warning message when using the correct order.



### Check that the mapSearch method exits before attempting to do a search (make sure the return statement is executed).
    1. Use " console.log('Hello') " in map.js
    2. Load the page in the browser
    3. Inspect the page. The console should not display "re-turn statement has not executed"
    4. Search for and select a city in the search bar
    5. Inspect the page. The console should display "re-turn statement has not executed"



### Check that when the user select a city, a city is set and available to the mapSearch method.
    1. Use " console.log('city:', city) " in map.js
    2. Load the page in the browser
    3. Inspect the page. The console should display "city: null" (null is the default value for when no city has been set)



### Check that the autocomplete shows available cities.
    1. Load the page
    2. Type a letter into the search bar
    3. A dropdown appears listing the top five search results.



### Check that when the user clicks a radio button, the category is set and available to the mapSearch method.
    1. Use " console.log(category) " in map.js
    2. Load the page in the browser
    3. Inspect the page. The console should display the category of the radio button that is active as the page loads.
    
    // how do I make this available to the mapSearch

