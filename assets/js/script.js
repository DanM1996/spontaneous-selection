// converts time to UTC to work with ticketmaster API
var format = "YYYY-MM-DDTHH:mm:ss";
// variable to tell ticketmaster how far out to get events (1 day, 1 week, etc.)
var ticketmasterEndDate = moment().add(7, "days").format(format);
// function that calls ticketmaster API data
function ticketmasterData(city, radiusInput){
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?size=50&apikey=6XzGGxlIpYQAZnWYPnzYpZDK59vJeJId&city=" + city + "&endDateTime=" + ticketmasterEndDate + "Z")
        .then(function(data){
            return data.json();
        })
        .then(function(data){
        // set variable to equal length of array in data
        eventLength = data._embedded.events.length;
        console.log(eventLength);

        // run function to get a random number that falls in the length of the array
        function getRandomEventNumber() {
            return Math.floor(Math.random() * eventLength);
        }
        
        // call function here to display data
        var randomnumber = getRandomEventNumber()
        console.log(data)
    
        renderRandomEvent(data._embedded.events[randomnumber]) 
    })
}
function getYelpData(searchTerm, searchRadius, searchType) {
    var myurl = ""
    if (searchType === "food") {
        myurl = "http://cors-anywhere.herokuapp.com/http://api.yelp.com/v3/businesses/search?term=food&limit=50&location=" + searchTerm + "&radius=" + searchRadius;
    }
    if (searchType === "bar") {
        myurl = "http://cors-anywhere.herokuapp.com/http://api.yelp.com/v3/businesses/search?term=bar&limit=50&location=" + searchTerm + "&radius=" + searchRadius;
    }
    //generate random restraurant (referring to this as "food" cause easier to spell)

    var token = "N6jC9hEJzTF9RnctCg_sNYHsnJeGGqXljv7PadDwa9cnNkH1l-dyPYCqUZ3j6JFyEBP9kfiiGvNbjdGloQd-0trLXbfSMkA69e1gvRnJM3q5ps_T1Z7-yZxkWg7dYHYx"
    fetch(myurl, {
            // mode:"cors",
            headers: {
                'x-requested-with': '123',
                "Authorization": `Bearer ${token}`,
                // "Content-Type": "application/x-www-form-urlencoded"
                // content-type: application/json
                // server: envoy
                // x-routing-service: routing-main--useast1-b579557df-26swb; site=public_api_v3
                // ratelimit-resettime: 2021-07-08T00:00:00+00:00
                // ratelimit-dailylimit: 5000
                // ratelimit-remaining: 5000
                // x-cloudmap: routing_useast1
                // x-proxied: 10-65-66-189-useast1aprod
                // x-extlb: 10-65-66-189-useast1aprod
                // cache-control: max-age=0, no-store, private, no-transform
                // accept-ranges: bytes
                // date: Wed, 07 Jul 2021 00:34:22 GMT
                // via: 1.1 varnish
                // x-served-by: cache-iah17278-IAH
                // x-cache: MISS
                // x-cache-hits: 0
                // content-length: 49186
            }
        })
        .then(res => res.json())
        .then(data => {
            var randomNumber = getRandomNumber()
            console.log(data.businesses)
            if (searchType === "food") {
                renderRandomFood(data.businesses[randomNumber])
            }
            if (searchType === "bar") {
                renderRandomBar(data.businesses[randomNumber])
            }
        });
};

//function to dynamically change city and radius based on user input
function submitSearchFood() {
    //create a variable to hold the search input
    var searchTerm = document.getElementById("location").value;
    var miles = document.getElementById("miles").value;
    var meters = 0
    if (miles >= 25) {
        meters = 40000
    } else {
        meters = Math.floor(miles * 1609.344);
    }
    var searchRadius = Math.round(meters / 1000) * 1000

    getYelpData(searchTerm, searchRadius, "food")
}

function submitSearchBar() {
    //creaate a variable to hold the search input
    var searchTerm = document.getElementById("location").value;
    var miles = document.getElementById("miles").value;
    var meters = 0
    if (miles >= 25) {
        meters = 40000
    } else {
        meters = Math.floor(miles * 1609.344);
    }
    var searchRadius = Math.round(meters / 1000) * 1000

    getYelpData(searchTerm, searchRadius, "bar")
}


//generate random number from array of 50 
function getRandomNumber() {
    return Math.floor(Math.random() * 50) + 1;
}

function renderRandomFood(randomFood) {
    console.log(randomFood)

    var randomFoodDiv = $("#Restaurants-name")
    randomFoodDiv.empty()
    randomFoodDiv.text(randomFood.name)
    console.log(randomFood.name)
    
    var randomFoodAddressDiv = $("#Restaurants-address")
    randomFoodAddressDiv.empty()
    randomFoodAddressDiv.text(randomFood.location.display_address[0] + ' ' + randomFood.location.display_address[1])
    console.log(randomFood.display_address)
    
    var randomFoodWebsiteDiv = $("#Restaurants-website")
    randomFoodWebsiteDiv.empty()
    var randomFoodUrl = $("<a>")
    console.log(randomFood.url)
    randomFoodUrl.text("Website Link")
    randomFoodUrl.attr("href", randomFood.url)
    randomFoodUrl.attr("id", "website-link-a")
    randomFoodWebsiteDiv.append(randomFoodUrl)
    console.log(randomFoodWebsiteDiv);
}

