var apiKey = "bca39c92efc2381243d7834988122221";
var searchbtn = document.querySelector('#searchBtn');
var citySearch = document.querySelector('#citySearch');
var searchHistory = document.querySelector('#searchHistory');
var previousCities = [];


function currentWeather(city) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}";
    
    fetch(weatherURL) // 'fetch' data from URL
    .then(function (response) {
      if (response.ok) { // check is response is okay
        console.log(response);
        response.json().then(function (data) { // json to retreieve object 
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText); // if no valid repos - error messag e
      }
    })


}



// Submit function for user inout city //

function inputCity(event){
    event.preventDefault(); // present page refresh //

    var city = citySearch.value.trim(); // extract input data //
    currentWeather(city);

if(previousCities.includes(city)) {
    previousCities.push(city); 


var history = $(`<li class="list-group-item">${city}</li>`);
    searchHistory.append(history);
}
localStorage.setItem("city", JSON.stringify(previousCities));
}


// event listener //
searchbtn.addEventListener('submit', inputCity);


