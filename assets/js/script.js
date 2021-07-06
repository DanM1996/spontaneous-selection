function getYelpData(searchTerm, searchRadius, searchType){
    var myurl = ""
    if(searchType === "food"){
        myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&limit=50&location=" + searchTerm+ "&radius=" + searchRadius;
    }
    if(searchType === "bar"){
        myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bar&limit=50&location=" + searchTerm+ "&radius=" + searchRadius;
    }
    //generate random restraurant (referring to this as "food" cause easier to spell)
    
    $.ajax({
        url: myurl,
        headers: {
            'Authorization': 'Bearer N6jC9hEJzTF9RnctCg_sNYHsnJeGGqXljv7PadDwa9cnNkH1l-dyPYCqUZ3j6JFyEBP9kfiiGvNbjdGloQd-0trLXbfSMkA69e1gvRnJM3q5ps_T1Z7-yZxkWg7dYHYx',
        },

        method: 'GET',
        dataType: 'json',
        //when API responds success function is the first thing to run
        success: function (data) {
            var randomNumber = getRandomNumber()
            console.log(data.businesses)
            if(searchType === "food"){
                renderRandomFood(data.businesses[randomNumber])
            }
            if(searchType === "bar"){
                renderRandomBar(data.businesses[randomNumber])
            }
            
        }
    });
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

//
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


$.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=6XzGGxlIpYQAZnWYPnzYpZDK59vJeJId",
    async: true,
    dataType: "json",
    success: function (json) {
        console.log(json);
        // Parse the response.
        // Do other things.
    },
    error: function (xhr, status, err) {
        // This time, we do not end up here!
    }
});
//Button function
var displaybtn = function(){
  var button = document.createElement('button');
  button.innerHTML = 'Click for Movies';
  button.onclick = function(){
  };
  
  document.getElementById('Moviebtn').appendChild(button);
};


document.getElementById("Moviebtn").addEventListener("click", displaybtn);

function displaybtn2(){
    FindFoodDrinks.style.background = "red";
}

document.getElementById("FindFoodDrinks").addEventListener("click", displaybtn2);


//when click submit button call submitSearch function; will need to move to bottom of page
//THIS button is if they want FOOD
document.getElementById("FindFoodDrinks").addEventListener("click", submitSearchFood);
//THIS button is if they want BAR
document.getElementById("Barsbtn").addEventListener("click", submitSearchBar);
