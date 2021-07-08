var format = "YYYY-MM-DDTHH:mm:ss";
var ticketmasterEndDate = moment().add(7, "days").format(format);

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

document.getElementById("eventbtn").addEventListener("click", searchEvent);
document.getElementById("saveEventbtn").addEventListener("click", saveEvent);
document.getElementById("recallEventbtn").addEventListener("click", recallSavedEvent);