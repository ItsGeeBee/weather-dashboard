const apiKey = "bca39c92efc2381243d7834988122221";
let searchbtn = document.querySelector('#searchBtn');
let citySearch = document.querySelector('#citySearch');
let previousCities = [];
let weatherContent = document.querySelector('#weatherContent');
const presentDay = moment().format('LL');
let fiveDayContainer = document.querySelector('#fiveDay');
let clearHistory = document.querySelector('#clear');


// function for current weather condition 
function currentWeather(city) {
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; // interpolate variables
  // 'fetch' data from URL
  fetch(weatherURL) .then(function (response) {
      if (response.ok) { // check is response is okay
      console.log(response);
      response.json().then(function (storedSearch) { // json to retreieve object 
      console.log(storedSearch);
     
       
  let icon = storedSearch.weather[0].icon; // icon parameter 
  let iconURL = `https://openweathermap.org/img/w/${icon}.png`; // API call for Icon 


  // Create text to apend using template literals 
  let cityCurrent =  
       $(`<h4 id="cityCurrent"> ${storedSearch.name} ${presentDay} <img src="${iconURL}"/></h4>
       <p>Temperature: ${storedSearch.main.temp} °C</p>
       <p>Wind Speed: ${storedSearch.wind.speed} KPH</p>
       <p>Humidity: ${storedSearch.main.humidity}\%</p>`);

       $("#weatherContent").append(cityCurrent); // append to HTMl - BCS help 

       // Set variable for use in getting UV index 
       let lat = storedSearch.coord.lat;
       let lon = storedSearch.coord.lon;
       console.log(lat,lon);

    const uvURL =`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;// UV index API call

    fetch(uvURL) .then(function (uvIndex) {
      if (uvIndex.ok) { // check is response is okay
      console.log(uvIndex);
      uvIndex.json().then(function (uvData) { // json to retreieve object 
      console.log(uvData);

      let  currUV = uvData.value //get the value of the uvData response

      let uvContainer = $(`<p>UV Index: <button id='uvColour'>${currUV}</button></p>`); // uv colour container

        $("#weatherContent").append(uvContainer);  // append to html
        
      // adding css class dependant on the current UV value  
        if (currUV > 7) {
          $("#uvColour").removeClass("moderate favorable");
          $("#uvColour").addClass("severe");
        } else if (currUV >=4 && currUV <=7) {
          $("#uvColour").removeClass("severe favorable");
          $("#uvColour").addClass("moderate");
        } else if (currUV <= 3) { 
          $("#uvColour").removeClass("severe moderate");
          $("#uvColour").addClass("favorable");
        }  

      forecast(city);
      });
    }})
  })};
})};

// function for 5 day forecast 
  function  forecast (city) {

  let forecastURL = ` https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&exclude=hourly&appid=${apiKey}`;  // API call
  console.log(forecastURL);
  // 'fetch' data from URL
  fetch(forecastURL) 
    .then(function (response) {

      return response.json(); // to retrive Object 
  
     })
    .then(function (data) {
      console.log(data);
      for (let i = 3; i < data.list.length; i+=8) { // limited to every 8 hours to avoid showing multipe weather stamps for same day 

    let date = data.list[i].dt_txt
    let curDate = moment(date).format('DDMMM'); // format through Moment.js
    let temperature = data.list[i].main.temp
    let wind = data.list[i].wind.speed
    let humidity = data.list[i].main.humidity
    let icon = data.list[i].weather[0].icon
    
    let iconURL = `<img src="https://openweathermap.org/img/w/${icon}.png"/>`
    
    
    // Create text to apend using template literals 
    let forecastCard =

    $(`<div class='col-2'>
      <h4 id="fiveDay"> ${curDate}</h4>
      <p>${iconURL}</p>
      <p>Temperature: ${temperature} °C</p>
      <p>Wind Speed: ${wind} KPH</p>
      <p>Humidity: ${humidity}\%</p>
      </div>`);

    $("#fiveDay").append(forecastCard);
    }
  })
};


// Submit function for user inout city //

function inputCity(event){
   event.preventDefault(); // prevent page refresh /

    let city = citySearch.value.trim(""); // extract input data 
  
    previousCities.push(city); // push to array 
  
    // stringify to store in local storage, user is prompted with previous searches when they click on input 
    localStorage.setItem("city", JSON.stringify(previousCities));

    weatherContent.innerHTML=""; // clear current page content on click 
    fiveDayContainer.innerHTML="";


    let history = $(`<button>`).text(city); // append search city to page 
    $("#searchHistory").append(history);


    currentWeather(city); // run currentWeather function 
   
};

// Search history click function
$("#searchHistory").on("click","button",function(event){
  event.preventDefault();
  weatherContent.innerHTML="";
  fiveDayContainer.innerHTML="";

let savedCity= $(this).text();
currentWeather(savedCity);

})

// event listener //
searchbtn.addEventListener('click', inputCity);

// clear search history
$("#clear").on("click",function(event){ 
  event.preventDefault();
  $('#searchHistory').html('');
  localStorage.clear();
 });


// On page load, show last searched city by using local storage 
$(document).ready(function() {
  let previousCitiesArray = JSON.parse(localStorage.getItem("city"))
  let lastsearched = previousCitiesArray.length -1;
  let lastcity = previousCitiesArray[lastsearched];
  currentWeather(lastcity);

});