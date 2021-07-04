//generate random restraurant (referring to this as "food" cause easier to spell)
var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&location=cleveland&radius=40000&limit=50";
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
        renderRandomFood(data.businesses[randomNumber])
    }
});

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

//generate random Bars
var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=bar&location=cleveland&radius=40000&limit=50";
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
        renderRandomBar(data.businesses[randomNumber])
    }
});

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