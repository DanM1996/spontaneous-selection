// let apiKey = "N6jC9hEJzTF9RnctCg_sNYHsnJeGGqXljv7PadDwa9cnNkH1l-dyPYCqUZ3j6JFyEBP9kfiiGvNbjdGloQd-0trLXbfSMkA69e1gvRnJM3q5ps_T1Z7-yZxkWg7dYHYx"

// //format the yelp api url
// var apiUrl = "https://api.yelp.com/v3/businesses/search?location=Cleveland&radius=40000"

// //make a request to the url

// fetch(apiUrl, {
//     headers: new Headers({
//         Authorization: "Bearer " + apiKey,
//     }),
//     method: "GET"
// })
// .then((response) => response.json())
// .then((data) => console.log(data));

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });