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
        meters = Math.Floor(miles * 1609.344);
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
        meters = Math.Floor(miles * 1609.344);
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
        alert("Nothing yet saved");
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

function ticketmasterData(city, radiusInput) {
    // $.ajax({
    //     type: "GET",
    //     url: "https://app.ticketmaster.com/discovery/v2/events.json?size=50&apikey=6XzGGxlIpYQAZnWYPnzYpZDK59vJeJId&city=Tampa&endDateTime=" + ticketmasterEndDate + "Z",
    //     async: true,
    //     dataType: "json",
    //     success: function (data) {
    //         var randomnumber = getRandomNumber()
    //         console.log(data)
    //         console.log(data._embedded.events[randomnumber].name);
    //         renderRandomEvent(data._embedded.events[randomnumber])

    //     },

    // method: 'GET',
    // dataType: 'json',
    // //when API responds success function is the first thing to run
    // success: function (data) {
    //     var randomNumber = getRandomNumber()
    //     console.log(data.businesses)
    //     renderRandomBar(data.businesses[randomNumber])
    //     }
    // });
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

function renderRandomEvent(randomEvent) {
    console.log(randomEvent)
    var eventEl = $("<div>").addClass("random-event");

    var eventSpan = $("<span>");
    console.log(randomEvent.name);
    eventSpan.text("Your Randomized Event: " + randomEvent.name);
    eventEl.append(eventSpan)

    var ticketmasterUrl = $("<a href>")
    console.log(randomEvent.url)
    ticketmasterUrl.attr("src", "url")
    eventEl.append(ticketmasterUrl)
}

//Button function
var displaybtn = function () {
    var button = document.createElement('button');
    button.innerHTML = 'Click for Movies';
    button.onclick = function () {};

    document.getElementById('Moviebtn').appendChild(button);
};


// document.getElementById("Moviebtn").addEventListener("click", displaybtn);

function displaybtn2() {
    FindFoodDrinks.style.background = "red";
}


// document.getElementById("FindFoodDrinks").addEventListener("click", displaybtn2);


//when click submit button call submitSearch function; will need to move to bottom of page
//THIS button is if they want FOOD
document.getElementById("Restaurantsbtn").addEventListener("click", submitSearchFood);
//THIS button is if they want BAR
document.getElementById("Barsbtn").addEventListener("click", submitSearchBar);

//This button click will show the SAVED food item
document.getElementById("Refreshbtn2").addEventListener("click", getLastFood);
//this button click will SET the saved food item
document.getElementById("saveRestaurant-barbtn").addEventListener("click", saveLastSpot)
// $.ajax({
//     type: "GET",
//     url: "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=6XzGGxlIpYQAZnWYPnzYpZDK59vJeJId",
//     async: true,
//     dataType: "json",
//     success: function (json) {
//         console.log(json);
//         // Parse the response.
//         // Do other things.
//     },
//     error: function (xhr, status, err) {
//         // This time, we do not end up here!
//     }
// });

// document.getElementById("FindFoodDrinks").addEventListener("click", displaybtn2);

// ticketmasterData();