function saveLastSpot(){
    var name = $("#Restaurants-name").text()
    var address = $("#Restaurants-address").text()
    var url = $("#website-link-a").attr("href")
    var savedFood = {
        name: name,
        location: {
            display_address: [address, ""]
        },

        url: url
    }
    localStorage.setItem("foodHistory", JSON.stringify(savedFood));
};

function getLastFood(){
    //first check what check what food/bar has been stored by the user
    var savedFood = JSON.parse(localStorage.getItem("foodHistory"))
    
    //If nothing has been saved yet, create a BLANK object in local storage
    //and tell user no saved restaraunt exists
    if (!savedFood) {
        savedFood = {}
        localStorage.setItem("foodHistory", JSON.stringify({}));
    }
    else{
        //if a savedFood item does exist we will render it onto the div
        renderRandomFood(savedFood)
    }
    
}

function renderRandomBar(randomBar) {
    console.log(randomBar)

    var randomBarDiv = $("#Restaurants-name")
    randomBarDiv.empty()
    randomBarDiv.text(randomBar.name)
    console.log(randomBar.name)
    
    var randomBarAddressDiv = $("#Restaurants-address")
    randomBarAddressDiv.empty()
    randomBarAddressDiv.text(randomBar.location.display_address[0] + ' ' + randomBar.location.display_address[1])
    console.log(randomBar.display_address)
    
    var randomBarWebsiteDiv = $("#Restaurants-website")
    randomBarWebsiteDiv.empty()
    var randomBarUrl = $("<a>")
    console.log(randomBar.url)
    randomBarUrl.text("Yelp Link")
    randomBarUrl.attr("href", randomBar.url)
    randomBarWebsiteDiv.append(randomBarUrl)
}

// function that takes the user input for city and radius and has ticketmaster data meet those parameters
function searchEvent() {
    var city = document.querySelector("#location").value;
    var radius = document.querySelector("#miles").value;
    var miles = 0;
    if (radius > 25) {
        miles = 40000
    } else {
        miles = Math.floor(radius * 1609.344);
    }
    var radiusInput = Math.round(miles / 1000) * 1000

    ticketmasterData(city, radiusInput);
}
// function that randomizes events in the area
function renderRandomEvent(randomEvent) {
    console.log(randomEvent)

    var eventEl = $("#event-name");
    eventEl.empty()
    eventEl.text(randomEvent.name);
    console.log(randomEvent.name);
   
    var eventTime = $("#event-time");
    eventTime.empty();
    eventTime.text(randomEvent.dates.start.localTime);
    console.log(randomEvent.dates.start.localTime);
   
    var eventWebLink = $("#Event-website");
    eventWebLink.empty();
    var eventUrl = $("<a>");
    console.log(randomEvent.url);
    eventUrl.text("Ticketmaster Event Link");
    eventUrl.attr("href", randomEvent.url)
    eventUrl.attr("id", "website-link")
    eventWebLink.append(eventUrl);
    console.log(eventWebLink);
}
// function that saves current event to local storage
function saveEvent(){
    var name = $("#event-name").text().trim();
    var time = $("#event-time").text();
    var link = $("#website-link").attr("href");
    var savedEvent = {
        name: name,
        url: link,
        dates: {
            start: {
                localTime: time
            }
        }

    };
    localStorage.setItem("eventSave", JSON.stringify(savedEvent));
}
// function that recalls data from local storage
function recallSavedEvent(){
    var savedEvent = JSON.parse(localStorage.getItem("eventSave"))
    if (!savedEvent) {
        savedEvent = {}
        localStorage.setItem("eventSave", JSON.stringify());
    }
    else {
        renderRandomEvent(savedEvent);
    }
}

//THIS button is if they want FOOD
document.getElementById("Restaurantsbtn").addEventListener("click", submitSearchFood);
//THIS button is if they want BAR
document.getElementById("Barsbtn").addEventListener("click", submitSearchBar);

//This button click will show the SAVED food item
document.getElementById("Refreshbtn2").addEventListener("click", getLastFood);
//this button click will SET the saved food item
document.getElementById("saveRestaurant-barbtn").addEventListener("click", saveLastSpot)

// pulls a random event from ticketmaster when clicked
document.getElementById("eventbtn").addEventListener("click", searchEvent);
// saves the current ticketmaster data displayed when clicked to local storage
document.getElementById("saveEventbtn").addEventListener("click", saveEvent);
// pulls the ticketmaster data from local storage when clicked, replacing the active one