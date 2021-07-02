var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=pizza&location=cleveland";
$.ajax({
    url: myurl,
    headers: {
        'Authorization': 'Bearer N6jC9hEJzTF9RnctCg_sNYHsnJeGGqXljv7PadDwa9cnNkH1l-dyPYCqUZ3j6JFyEBP9kfiiGvNbjdGloQd-0trLXbfSMkA69e1gvRnJM3q5ps_T1Z7-yZxkWg7dYHYx',
    },

    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data)
    }
});

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