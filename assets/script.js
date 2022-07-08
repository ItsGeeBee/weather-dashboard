const apiKey = "bca39c92efc2381243d7834988122221";
let searchbtn = document.querySelector('#searchBtn');
let citySearch = document.querySelector('#citySearch');
let previousCities = [];
let weatherContent = document.querySelector('#weatherContent');
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

    forecast(city);
    });
  }})
};

// function for 5 day forecast 
  function  forecast (city) {

  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;  // API call
  console.log(forecastURL);
  // 'fetch' data from URL
  fetch(forecastURL) 
    .then(function (response) {

      return response.json(); // to retrive Object 
  
     })
    .then(function (data) {
      for (let i = 0; i < data.list.length; i+=8) { // limited to every 8 hours to avoid showing multipe weather stamps for same day 

    let date = data.list[i].dt_txt
    let curDate = moment(date).format('DDMMM'); // format through Moment.js
    let temperature = data.list[i].main.temp
    let wind = data.list[i].wind.speed
    let humidity = data.list[i].main.humidity
    
    
    // Create text to apend using template literals 
    let forecastCard =

    $(`<div class='col-2'>
      <h4 id="fiveDay"> ${curDate}</h4>
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

    localStorage.setItem("city", JSON.stringify(previousCities));// stringify to store in local storage 

    weatherContent.innerHTML="";

    let history = $(`<li">${city}</li>`);
    $("#searchHistory").append(history);


    currentWeather(city); // run currentWeather function 
   
};

// event listener //
searchbtn.addEventListener('click', inputCity);


