var format = "YYYY-MM-DDTHH:mm:ss";
var ticketmasterEndDate = moment().add(7, "days").format(format);


function getYelpData(searchTerm, searchRadius, searchType){
    var myurl = ""
    if(searchType === "food"){
        myurl = "http://api.yelp.com/v3/businesses/search?term=food&limit=50&location=" + searchTerm + "&radius=" + searchRadius;
    }
    if(searchType === "bar"){
        myurl = "http://api.yelp.com/v3/businesses/search?term=bar&limit=50&location=" + searchTerm + "&radius=" + searchRadius;
    }
    //generate random restraurant (referring to this as "food" cause easier to spell)
    
    var token = "N6jC9hEJzTF9RnctCg_sNYHsnJeGGqXljv7PadDwa9cnNkH1l-dyPYCqUZ3j6JFyEBP9kfiiGvNbjdGloQd-0trLXbfSMkA69e1gvRnJM3q5ps_T1Z7-yZxkWg7dYHYx"
    fetch("http://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&limit=50&location=Denver&radius=40000", {
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
    .then(data => console.log(data))
    // $.ajax({
    //     url: myurl,
    //     method: 'GET',
    //     headers: {
    //         'accept': 'application/json',
    //         'x-requested-with': 'xmlhttprequest',
    //         'Access-Control-Allow-Origin': '*',
    //         'Authorization': 'Bearer N6jC9hEJzTF9RnctCg_sNYHsnJeGGqXljv7PadDwa9cnNkH1l-dyPYCqUZ3j6JFyEBP9kfiiGvNbjdGloQd-0trLXbfSMkA69e1gvRnJM3q5ps_T1Z7-yZxkWg7dYHYx',
    //         // 'Content-Type': 'text/html application/json'
    //     },

    //     // dataType: 'json',
    //     //when API responds success function is the first thing to run
    //     success: function (data) {
    //         var randomNumber = getRandomNumber()
    //         console.log(data.businesses)
    //         if(searchType === "food"){
    //             renderRandomFood(data.businesses[randomNumber])
    //         }
    //         if(searchType === "bar"){
    //             renderRandomBar(data.businesses[randomNumber])
    //         }
            
    //     }
    // });
}
//function to dynamically change city and radius based on user input
function submitSearchFood() {
    //event.preventDefault();
    //creaate a variable to hold the search input
    var searchTerm = document.getElementById("location").value;
    var miles = document.getElementById("miles").value;
    var meters = 0
    if(miles >= 25){
       meters=40000 
    } else {
        meters = Math.Floor(miles*1609.344);
    }
    var searchRadius = Math.round(meters/1000)*1000
    
    getYelpData(searchTerm, searchRadius, "food")
}

function submitSearchBar() {
    //event.preventDefault();
    //creaate a variable to hold the search input
    var searchTerm = document.getElementById("location").value;
    var miles = document.getElementById("miles").value;
    var meters = 0
    if(miles >= 25){
       meters=40000 
    } else {
        meters = Math.Floor(miles*1609.344);
    }
    var searchRadius = Math.round(meters/1000)*1000
    
    getYelpData(searchTerm, searchRadius, "bar")
}


//generate random number from array of 50 
function getRandomNumber() {
    return Math.floor(Math.random() * 50) + 1;
}


function renderRandomFood(randomFood) {
    console.log(randomFood)
    //create div to hold food response from Yelp
    var responseFoodContainer = $("<div>").addClass("random-container-food");

    //display restraurant name
    var randomFoodSpan = $("<span>")
    console.log(randomFood.name)
    randomFoodSpan.text("Date Spot Tonight: " + randomFood.name)
    responseFoodContainer.append(randomFoodSpan)

    //display url link that when clicked will take user to the the Yelp page for the restraurant
    var randomFoodUrl = $("<a href>")
    console.log(randomFood.url)
    randomFoodUrl.attr("src", "url")
    responseFoodContainer.append(randomFoodUrl)
}

function renderRandomBar(randomBar) {
    console.log(randomBar)
    //create div to hold food response from Yelp
    var responseBarContainer = $("<div>").addClass("random-container-bar");

    //display restraurant name
    var randomBarSpan = $("<span>")
    console.log(randomBar.name)
    randomBarSpan.text("Date Spot Tonight: " + randomBar.name)
    responseBarContainer.append(randomBarSpan)

    //display url link that when clicked will take user to the the Yelp page for the restraurant
    var randomBarUrl = $("<a href>")
    console.log(randomBar.url)
    randomBarUrl.attr("src", "url")
    responseBarContainer.append(randomBarUrl)
}

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
// function that takes the user input for city and radius and has ticketmaster data meet those parameters
function searchEvent(){
    var city = document.querySelector("#location").value;
    var radius = document.querySelector("#miles").value;
    var miles = 0;
    if (radius > 25) {
        miles = 40000
    } else {
        miles = Math.floor(radius*1609.344);
    }
    var radiusInput = Math.round(miles/1000)*1000

    ticketmasterData(city, radiusInput);
}

function renderRandomEvent(randomEvent) {
    console.log(randomEvent)
    var eventEl = $("#event-name");

    eventEl.empty()
    eventEl.text(randomEvent.name);
    console.log(randomEvent.name);

    var eventTime = $("#event-time");
    eventTime.empty();
    eventTime.text(randomEvent.dates.start.localTime)
    console.log(randomEvent.dates.start.localTime);

    var eventWebLink = $("#event-url");
    eventWebLink.empty();
    var eventUrl = $("<a>");
    console.log(randomEvent.url);
    eventUrl.text("Ticketmaster Event Link");
    eventUrl.attr("href", randomEvent.url)
    eventUrl.attr("id", "website-link")
    eventWebLink.append(eventUrl);

}

function saveEvent(){
    var name = $("#event-name").text().trim()
    var time = $("#event-time").text().trim()
    var link = $("website-link").attr("href")
    var savedEvent = {
        name: name,
        url: link,
        time: {
            dates: [time, ""]
        },
    }
    localStorage.setItem("eventSave", JSON.stringify(savedEvent));
}

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

function displaybtn2(){
    FindFoodDrinks.style.background = "red";
}

//when click submit button call submitSearch function; will need to move to bottom of page
//THIS button is if they want FOOD
document.getElementById("Restaurantsbtn").addEventListener("click", submitSearchFood);
//THIS button is if they want BAR
document.getElementById("Barsbtn").addEventListener("click", submitSearchBar);

document.getElementById("eventbtn").addEventListener("click", searchEvent);
document.getElementById("saveEventbtn").addEventListener("click", saveEvent);
document.getElementById("recallEventbtn").addEventListener("click", recallSavedEvent);