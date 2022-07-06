const apiKey = "bca39c92efc2381243d7834988122221";
let searchbtn = document.querySelector('#searchBtn');
let citySearch = document.querySelector('#citySearch');
let previousCities = [];
const presentDay = moment().format('LL');


// function for current weather condition 
function currentWeather(city) {
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; // interpolate variables
  // 'fetch' data from URL
  fetch(weatherURL) .then(function (response) {
      if (response.ok) { // check is response is okay
      console.log(response);
      response.json().then(function (storedSearch) { // json to retreieve object 
      console.log(storedSearch);
       
       
  let icon = storedSearch.weather[0].icon;
  let iconURL = `https://openweathermap.org/img/w/${icon}.png`;

  let cityCurrent =  
       $(`<h4 id="cityCurrent"> ${storedSearch.name} ${presentDay} <img src="${iconURL}"/></h4>
       <p>Temperature: ${storedSearch.main.temp} °C</p>
       <p>Wind Speed: ${storedSearch.wind.speed} KPH</p>
       <p>Humidity: ${storedSearch.main.humidity}\%</p>`);

       $("#weatherContent").append(cityCurrent); // append to HTMl - BCS help 
       let lat = storedSearch.coord.lat;
       let lon = storedSearch.coord.lon;
       console.log(lat,lon);

    forecast(city);
    });
  }})
};
// function for 5 day forecast 
     function  forecast (city) {

  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;  
  console.log(forecastURL);
  // 'fetch' data from URL
  fetch(forecastURL) .then(function (forecastResponse) {
    if (forecastResponse.ok) { // check is response is okay
      console.log(forecastResponse);
      response.json().then(function (array) {

        let fiveDayArray = array.list.filter(day => day.dt_txt.includes('15:00:00')); // specify what time of day https://stackoverflow.com/questions/53431440/filter-api-array

 }})
};

// Submit function for user inout city //

function inputCity(event){
   event.preventDefault(); // prevent page refresh //

    let city = citySearch.value.trim(""); // extract input data 
  
    previousCities.push(city); // push to array 

    localStorage.setItem("city", JSON.stringify(previousCities));// stringify to store in local storage 

    let history = $(`<li">${city}</li>`);
    $("#searchHistory").append(history);


    currentWeather(city); // run currentWeather function 
   
};

// event listener //
searchbtn.addEventListener('click', inputCity);


