var apiKey = "bca39c92efc2381243d7834988122221";
var searchbtn = document.querySelector('#searchBtn');
var citySearch = document.querySelector('#citySearch');
var searchHistory = document.querySelector('#searchHistory');
var previousCities = [];


// function for current weather condition 
function currentWeather(city) {
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    // 'fetch' data from URL
    fetch(weatherURL) .then(function (response) {
      if (response.ok) { // check is response is okay
        console.log(response);
        response.json().then(function (data) { // json to retreieve object 
          console.log(data);

          $("#showCurrent").addclass("displayBlock");
          $("#cityContent").empty();
        });
       } })
  } 




// Submit function for user inout city //

function inputCity(event){
    event.preventDefault(); // prevent page refresh //

    var city = citySearch.value.trim(); // extract input data //
    currentWeather(city); // excicute currentWeather function 

if(previousCities.includes(city)) {
    previousCities.push(city); 

var history = $(`<li class="list-group-item">${city}</li>`); // template literal to interpolate varibale 
    searchHistory.append(history);
}
localStorage.setItem("city", JSON.stringify(previousCities)); // stringify to store in local storage 
}


// event listener //
searchbtn.addEventListener('click', inputCity);


